import Counter from 'components/Counter';
import Tiles from 'components/Tiles';
import KeyCode from 'constants/keyCode';
import MoveCode from 'constants/moveCode';
import useDidMount from 'hooks/useDidMount';
import useTetris from 'hooks/useTetris';
import { KeyboardEvent, SyntheticEvent, useRef } from 'react';
import createMove from 'utils/createMove';

import styles from './tetris.module.scss';

const Tetris = (props: TetrisProps) => {
  const { width } = props;

  const containerRef = useRef<HTMLAnchorElement>(null);

  const { tiles, score, setMove, setIsAutoDrop } = useTetris(props);

  const handleClick = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  const handleKeyDown = ({ keyCode }: KeyboardEvent) => {
    switch (keyCode) {
      case KeyCode.ArrowUp:
        setMove(createMove(MoveCode.Rotation));
        break;
      case KeyCode.ArrowLeft:
        setMove(createMove(MoveCode.Left));
        break;
      case KeyCode.ArrowRight:
        setMove(createMove(MoveCode.Right));
        break;
      case KeyCode.ArrowDown:
      default:
        setIsAutoDrop(false);
        setMove(createMove());
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.keyCode === KeyCode.ArrowDown) {
      setIsAutoDrop(true);
    }
  };

  useDidMount(() => {
    containerRef.current?.focus();
  });

  return (
    <a
      href="/"
      data-testid={styles.tetris}
      className={styles.tetris}
      ref={containerRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <Counter className={styles.score} count={score} />
      <Tiles width={width} tiles={tiles} />
    </a>
  );
};

export default Tetris;
