'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect, useContext } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import SelectMidiDevice from "./selectMidiInput";
import SelectColor from './selectColor';
import { UserSettingContext } from '@/contexts/userSettingsProvider';

export default function SettingModal() {
  let [isOpen, setIsOpen] = useState(false)
  let [isButtonVisible, setButtonVisible] = useState(true)

  const userSettings = useContext(UserSettingContext);

  if (!userSettings) {
      throw new Error("UserSettingContext is undefined. Make sure the context provider is set up correctly.");
  }

  const { resetCamera } = userSettings;

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function hideButton() {
    setButtonVisible(false)
    closeModal()
  }

  function resetCameraOnModal() {
    resetCamera()
    closeModal()
  }

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setButtonVisible(prevState => !prevState)
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  return (
    <>
      {isButtonVisible && (
        <div className="fixed top-0 left-0 flex items-start justify-start z-10">
          <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-black/20 px-2 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 m-4"
          >
            <IoSettingsOutline />
          </button>
        </div>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col items-center justify-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Let's enjoy playing the piano!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Please connect your MIDI keyboard. When you play, white cubes will bounce along.
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      You need a MIDI keyboard!
                    </Dialog.Title>
                    <SelectMidiDevice />
                  </div>
                  
                  <div className="mt-4 flex flex-col items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Change colors!
                    </Dialog.Title>
                    <SelectColor />
                  </div>


                  <div className="mt-4 flex flex-col items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 py-2"
                    >
                      Oops, did the camera position get weird?
                    </Dialog.Title>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={resetCameraOnModal}
                    >
                      Reset Camera
                    </button>
                  </div>

                  <div className="mt-4 flex flex-col items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 py-2"
                    >
                      Is the icon in the way?
                    </Dialog.Title>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={hideButton}
                    >
                      Hide Settings Button
                    </button>
                    <p className="text-sm text-gray-500 py-1">
                      You can bring it back with the Esc key.
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
