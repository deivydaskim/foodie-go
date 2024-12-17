import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

const generateRestaurants = count => {
  let idCounter = 1000; // Start ID from 1000

  const animalMap = {
    bear: faker.animal.bear,
    bird: faker.animal.bird,
    cat: faker.animal.cat,
    cetacean: faker.animal.cetacean,
    cow: faker.animal.cow,
    crocodilia: faker.animal.crocodilia,
    dog: faker.animal.dog,
    fish: faker.animal.fish,
    horse: faker.animal.horse,
    insect: faker.animal.insect,
    lion: faker.animal.lion,
    rabbit: faker.animal.rabbit,
    rodent: faker.animal.rodent,
    snake: faker.animal.snake,
  };

  const generateDishes = (min, max) => {
    const numberOfDishes = faker.number.int({ min, max });
    const dishes = [];
    for (let i = 0; i < numberOfDishes; i++) {
      const title = faker.food.dish();
      const price = Number.parseFloat(
        faker.commerce.price({ min: 8, max: 15 }),
      );
      const description = faker.food.description();
      dishes.push({ title, price, description, id: faker.string.uuid() });
    }
    return dishes;
  };

  const generateRestaurant = () => {
    const animalType = faker.animal.type();
    const adjective = faker.food.adjective();
    const getAnimal = animalMap[animalType];
    const specificAnimal =
      getAnimal && typeof getAnimal === 'function' ? getAnimal() : animalType;

    return {
      id: idCounter++,
      name: `${adjective} ${specificAnimal} restaurant`,
      categories: faker.helpers.arrayElements(
        [
          'Breakfast',
          'Pizza',
          'Sushi',
          'Italian',
          'Indian',
          'Burgers',
          'Fast Food',
          'Korean',
          'Asian',
          'Healthy',
          'Vegan',
          'Desserts',
          'Sea Food',
          'Ice Cream',
        ],
        {
          min: 1,
          max: 3,
        },
      ),
      rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      numberOfReviews: faker.number.int({ min: 0, max: 100 }),
      distance: faker.number.float({ multipleOf: 0.1, min: 0.1, max: 10 }),
      address: faker.location.streetAddress(),
      deliveryFee: Number.parseFloat(
        faker.commerce.price({ min: 0, max: 5, dec: 0 }),
      ),
      isOpen: faker.datatype.boolean(0.8),
      menu: {
        popular: generateDishes(1, 5),
        lunch: generateDishes(2, 6),
        appetizers: generateDishes(2, 5),
        entrees: generateDishes(2, 5),
        sides: generateDishes(2, 5),
        specialties: generateDishes(2, 5),
        chefsPicks: generateDishes(2, 5),
      },
    };
  };

  return Array.from({ length: count }, generateRestaurant);
};

const generateMockData = () => {
  const MOCK_DATA_FILE = path.join(
    process.cwd(),
    'src/data',
    'restaurants.json',
  );

  if (!fs.existsSync(MOCK_DATA_FILE)) {
    console.log('Generating mock data...');
    const mockData = generateRestaurants(25);
    try {
      fs.writeFileSync(MOCK_DATA_FILE, JSON.stringify(mockData, null, 2));
      console.log('Mock data created successfully');
    } catch (error) {
      console.error('Error writing mock data:', error);
    }
  } else {
    console.log('Mock data already exists. Skipping generation.');
  }
};

generateMockData();
