import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FoodCard from './FoodCard';

describe('FoodCard', () => {
  const mockFood = {
    name: 'Test Dish',
    price: '$ 9.99',
    image: '/test-image.jpg',
    description: 'A delicious test dish'
  };

  test('renders food card with all elements', () => {
    render(<FoodCard food={mockFood} />);

    expect(screen.getByTestId('food-card')).toBeInTheDocument();
    expect(screen.getByText(mockFood.name)).toBeInTheDocument();
    expect(screen.getByText(mockFood.price)).toBeInTheDocument();
    expect(screen.getByText(mockFood.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockFood.name)).toBeInTheDocument();
  });

  test('renders order button', () => {
    render(<FoodCard food={mockFood} />);
    expect(screen.getByRole('button', { name: /order a delivery/i })).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    render(<FoodCard food={mockFood} />);
    const card = screen.getByTestId('food-card');
    expect(card).toHaveClass('food-card', 'flex', 'flex-col');
  });

  test('renders image with correct attributes', () => {
    render(<FoodCard food={mockFood} />);
    const image = screen.getByAltText(mockFood.name);
    expect(image).toHaveAttribute('src', mockFood.image);
    expect(image).toHaveClass('w-full', 'mx-auto', 'mb-2');
  });
});
