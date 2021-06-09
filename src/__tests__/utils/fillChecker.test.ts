import TileFill from 'constants/tileFill';
import FillChecker from 'utils/fillChecker';

describe('FillChecker', () => {
  it('should indicate an empty fill', () => {
    expect(new FillChecker(TileFill.Empty).isEmpty).toBe(true);
    expect(new FillChecker(TileFill.I).isEmpty).toBe(false);
  });

  it('should indicate an "I" fill', () => {
    expect(new FillChecker(TileFill.I).isI).toBe(true);
    expect(new FillChecker(TileFill.Empty).isI).toBe(false);
  });

  it('should indicate an "J" fill', () => {
    expect(new FillChecker(TileFill.J).isJ).toBe(true);
    expect(new FillChecker(TileFill.Empty).isJ).toBe(false);
  });

  it('should indicate an "L" fill', () => {
    expect(new FillChecker(TileFill.L).isL).toBe(true);
    expect(new FillChecker(TileFill.Empty).isL).toBe(false);
  });

  it('should indicate an "O" fill', () => {
    expect(new FillChecker(TileFill.O).isO).toBe(true);
    expect(new FillChecker(TileFill.Empty).isO).toBe(false);
  });

  it('should indicate an "S" fill', () => {
    expect(new FillChecker(TileFill.S).isS).toBe(true);
    expect(new FillChecker(TileFill.Empty).isS).toBe(false);
  });

  it('should indicate an "T" fill', () => {
    expect(new FillChecker(TileFill.T).isT).toBe(true);
    expect(new FillChecker(TileFill.Empty).isT).toBe(false);
  });

  it('should indicate an "Z" fill', () => {
    expect(new FillChecker(TileFill.Z).isZ).toBe(true);
    expect(new FillChecker(TileFill.Empty).isZ).toBe(false);
  });
});
