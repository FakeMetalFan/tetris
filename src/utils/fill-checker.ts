import TileFill from 'constants/tile-fill';

class FillChecker {
  constructor(private fill: TileFill) {}

  get isEmpty() {
    return this.fill === TileFill.Empty;
  }

  get isI() {
    return this.fill === TileFill.I;
  }

  get isJ() {
    return this.fill === TileFill.J;
  }

  get isL() {
    return this.fill === TileFill.L;
  }

  get isO() {
    return this.fill === TileFill.O;
  }

  get isS() {
    return this.fill === TileFill.S;
  }

  get isT() {
    return this.fill === TileFill.T;
  }

  get isZ() {
    return this.fill === TileFill.Z;
  }
}

export default FillChecker;
