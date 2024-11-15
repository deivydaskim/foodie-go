'use client';

import BackIcon from '@/assets/basic-icons/back-button.svg';
import { useEffect, useRef, useState } from 'react';

type DrawerProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

const Drawer = ({ title, onClose, children }: DrawerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const startXRef = useRef(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const ANIMATION_DURATION = 200;
  const SWIPE_AMOUNT_TO_CLOSE = 100;

  useEffect(() => {
    // For animation
    setIsVisible(true);

    // Disable scroll on body when drawer is opened
    document.body.style.overflow = 'hidden';

    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscPress);

    return () => {
      window.removeEventListener('keydown', handleEscPress);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, ANIMATION_DURATION); // Component will dismount after animation
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;

    const touchMoveX = e.touches[0].clientX;
    if (touchMoveX - startXRef.current > SWIPE_AMOUNT_TO_CLOSE) {
      // Threshold to trigger swipe action
      handleClose();
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-${ANIMATION_DURATION} transform ease-in-out ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="scrollbar-thin h-full w-full overflow-y-auto bg-white">
        <div className="ml-4 mt-4 flex items-center gap-2">
          <button onClick={handleClose}>
            <BackIcon />
          </button>
          <h2 className="body2">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
