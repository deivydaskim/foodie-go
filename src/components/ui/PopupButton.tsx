'use client';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

type PopupButtonProps = {
  children: React.ReactNode;
  button: React.ReactNode;
};

const PopupButton = ({ children, button }: PopupButtonProps) => {
  return (
    <Popover>
      <PopoverButton as="div" className="flex">
        {button}
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom end"
        className="z-20 mt-2 w-80 rounded-lg bg-white shadow-lg transition duration-200 ease-in-out data-[closed]:-translate-y-2 data-[closed]:opacity-0"
      >
        {children}
      </PopoverPanel>
    </Popover>
  );
};

export default PopupButton;
