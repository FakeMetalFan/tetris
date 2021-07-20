import { render } from '@testing-library/react';
import Tiles from 'components/Tiles';
import styles from 'components/Tiles/tiles.module.scss';

describe('Tiles', () => {
  it('should display tiles', () => {
    const tiles = render(
      <Tiles width={2} tiles={[[{ id: '1' }, { id: '2' }], [{ id: '3' }]]} />
    ).getByTestId(styles.tiles);

    expect(tiles.childElementCount).toBe(3);
    expect(tiles.style.gridTemplateColumns).toBe('repeat(2, 1fr)');
  });
});
