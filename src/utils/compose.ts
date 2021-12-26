export default (...fns: ((...args: any[]) => any)[]) =>
  (...args: any[]) => {
    const [first, ...rest] = fns;

    return rest.reduce((acc, fn) => fn(acc), first(...args));
  };
