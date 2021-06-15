import { render } from '@testing-library/react';
import Counter from 'components/Counter';

describe('Counter', () => {
  it('should display a count', () => {
    const { rerender, getByText } = render(<Counter count={1} />);

    expect(getByText(1)).toBeInTheDocument();

    rerender(<Counter count={2} />);

    expect(getByText(2)).toBeInTheDocument();
  });
});
