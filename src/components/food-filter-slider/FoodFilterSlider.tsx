'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import ArrowButton from '@/components/food-filter-slider/ArrowButton';
import FoodCard from '@/components/food-filter-slider/FoodCard';
import { foodCategories } from '@/components/food-filter-slider/foodCategories';
import { updateQueryParam } from '@/lib/utils';

const FoodFilterSlider = () => {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef(0);
  const maxScrollRef = useRef(0);

  const [isArrowVisible, setIsArrowVisible] = useState({
    left: false,
    right: true,
  });

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

  const handleCategoryChange = (category: string) => {
    if (activeCategory === category) {
      updateQueryParam('category', '');
    } else {
      updateQueryParam('category', category);
    }
  };

  return (
    <section className="relative mb-8 flex items-center">
      <div
        ref={sliderRef}
        className="mx-0 flex gap-5 overflow-x-auto scroll-smooth px-5 scrollbar-thin fade-sides sm:mx-10 sm:scrollbar-hide"
        onScroll={handleScrolling}
      >
        {foodCategories.map(category => (
          <FoodCard
            key={category.title}
            icon={category.icon}
            title={category.title}
            isActive={activeCategory === category.title}
            onClick={() => handleCategoryChange(category.title)}
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
