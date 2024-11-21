'use client';

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';

type PopupButtonProps = {
  children: React.ReactNode;
  button: React.ReactNode;
  anchor?: React.ComponentProps<typeof PopoverPanel>['anchor'];
};

const PopupButton = ({
  children,
  button,
  anchor = 'bottom end',
}: PopupButtonProps) => {
  return (
    <Popover className="group">
      <PopoverButton as="div" className="flex">
        {button}
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 z-20 bg-black/15 transition duration-100 ease-out data-[closed]:opacity-0"
      />
      <PopoverPanel
        transition
        anchor={anchor}
        className="z-20 mt-2 w-80 rounded-lg bg-white shadow-lg transition duration-200 ease-in-out data-[closed]:-translate-y-2 data-[closed]:opacity-0"
      >
        {children}
      </PopoverPanel>
    </Popover>
  );
};

export default PopupButton;
