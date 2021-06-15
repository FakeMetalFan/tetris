import { render } from '@testing-library/react';
import Footer from 'components/Footer';
import setupIcons from 'setupIcons';

describe('Footer', () => {
  beforeAll(() => {
    setupIcons();
  });

  it('should display a current year', () => {
    const { getByText } = render(<Footer />);

    expect(getByText(new Date().getFullYear())).toBeInTheDocument();
  });
});
