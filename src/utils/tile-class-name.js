import { tileFill } from 'const';

export const getTileClassName = fill => {
  const prefix = 'tile tile__';

  switch (fill) {
    case tileFill.None:
      return `${prefix}none`;
    case tileFill.I:
      return `${prefix}i`;
    case tileFill.J:
      return `${prefix}j`;
    case tileFill.L:
      return `${prefix}l`;
    case tileFill.O:
      return `${prefix}o`;
    case tileFill.S:
      return `${prefix}s`;
    case tileFill.T:
      return `${prefix}t`;
    case tileFill.Z:
      return `${prefix}z`;
    default:
      throw new Error(`Unexpected tile fill of "${fill}"!`);
  }
};
