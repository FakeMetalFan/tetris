import React from 'react';

import { Tile } from '..';

import './Display.scss';

export const Display = ({ state, width }) => (
  <div className='display' style={{gridTemplateColumns: `repeat(${width}, 1fr)`}}>
    {state.map((row, rowAddress) =>
      row.map((tile, colAddress) => <Tile key={colAddress * width + rowAddress} state={tile} />)
    )}
  </div>
);
