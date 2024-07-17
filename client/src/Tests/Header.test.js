import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

describe('Header component', () => {
  it('renders the header correctly', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    expect(screen.getByText("Mikuurr's Coffee Shop")).toBeInTheDocument();
    expect(screen.getByText('My Cart')).toBeInTheDocument();
  });

  it('renders the "My Cart" link correctly', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const link = screen.getByRole('link', { name: /my cart/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/cart');
  });
});