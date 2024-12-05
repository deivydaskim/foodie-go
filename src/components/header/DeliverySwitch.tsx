'use client';

import DeliveryIcon from '@/assets/basic-icons/delivery-icon.svg';
import PickupIcon from '@/assets/basic-icons/pickup-icon.svg';
import { usePickupDelivery } from '@/context/PickupDeliveryContext';
import { Switch } from '@headlessui/react';
import SwitchLabel from './SwitchLabel';

const DeliverySwitch = () => {
  const { isPickup, togglePickupDelivery } = usePickupDelivery();

  return (
    <Switch
      checked={isPickup}
      onChange={togglePickupDelivery}
      className="relative inline-flex h-9 w-48 items-center justify-between rounded-full bg-blueGray-100 px-1 button"
      aria-label={isPickup ? 'Switch to Delivery' : 'Switch to Pickup'}
    >
      <span
        className={`absolute h-7 w-[calc(50%-0.25rem)] transform rounded-full bg-white shadow-md transition-transform duration-300 ${isPickup ? 'translate-x-full' : ''}`}
      />
      <SwitchLabel Icon={DeliveryIcon} isActive={!isPickup}>
        Delivery
      </SwitchLabel>
      <SwitchLabel Icon={PickupIcon} isActive={isPickup}>
        Pickup
      </SwitchLabel>
    </Switch>
  );
};

export default DeliverySwitch;
