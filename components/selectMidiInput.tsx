'use client'

import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { detectMidiDevices } from '../utils/detectMidiDevice';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SelectMidiInput() {
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
