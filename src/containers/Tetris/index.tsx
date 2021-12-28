import Counter from 'components/Counter';
import Tiles from 'components/Tiles';

import INTERVAL from 'constants/interval';
import KEY_CODE from 'constants/key-code';

import useTetris from 'hooks/use-tetris';
import useEventListener from 'hooks/use-event-listener';
import useInterval from 'hooks/use-interval';

import styles from './tetris.module.scss';

export default () => {
  const {
    left,
    right,
    rotate,
    accelerate,
    decelerate,
    drop,
    fast,
    score,
    tiles,
    width,
    height,
  } = useTetris(10, 20);

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case KEY_CODE.ARROW_LEFT:
        left();
        break;
      case KEY_CODE.ARROW_RIGHT:
        right();
        break;
      case KEY_CODE.ARROW_UP:
        rotate();
        break;
      case KEY_CODE.ARROW_DOWN:
        accelerate();
        break;
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    switch (event.code) {
      case KEY_CODE.ARROW_DOWN:
        decelerate();
        break;
    }
  };

  useEventListener('keydown', handleKeyDown);
  useEventListener('keyup', handleKeyUp);
  useInterval(drop, fast ? INTERVAL.FAST : INTERVAL.SLOW);

  return (
    <>
      <Counter
        count={score}
        tagName='div'
        className={styles.counter}
      />
      <Tiles
        tiles={tiles}
        width={width}
        height={height}
        tileSize={24}
      />
    </>
  );
};
