import { render } from '@testing-library/react';
import Counter from 'components/Counter';

describe('Counter', () => {
  it('should have class', () => {
    const { getByText, rerender } = render(<Counter count={0} />);
    const counter = getByText(0);

    expect(counter).not.toHaveClass();

    rerender(<Counter count={0} className="className" />);

    expect(counter).toHaveClass('className');
  });

  it('should display a count', () => {
    const { getByText, rerender } = render(<Counter count={1} />);
    const counter = getByText(1);

    expect(counter).toBeInTheDocument();

    rerender(<Counter count={2} />);

    expect(counter).toHaveTextContent('2');
  });
});
