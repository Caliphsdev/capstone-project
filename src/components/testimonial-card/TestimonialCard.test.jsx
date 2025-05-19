import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestimonialCard from './TestimonialCard';

describe('TestimonialCard', () => {
  const mockUser = {
    name: 'John Doe',
    image: '/test-avatar.jpg'
  };

  test('renders testimonial card with user information', () => {
    render(<TestimonialCard user={mockUser} />);

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByAltText(mockUser.name)).toBeInTheDocument();
  });

  test('renders five star images', () => {
    render(<TestimonialCard user={mockUser} />);
    const stars = screen.getAllByAltText('star');
    expect(stars).toHaveLength(5);
  });

  test('renders testimonial text', () => {
    render(<TestimonialCard user={mockUser} />);
    expect(screen.getByText(/Lorem ipsum dolor sit amet/i)).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    render(<TestimonialCard user={mockUser} />);
    const card = screen.getByTestId('testimonial-card');
    expect(card).toHaveClass('testimonial-card', 'flex', 'flex-col', 'p-4');
  });

  test('renders user image with correct attributes', () => {
    render(<TestimonialCard user={mockUser} />);
    const userImage = screen.getByAltText(mockUser.name);
    expect(userImage).toHaveAttribute('src', mockUser.image);
    expect(userImage).toHaveClass('mr-5');
  });
});
