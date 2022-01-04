import Counter from 'components/Counter';
import Field from 'components/Field';

import INTERVAL from 'constants/interval';
import KEY_CODE from 'constants/key-code';

import useTetris from 'hooks/use-tetris';
import useEventHandler from 'hooks/use-event-handler';
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
    field,
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
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.code === KEY_CODE.ARROW_DOWN) {
      decelerate();
    }
  };

  useEventHandler('keydown', handleKeyDown);
  useEventHandler('keyup', handleKeyUp);
  useInterval(drop, fast ? INTERVAL.FAST : INTERVAL.SLOW);

  return (
    <>
      <Counter
        count={score}
        tagName='div'
        className={styles.counter}
      />
      <Field
        field={field}
        width={width}
        height={height}
        tileSize={24}
      />
    </>
  );
};
