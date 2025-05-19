import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import MobileNavBar from './MobileNavBar';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('MobileNavBar', () => {
  const mockShowLogin = jest.fn();

  test('renders with correct visibility when isVisible is true', () => {
    renderWithRouter(<MobileNavBar isVisible={true} showLogin={mockShowLogin} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('fixed', 'left-0');
  });

  test('renders with correct visibility when isVisible is false', () => {
    renderWithRouter(<MobileNavBar isVisible={false} showLogin={mockShowLogin} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('fixed', 'left-[-100%]');
  });

  test('renders all navigation links', () => {
    renderWithRouter(<MobileNavBar isVisible={true} showLogin={mockShowLogin} />);
    
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/menu/i)).toBeInTheDocument();
    expect(screen.getByText(/reservations/i)).toBeInTheDocument();
    expect(screen.getByText(/order online/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('links have correct routing paths', () => {
    renderWithRouter(<MobileNavBar isVisible={true} showLogin={mockShowLogin} />);
    
    expect(screen.getByText(/home/i).closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText(/reservations/i).closest('a')).toHaveAttribute('href', '/booking');
  });

  test('clicking login triggers showLogin callback', () => {
    renderWithRouter(<MobileNavBar isVisible={true} showLogin={mockShowLogin} />);
    
    const loginButton = screen.getByText(/login/i);
    fireEvent.click(loginButton);
    expect(mockShowLogin).toHaveBeenCalled();
  });

  test('applies correct styling when visible', () => {
    renderWithRouter(<MobileNavBar isVisible={true} showLogin={mockShowLogin} />);
    const nav = screen.getByRole('navigation');
    
    expect(nav).toHaveClass(
      'fixed',
      'left-0',
      'top-0',
      'w-[70%]',
      'h-full',
      'border-r',
      'border-r-gray-500',
      'bg-[#495357]',
      'ease-in-out',
      'duration-300'
    );
  });
});
