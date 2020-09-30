import cloneDeep from 'lodash/cloneDeep';

export const clone = (target, propName, descriptor) => {
  const { value: fn } = descriptor;

  descriptor.value = function(...args) {
    return cloneDeep(fn.apply(this, args));
  };

  return descriptor;
};
