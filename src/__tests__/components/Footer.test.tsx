import { render } from '@testing-library/react';
import Footer from 'components/Footer';
import setupIcons from 'setupIcons';

describe('Footer', () => {
  beforeAll(() => {
    setupIcons();
  });

  it('should display a current year', () => {
    expect(
      render(<Footer />).getByText(new Date().getFullYear())
    ).toBeInTheDocument();
  });
});
