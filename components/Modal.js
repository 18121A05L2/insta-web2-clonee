import React, { Fragment } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalState";
import { Dialog, Transition } from "@headlessui/react";
import ModalContent from "../components/ModalContent";

export default function Modal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
        {/*
          Use one Transition.Child to apply one transition to the backdrop...
        */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        {/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-lg p-4 rounded bg-white ">
              <Dialog.Title
                className={
                  "border-b-2 text-center text-[1.6rem] font-bold mb-8 pb-3"
                }
              >
                Create new post
              </Dialog.Title>
              <ModalContent />

              {/* ... */}
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
