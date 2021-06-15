import Counter from 'components/Counter';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Tile from 'components/Tile';
import KeyCode from 'constants/keyCode';
import MoveCode from 'constants/moveCode';
import useDidMount from 'hooks/useDidMount';
import useTetris from 'hooks/useTetris';
import { KeyboardEvent, SyntheticEvent, useRef } from 'react';
import createMove from 'utils/createMove';

import styles from './tetris.module.scss';

const Tetris = (params: TetrisParams) => {
  const { width } = params;

  const containerRef = useRef<HTMLAnchorElement>(null);

  const { tiles, score, setMove, setIsAutoDrop } = useTetris(params);

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

  const handleKeyUp = ({ keyCode }: KeyboardEvent) => {
    if (keyCode === KeyCode.ArrowDown) {
      setIsAutoDrop(true);
    }
  };

  useDidMount(() => {
    containerRef.current?.focus();
  });

  return (
    <>
      <Header />
      <main>
        <a
          href="/"
          data-testid={styles.tetris}
          className={styles.tetris}
          ref={containerRef}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        >
          <div className={styles.score}>
            <Counter count={score} />
          </div>
          <div
            data-testid={styles.tiles}
            className={styles.tiles}
            style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}
          >
            {tiles.map((row) =>
              row.map(({ fill, id }) => <Tile fill={fill} key={id} />)
            )}
          </div>
        </a>
      </main>
      <Footer />
    </>
  );
};

export default Tetris;
