import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BeansList from './BeansList';
import { BeansContext } from '../context/BeansContext';
import BeansFinder from '../apis/BeansFinder';

// Mock BeansFinder API
jest.mock('../apis/BeansFinder');

// Mock BeansContext
const mockSetBeans = jest.fn();
const mockAddToCart = jest.fn();

const renderComponent = (authenticated = false) => {
  return render(
    <BeansContext.Provider value={{ beans: [], setBeans: mockSetBeans, addToCart: mockAddToCart }}>
      <BeansList />
    </BeansContext.Provider>
  );
};

describe('BeansList component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders login form when not authenticated', () => {
    renderComponent();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  });

  it('logs in successfully with correct credentials', () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'username' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Login'));

    expect(localStorage.getItem('isLoggedIn')).toBe('true');
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  it('fails to log in with incorrect credentials', () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'wrong' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByText('Login'));

    expect(localStorage.getItem('isLoggedIn')).toBe(null);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('fetches and displays beans when authenticated', async () => {
    BeansFinder.apiInstance.get.mockResolvedValue({
      data: {
        data: {
          beans: [
            { id: 1, name: 'Bean 1', price: '10' },
            { id: 2, name: 'Bean 2', price: '15' },
          ],
        },
      },
    });

    localStorage.setItem('isLoggedIn', 'true');
    renderComponent();

    await waitFor(() => {
      expect(mockSetBeans).toHaveBeenCalledWith([
        { id: 1, name: 'Bean 1', price: '10' },
        { id: 2, name: 'Bean 2', price: '15' },
      ]);
    });

    expect(screen.getByText('Bean 1')).toBeInTheDocument();
    expect(screen.getByText('Bean 2')).toBeInTheDocument();
  });

  it('adds a bean to the cart', async () => {
    const beans = [
      { id: 1, name: 'Bean 1', price: '10' },
    ];

    BeansFinder.apiInstance.get.mockResolvedValue({
      data: {
        data: {
          beans,
        },
      },
    });

    localStorage.setItem('isLoggedIn', 'true');
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Bean 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Add to Cart'));

    expect(mockAddToCart).toHaveBeenCalledWith(beans[0]);
  });

  it('logs out correctly', () => {
    localStorage.setItem('isLoggedIn', 'true');
    renderComponent();

    fireEvent.click(screen.getByText('Logout'));

    expect(localStorage.getItem('isLoggedIn')).toBe(null);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});