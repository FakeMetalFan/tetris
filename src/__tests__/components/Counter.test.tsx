import { render, screen } from '@testing-library/react';
import Counter from 'components/Counter';

describe('Counter', () => {
  it('should display a count', () => {
    const { rerender } = render(<Counter count={1} />);

    expect(screen.getByText(1)).toBeInTheDocument();

    rerender(<Counter count={2} />);

    expect(screen.getByText(2)).toBeInTheDocument();
  });
});
