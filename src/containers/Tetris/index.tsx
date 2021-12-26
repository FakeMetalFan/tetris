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

  const handleKeyDown = ({ code }: KeyboardEvent) => {
    code === KEY_CODE.ARROW_LEFT && left();
    code === KEY_CODE.ARROW_RIGHT && right();
    code === KEY_CODE.ARROW_UP && rotate();
    code === KEY_CODE.ARROW_DOWN && accelerate();
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    event.code === KEY_CODE.ARROW_DOWN && decelerate();
  };

  useEventListener('keydown', handleKeyDown);
  useEventListener('keyup', handleKeyUp);
  useInterval(drop, fast ? INTERVAL.FAST : INTERVAL.SLOW);

  return (
    <>
      <Counter count={score} tagName='div' className={styles.counter} />
      <Tiles tiles={tiles} width={width} height={height} tileSize={24} />
    </>
  );
};
