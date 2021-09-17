import pieces from 'constants/pieces';
import Props from 'containers/Tetris/props';

export default (props: Props) => {
  const piece = pieces[Math.floor(Math.random() * pieces.length)];
  const position = {
    row: 0,
    col: Math.floor((props.width - piece.length) / 2),
  };

  return {
    piece,
    position,
  };
};
