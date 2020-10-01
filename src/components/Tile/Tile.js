import React, { memo } from 'react';

import { tileFill } from 'const';

import './Tile.scss';

export const Tile = memo(({ state: { fill } }) => {
  let className = 'tile tile__';

  switch (fill) {
    case tileFill.None:
      className += 'none';
      break;
    case tileFill.I:
      className += 'i';
      break;
    case tileFill.J:
      className += 'j'
      break;
    case tileFill.L:
      className += 'l';
      break;
    case tileFill.O:
      className += 'o';
      break;
    case tileFill.S:
      className += 's';
      break;
    case tileFill.T:
      className += 't';
      break;
    case tileFill.Z:
      className += 'z';
      break;
    default:
      throw new Error(`Unexpected tile fill of "${fill}"!`);
  }

  return (<div className={className} />);
});
