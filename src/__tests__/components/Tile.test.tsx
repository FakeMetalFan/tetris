import { render } from '@testing-library/react';
import Tile from 'components/Tile';
import styles from 'components/Tile/styles.module.scss';
import TileFill from 'constants/tileFill';

describe('Tile', () => {
  it('should have appearance based on "fill" prop', () => {
    const { getByRole, rerender } = render(<Tile fill={TileFill.I} />);
    const tile = getByRole('button');

    expect(tile).toHaveClass(styles.i);

    rerender(<Tile fill={TileFill.J} />);

    expect(tile).toHaveClass(styles.j);

    rerender(<Tile fill={TileFill.L} />);

    expect(tile).toHaveClass(styles.l);

    rerender(<Tile fill={TileFill.O} />);

    expect(tile).toHaveClass(styles.o);

    rerender(<Tile fill={TileFill.S} />);

    expect(tile).toHaveClass(styles.s);

    rerender(<Tile fill={TileFill.T} />);

    expect(tile).toHaveClass(styles.t);

    rerender(<Tile fill={TileFill.Z} />);

    expect(tile).toHaveClass(styles.z);
  });
});
