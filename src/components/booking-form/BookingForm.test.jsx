import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingForm from './BookingForm';

describe('BookingForm', () => {
  const mockSubmitForm = jest.fn();

  beforeEach(() => {
    mockSubmitForm.mockClear();
  });

  test('renders all form fields', () => {
    render(<BookingForm submitForm={mockSubmitForm} />);
    
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', async () => {
    render(<BookingForm submitForm={mockSubmitForm} />);
    
    const submitButton = screen.getByRole('button', { name: /make your reservation/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/date is required/i)).toBeInTheDocument();
      expect(screen.getByText(/time is required/i)).toBeInTheDocument();
      expect(screen.getByText(/occasion is required/i)).toBeInTheDocument();
    });
  });

  test('validates email format', async () => {
    render(<BookingForm submitForm={mockSubmitForm} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    });
    
    const submitButton = screen.getByRole('button', { name: /make your reservation/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  test('validates number of guests', async () => {
    render(<BookingForm submitForm={mockSubmitForm} />);
    
    const guestsInput = screen.getByLabelText(/number of guests/i);
    await act(async () => {
      fireEvent.change(guestsInput, { target: { value: '11' } });
    });
    
    const submitButton = screen.getByRole('button', { name: /make your reservation/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/number of guests can be maximum 10/i)).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    render(<BookingForm submitForm={mockSubmitForm} />);
    
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '4' } });
      fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: '2025-05-20' } });
      fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: '19:00' } });
      fireEvent.change(screen.getByLabelText(/occasion/i), { target: { value: 'Birthday' } });
    });

    const submitButton = screen.getByRole('button', { name: /make your reservation/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockSubmitForm).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        guests: 4,
        date: '2025-05-20',
        time: '19:00',
        occasion: 'Birthday'
      });
    });
  });
});