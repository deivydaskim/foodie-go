import ArrowIcon from '@/assets/basic-icons/arrow-icon.svg';

type ArrowButtonProps = {
  isLeft?: boolean;
  isVisible: boolean;
  onClick: () => void;
};

const ArrowButton = ({
  isLeft = false,
  isVisible,
  onClick,
}: ArrowButtonProps) => (
  <button
    className={`absolute z-10 hidden rounded-full bg-blueGray-100 p-1 sm:block ${
      isVisible ? 'visible' : 'invisible'
    } ${isLeft ? 'left-0 rotate-180' : 'right-0'} transform`}
    onClick={onClick}
  >
    <ArrowIcon />
  </button>
);

export default ArrowButton;
