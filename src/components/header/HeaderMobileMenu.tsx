'use client';

import MenuIcon from '@/assets/basic-icons/navigation-icon.svg';
import Button from '@/components/ui/Button';
import PopupButton from '@/components/ui/PopupButton';

const HeaderMobileMenu = () => {
  const handleSignIn = (close: () => void) => {
    close();
    console.log('Redirecting...');
  };

  const handleRegister = (close: () => void) => {
    close();
    console.log('Redirecting...');
  };

  return (
    <PopupButton
      button={
        <Button variant="rounded">
          <MenuIcon />
        </Button>
      }
    >
      {({ close }: { close: () => void }) => (
        <div className="flex flex-col justify-center gap-2 px-4 py-6">
          <Button onClick={() => handleSignIn(close)}>Sign in</Button>
          <Button onClick={() => handleRegister(close)}>Create account</Button>
        </div>
      )}
    </PopupButton>
  );
};

export default HeaderMobileMenu;
