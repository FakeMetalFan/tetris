import Counter from 'components/Counter';
import Tiles from 'components/Tiles';

import INTERVAL from 'constants/interval';
import KEY_CODE from 'constants/key-code';

import useTetris from 'hooks/use-tetris';
import useEventHandler from 'hooks/use-event-handler';
import useInterval from 'hooks/use-interval';

import * as Styles from './styles';

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

  useEventHandler('keydown', (event: KeyboardEvent) => {
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
    }
  });

  useEventHandler('keyup', (event: KeyboardEvent) => {
    if (event.code === KEY_CODE.ARROW_DOWN) {
      decelerate();
    }
  });

  useInterval(drop, fast ? INTERVAL.FAST : INTERVAL.SLOW);

  return (
    <>
      <Counter
        count={score}
        Styles={Styles.Counter}
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
