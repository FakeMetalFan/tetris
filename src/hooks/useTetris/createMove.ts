import KeyCode from 'constants/keyCode';

export default (code?: KeyCode) => {
  switch (code) {
    case KeyCode.ArrowUp:
      return {
        isRotation: true,
      };
    case KeyCode.ArrowLeft:
      return {
        position: {
          row: 0,
          col: -1,
        },
      };
    case KeyCode.ArrowRight:
      return {
        position: {
          row: 0,
          col: 1,
        },
      };
    case KeyCode.ArrowDown:
    default:
      return {
        isDown: true,
        position: {
          row: 1,
          col: 0,
        },
      };
  }
};
