import { render } from '@testing-library/react';
import Counter from 'components/Counter';

describe('Counter', () => {
  it('should display a count', () => {
    const { getByText, rerender } = render(<Counter count={1} />);
    const counter = getByText(1);

    expect(counter).toBeInTheDocument();

    rerender(<Counter count={2} />);

    expect(counter).toHaveTextContent('2');
  });
});
