'use client';

import type { Food } from '@/lib/foodItems';
import { useEffect, useRef, useState } from 'react';
import ArrowButton from './ArrowButton';
import FoodCard from './FoodCard';

type FoodFilterSliderProps = {
  foods: Food[];
};

const FoodFilterSlider = ({ foods }: FoodFilterSliderProps) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef(0);
  const maxScrollRef = useRef(0);

  const [isArrowVisible, setIsArrowVisible] = useState({
    left: false,
    right: true,
  });
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const SCROLL_AMOUNT = 170;

  const scrollSliderTo = (direction: 'left' | 'right') => {
    const newPosition = Math.min(
      Math.max(
        scrollPositionRef.current +
          (direction === 'right' ? SCROLL_AMOUNT : -SCROLL_AMOUNT),
        0,
      ),
      maxScrollRef.current,
    );
    sliderRef.current?.scrollTo({ left: newPosition });
    scrollPositionRef.current = newPosition;
  };

  const handleScrolling = () => {
    if (sliderRef.current) {
      const position = sliderRef.current.scrollLeft;
      scrollPositionRef.current = position;

      const leftVisible = position > 0;
      const rightVisible = position < maxScrollRef.current;

      // Update state only if the visibility conditions have changed
      if (
        leftVisible !== isArrowVisible.left ||
        rightVisible !== isArrowVisible.right
      ) {
        setIsArrowVisible({
          left: leftVisible,
          right: rightVisible,
        });
      }
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      maxScrollRef.current =
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    }
  }, []);

  return (
    <section className="relative mb-8 flex items-center">
      <div
        ref={sliderRef}
        className="mx-0 flex gap-5 overflow-x-auto scroll-smooth px-5 scrollbar-thin fade-sides sm:mx-10 sm:scrollbar-hide"
        onScroll={handleScrolling}
      >
        {foods.map(food => (
          <FoodCard
            key={food.title}
            icon={food.icon}
            title={food.title}
            isActive={activeCard === food.title}
            onClick={() => {
              setActiveCard(prev => (prev === food.title ? null : food.title));
            }}
          />
        ))}
      </div>
      <>
        <ArrowButton
          onClick={() => scrollSliderTo('left')}
          isLeft
          isVisible={isArrowVisible.left}
        />
        <ArrowButton
          onClick={() => scrollSliderTo('right')}
          isVisible={isArrowVisible.right}
        />
      </>
    </section>
  );
};

export default FoodFilterSlider;