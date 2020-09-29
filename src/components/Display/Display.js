import React from 'react';

import { Tile } from '..';

import './Display.scss';

export const Display = ({ state, columnsCount }) => (
  <div className='display' style={{gridTemplateColumns: `repeat(${columnsCount}, 1fr)`}}>
    {state.map((row, rowAddress) =>
      row.map((tile, tileAddress) => <Tile key={tileAddress * columnsCount + rowAddress} state={tile} />)
    )}
  </div>
);
