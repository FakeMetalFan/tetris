import React, { memo } from 'react';

import { getTileClassName } from 'utils/tile-class-name';

import './Tile.scss';

export const Tile = memo(({ state }) => (<div className={getTileClassName(state.fill)} />));
