import Position from './position';

type Move = {
  isRotation?: boolean;
  isDown?: boolean;
  position?: Position;
};

export default Move;
