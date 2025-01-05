'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import BackIcon from '@/assets/basic-icons/back-button.svg';

type DrawerProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

const Drawer = ({ title, onClose, children }: DrawerProps) => {
  const [isVisible, setIsVisible] = useState(false); // For animation
  const [isSwiping, setIsSwiping] = useState(false);
  const startXRef = useRef(0);

  const ANIMATION_DURATION = 200;
  const SWIPE_AMOUNT_TO_CLOSE = 100;

  const closeDrawer = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, ANIMATION_DURATION);
  }, [onClose]);

  useEffect(() => {
    setIsVisible(true);
    // Disable scrollbar on body when drawer is opened
    document.body.style.overflow = 'hidden';

    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDrawer();
      }
    };

    window.addEventListener('keydown', handleEscPress);

    return () => {
      window.removeEventListener('keydown', handleEscPress);
      document.body.style.overflow = '';
    };
  }, [closeDrawer]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;

    const touchMoveX = e.touches[0].clientX;
    if (touchMoveX - startXRef.current > SWIPE_AMOUNT_TO_CLOSE) {
      closeDrawer();
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
  };

  return (
    <div
      className={`fixed inset-0 z-20 transition-transform duration-${ANIMATION_DURATION} transform ease-in-out ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex h-full w-full flex-col bg-white">
        <div onClick={closeDrawer} className="flex items-center gap-2 p-4">
          <button>
            <BackIcon />
          </button>
          <h2 className="body2">{title}</h2>
        </div>
        <div className="flex-grow overflow-y-auto p-4 scrollbar-thin">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
