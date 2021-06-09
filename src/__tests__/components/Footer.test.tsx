import { render, screen } from '@testing-library/react';
import Footer from 'components/Footer';
import setupIcons from 'setupIcons';

describe('Footer', () => {
  beforeAll(() => {
    setupIcons();
  });

  it('should display a current year', () => {
    render(<Footer />);

    expect(screen.getByText(new Date().getFullYear())).toBeInTheDocument();
  });
});
