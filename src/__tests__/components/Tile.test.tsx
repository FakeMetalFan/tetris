import { render } from '@testing-library/react';
import Tile from 'components/Tile';
import styles from 'components/Tile/tile.module.scss';
import TileFill from 'constants/tileFill';

describe('Tile', () => {
  it('should have "I" tile background color', () => {
    const { getByRole } = render(<Tile fill={TileFill.I} />);

    expect(getByRole('button')).toHaveClass(styles.i);
  });

  it('should have "J" tile background color', () => {
    const { getByRole } = render(<Tile fill={TileFill.J} />);

    expect(getByRole('button')).toHaveClass(styles.j);
  });

  it('should have "L" tile background color', () => {
    const { getByRole } = render(<Tile fill={TileFill.L} />);

    expect(getByRole('button')).toHaveClass(styles.l);
  });

  it('should have "O" tile background color', () => {
    const { getByRole } = render(<Tile fill={TileFill.O} />);

    expect(getByRole('button')).toHaveClass(styles.o);
  });

  it('should have "S" tile background color', () => {
    const { getByRole } = render(<Tile fill={TileFill.S} />);

    expect(getByRole('button')).toHaveClass(styles.s);
  });

  it('should have "T" tile background color', () => {
    const { getByRole } = render(<Tile fill={TileFill.T} />);

    expect(getByRole('button')).toHaveClass(styles.t);
  });

  it('should have "Z" tile background color', () => {
    const { getByRole } = render(<Tile fill={TileFill.Z} />);

    expect(getByRole('button')).toHaveClass(styles.z);
  });
});
