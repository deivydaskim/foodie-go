'use client';

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';

type PopupButtonProps = {
  children:
    | React.ReactNode
    | ((props: { close: () => void }) => React.ReactNode);
  button: React.ReactNode;
  anchor?: React.ComponentProps<typeof PopoverPanel>['anchor'];
};

// The `children` for PopupButton can either be a React node or a function that receives an object with a `close` method.
// If using a function as children, you can call `close()` to programmatically close the Panel, for example:
// {({ close }) => (
//   <>
//     ...
//     <button onClick={close}>Close</button>
//   </>
// )}

const PopupButton = ({
  children,
  button,
  anchor = 'bottom end',
}: PopupButtonProps) => {
  return (
    <Popover>
      {({ close }) => (
        <>
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
            className="z-20 mt-2 w-80 rounded-lg bg-white shadow-lg transition duration-200 ease-in-out scrollbar-thin data-[closed]:-translate-y-2 data-[closed]:opacity-0 sm:!max-h-96"
          >
            {typeof children === 'function' ? children({ close }) : children}
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};

export default PopupButton;
