import { render } from '@testing-library/react';
import Footer from 'components/Footer';

describe('Footer', () => {
  it('should display a current year', () => {
    expect(
      render(<Footer />).getByText(new Date().getFullYear())
    ).toBeInTheDocument();
  });
});
