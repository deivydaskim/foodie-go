'use client';

import { Switch } from '@headlessui/react';

import DeliveryIcon from '@/assets/basic-icons/delivery-icon.svg';
import PickupIcon from '@/assets/basic-icons/pickup-icon.svg';
import SwitchLabel from '@/components/header/SwitchLabel';
import { usePickupDelivery } from '@/context/PickupDeliveryContext';

const DeliverySwitch = ({ className = '' }) => {
  const { isPickup, togglePickupDelivery } = usePickupDelivery();

  return (
    <Switch
      checked={isPickup}
      onChange={togglePickupDelivery}
      className={`relative inline-flex h-9 w-48 items-center justify-between rounded-full bg-blueGray-100 px-1 button ${className}`}
      aria-label={isPickup ? 'Switch to Delivery' : 'Switch to Pickup'}
    >
      <span
        className={`absolute h-7 w-[calc(50%-0.25rem)] transform rounded-full bg-white shadow-md transition-transform duration-300 ${isPickup ? 'translate-x-full' : ''}`}
      />
      <SwitchLabel icon={DeliveryIcon} isActive={!isPickup}>
        Delivery
      </SwitchLabel>
      <SwitchLabel icon={PickupIcon} isActive={isPickup}>
        Pickup
      </SwitchLabel>
    </Switch>
  );
};

export default DeliverySwitch;
