import React, { memo } from 'react';

import { getTileClassName } from 'utils';

import './Tile.scss';

export const Tile = memo(({ state }) => (<div className={getTileClassName(state)} />));
