import Link from 'next/link';

import NavigationIcon from '@/assets/basic-icons/localization-icon.svg';
import Logo from '@/assets/basic-icons/Logo.svg';
import DeliverySwitch from '@/components/header/DeliverySwitch';
import HeaderMobileMenu from '@/components/header/HeaderMobileMenu';
import ShoppingCartButton from '@/components/shopping-cart/ShoppingCartButton';
import Button from '@/components/ui/Button';

const Header = () => {
  return (
    <>
      <header className="mx-auto mb-6 mt-5 flex max-w-7xl justify-between gap-2 px-5 md:px-10">
        <div className="flex flex-1 items-center justify-between gap-2">
          <Link href="/">
            <Logo className="h-full w-28" />
          </Link>
          <div className="hidden sm:block">
            <DeliverySwitch />
          </div>
        </div>
        {/* Location and action buttons */}
        <div className="flex justify-between gap-4 md:flex-1">
          <div className="flex items-center gap-2">
            <NavigationIcon className="text-green" />
            <p className="text-black">London</p>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <ShoppingCartButton />
            <Button className="hidden lg:block" variant="secondary">
              Sign in
            </Button>
            <Button className="hidden lg:block" variant="primary">
              Create account
            </Button>
            <div className="lg:hidden">
              <HeaderMobileMenu />
            </div>
          </div>
        </div>
      </header>
      <div className="mb-4 flex justify-around px-4 sm:hidden">
        <DeliverySwitch className="w-full sm:w-2/3" />
      </div>
    </>
  );
};

export default Header;
