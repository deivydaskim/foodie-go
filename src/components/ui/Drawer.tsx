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
    // Trigger animation
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
    setTimeout(onClose, ANIMATION_DURATION);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;

    const touchMoveX = e.touches[0].clientX;
    if (touchMoveX - startXRef.current > SWIPE_AMOUNT_TO_CLOSE) {
      handleClose();
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
        <div onClick={handleClose} className="flex items-center gap-2 p-4">
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
