import Counter from 'components/Counter';
import Tiles from 'components/Tiles';
import KeyCode from 'constants/keyCode';
import useFocus from 'hooks/useFocus';
import useTetris from 'hooks/useTetris';
import { KeyboardEvent, SyntheticEvent } from 'react';

import Props from './props';
import styles from './styles.module.scss';

export default (props: Props) => {
  const { width } = props;

  const { state, makeMove, setIsAutoDrop } = useTetris(props);

  const handleClick = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    makeMove(event.keyCode);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.keyCode === KeyCode.ArrowDown) {
      setIsAutoDrop(true);
    }
  };

  return (
    <a
      href="/"
      data-testid={styles.tetris}
      className={styles.tetris}
      ref={useFocus()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <Counter className={styles.score} count={state.score} />
      <Tiles width={width} tiles={state.tiles} />
    </a>
  );
};
