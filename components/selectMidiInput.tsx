'use client'

import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition, Listbox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { detectMidiDevices } from '../utils/detectMidiDevice';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

 function SelectMidiInput() {
  const [selectedOption, setSelectOption] = useState('');
  const [midiDevices, setMidiDevices] = useState<string[]>(['no device']);

  const updateMidiDevices = async () => {
    const devices = await detectMidiDevices();
    if (devices !== null) {
      const filteredDevices = devices.filter(device => device !== null) as string[];
      setMidiDevices(filteredDevices);
    }
  };

  useEffect(() => {
    updateMidiDevices();

    const midiAccess = navigator.requestMIDIAccess();
    midiAccess.then(access => {
      access.onstatechange = updateMidiDevices;
    });

    return () => {
      midiAccess.then(access => {
        access.onstatechange = () => {};
      });
    };
  }, []);

  // midiDevicesが更新されたときにselectedOptionを更新する
  useEffect(() => {
    if (midiDevices.length > 0) {
      setSelectOption(midiDevices[0]);
    }
  }, [midiDevices]);

  return (
    <Menu as="div" className="relative inline-block text-left p-5">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {selectedOption}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {midiDevices.map(device => (
              <Menu.Item key={device}>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => setSelectOption(device)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    {device}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}


export default function SelectMidiDevice() {
  const [selected, setSelected] = useState('');
  const [midiDevices, setMidiDevices] = useState<string[]>(['no device']);

  const updateMidiDevices = async () => {
    const devices = await detectMidiDevices();
    if (devices !== null) {
      const filteredDevices = devices.filter(device => device !== null) as string[];
      setMidiDevices(filteredDevices);
    }
  };

  useEffect(() => {
    updateMidiDevices();

    const midiAccess = navigator.requestMIDIAccess();
    midiAccess.then(access => {
      access.onstatechange = updateMidiDevices;
    });

    return () => {
      midiAccess.then(access => {
        access.onstatechange = () => {};
      });
    };
  }, []);

  // midiDevicesが更新されたときにselectedOptionを更新する
  useEffect(() => {
    if (midiDevices.length > 0) {
      setSelected(midiDevices[0]);
    }
  }, [midiDevices]);


  return (
    <div className="w-72">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
              {midiDevices.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}