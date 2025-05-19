import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

// Wrap component with Router for testing
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Header', () => {
  test('renders logo', () => {
    renderWithRouter(<Header />);
    const logo = screen.getByAltText('Little lemon logo');
    expect(logo).toBeInTheDocument();
  });

  test('renders desktop navigation by default', () => {
    renderWithRouter(<Header />);
    const navbar = screen.getByRole('navigation', { name: /desktop/i });
    expect(navbar).toBeInTheDocument();
    expect(navbar).toHaveClass('header-list');
    expect(navbar).toHaveClass('md:inline');
  });

  test('mobile menu is hidden by default', () => {
    renderWithRouter(<Header />);
    const mobileNav = screen.getByRole('navigation', { name: /mobile/i });
    expect(mobileNav).toHaveClass('fixed');
    expect(mobileNav).toHaveAttribute('data-visible', 'false');
  });

  test('clicking hamburger menu toggles mobile navigation', () => {
    renderWithRouter(<Header />);
    const menuButton = screen.getByLabelText(/toggle menu/i);
    const mobileNav = screen.getByRole('navigation', { name: /mobile/i });
    
    // Click to open mobile menu
    fireEvent.click(menuButton);
    expect(mobileNav).toHaveAttribute('data-visible', 'true');

    // Click again to close mobile menu
    fireEvent.click(menuButton);
    expect(mobileNav).toHaveAttribute('data-visible', 'false');
  });
});