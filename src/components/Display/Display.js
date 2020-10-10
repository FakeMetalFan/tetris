import React from 'react';

import { Tile } from '..';

import './Display.scss';

export const Display = ({ state, width }) => <div
  className='display'
  style={{gridTemplateColumns: `repeat(${width}, 1fr)`}}
>
  {state.map(row => row.map((tile, colAddress) => <Tile key={colAddress} state={tile} />))}
</div>;
