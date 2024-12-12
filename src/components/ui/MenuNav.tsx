'use client';

const MenuNavigator = ({ sections }: { sections: string[] }) => {
  const handleScroll = (value: string) => {
    const element = document.getElementById(value);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ul className="flex gap-6 overflow-auto border-b-2 border-black px-6 py-2 scrollbar-thin">
      {sections.map(item => (
        <li key={item}>
          <button
            onClick={() => handleScroll(item)}
            className="rounded-full px-4 py-2 capitalize button hover:bg-blueGray-100"
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MenuNavigator;
