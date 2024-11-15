import NavigationIcon from '@/assets/basic-icons/localization-icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';
import DeliverySwitch from './DeliverySwitch';
import ShoppingCartButton from '../shopping-cart/ShoppingCartButton';

const Header = () => {
  return (
    <header className="mb-8 mt-5 flex flex-col justify-between gap-2 px-10 md:flex-row md:gap-4">
      <div className="flex flex-1 items-center justify-between">
        <Link href="/">
          <Image
            src="/basic-icons/Logo.svg"
            alt="logo"
            width={100}
            height={16}
          />
        </Link>
        <DeliverySwitch />
      </div>
      {/* Location and action buttons */}
      <div className="flex flex-1 justify-between">
        <div className="flex items-center gap-2">
          <NavigationIcon className="text-green" />
          <p className="text-black">136 Greenpoint Ave</p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1 md:gap-4">
          <ShoppingCartButton />
          <Button variant="secondary">Sign in</Button>
          <Button variant="primary">Create account</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
