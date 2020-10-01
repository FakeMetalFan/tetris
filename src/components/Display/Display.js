import React from 'react';

import { Tile } from '..';

import './Display.scss';

export const Display = ({ state, width }) => (
  <div className='display' style={{gridTemplateColumns: `repeat(${width}, 1fr)`}}>
    {state.map((row, rowAddress) =>
      row.map((tile, tileAddress) => <Tile key={tileAddress * width + rowAddress} state={tile} />)
    )}
  </div>
);
