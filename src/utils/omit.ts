export default <T extends Record<string, unknown>>(
  obj: T,
  ...keys: (keyof T)[]
) => {
  const copy = {
    ...obj,
  };

  keys.forEach((key) => {
    delete copy[key];
  });

  return copy;
};
