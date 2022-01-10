import {
  darken,
  rgba,
} from 'polished';

import styled, {
  css,
} from 'styled-components';

import TILE_FILL from 'constants/tile-fill';

const getFillColor = (fill: TILE_FILL) => {
  switch (fill) {
    case TILE_FILL.I:
      return '#0dc2ff';
    case TILE_FILL.J:
      return '#3877ff';
    case TILE_FILL.L:
      return '#ff8e0d';
    case TILE_FILL.O:
      return '#ffe138';
    case TILE_FILL.S:
      return '#0dff72';
    case TILE_FILL.T:
      return '#f538ff';
    case TILE_FILL.Z:
      return '#ff0d72';
  }
};

export default styled.div<Tile>`
  background-color: transparent;
  border-radius: 2px;
  position: relative;

  ${({
    fill,
  }) => {
    if (fill) {
      const color = getFillColor(fill)!;

      return css`
        background-color: ${darken(.2, color)};

        &::before,
        &::after {
          content: '';
          position: absolute;
          left: 2px;
          top: 2px;
          right: 2px;
          bottom: 2px;
          border-radius: inherit;
        }

        &::before {
          background-color: ${rgba(color, .2)};
        }

        &::after {
          background: radial-gradient(
            ellipse at top,
            ${color},
            transparent
          );
        }
      `;
    }
  }}
`;
