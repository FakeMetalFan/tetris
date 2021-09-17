import rotateMatrix from 'utils/rotatePiece';

describe('rotateMatrix', () => {
  it('should rotate a matrix', () => {
    const rotatedMatrix = rotateMatrix([
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ]);

    expect(rotatedMatrix).toStrictEqual([
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, 1],
    ]);
    expect(rotateMatrix(rotatedMatrix)).toStrictEqual([
      [0, 0, 0],
      [0, 0, 0],
      [1, 1, 1],
    ]);
  });
});
