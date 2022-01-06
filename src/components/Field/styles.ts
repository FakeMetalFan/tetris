import styled, {
  css,
} from 'styled-components';

import {
  Props
} from '.';

export default styled.div<Props>`
  border: 2px solid #fff;
  border-radius: 3px;
  display: grid;
  grid-gap: 1px;

  ${({
    width,
    tileSize,
    height,
  }) =>
    css`
      grid-template-columns: repeat(${width}, ${tileSize}px);
      grid-template-rows: repeat(${height}, ${tileSize}px);
    `
  }
`;
