import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Specials from './Specials';

describe('Specials', () => {
  test('renders section title', () => {
    render(<Specials />);
    expect(screen.getByText("This weeks specials!")).toBeInTheDocument();
  });

  test('renders Online Menu button', () => {
    render(<Specials />);
    expect(screen.getByRole('button', { name: /online menu/i })).toBeInTheDocument();
  });

  test('renders all special menu items', () => {
    render(<Specials />);
    
    // Check if all special items are rendered
    expect(screen.getByText('Greek Salad')).toBeInTheDocument();
    expect(screen.getByText('Bruchetta')).toBeInTheDocument();
    expect(screen.getByText('Lemon Dessert')).toBeInTheDocument();
    
    // Check prices
    expect(screen.getByText('$ 12.99')).toBeInTheDocument();
    expect(screen.getByText('$ 5.99')).toBeInTheDocument();
    expect(screen.getByText('$ 5.00')).toBeInTheDocument();
  });

  test('renders food descriptions', () => {
    render(<Specials />);
    
    expect(screen.getByText(/crispy lettuce, peppers, olives/i)).toBeInTheDocument();
    expect(screen.getByText(/grilled bread that has been smearede/i)).toBeInTheDocument();
    expect(screen.getByText(/straight from grandma's recipe book/i)).toBeInTheDocument();
  });

  test('renders all food images', () => {
    render(<Specials />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3); // Should have 3 food images
  });

  test('renders FoodCard components', () => {
    render(<Specials />);
    const foodCards = screen.getAllByTestId('food-card');
    expect(foodCards).toHaveLength(3);
  });
});