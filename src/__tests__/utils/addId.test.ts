import addId from 'utils/addId';

describe('addId', () => {
  it('should add a unique identifier to an object-like item', () => {
    expect(addId({}).id).toEqual(expect.any(String));

    const item = { a: 1 };

    expect(addId(item)).not.toStrictEqual(addId(item));
  });
});
