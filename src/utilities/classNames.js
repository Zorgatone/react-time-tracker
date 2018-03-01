export const classNames = (...args) => (
  Array.from(
    new Set(
      args
        .map((arg) => {
          if (Array.isArray(arg)) {
            const arr = arg
              .filter((el) => 'string' === typeof el)
              .reduce(
                (acc, el) => (
                  el.indexOf(' ') >= 0 ? acc.concat(el.split(' ')) : acc.concat(el)
                ), []
              );

            if (arr.length > 0) {
              return arr;
            }

            return null;
          }

          if ('string' === typeof arg && arg.trim().length > 0) {
            const str = arg.trim();

            return str.indexOf(' ') >= 0 ? str.split(' ') : [str];
          }

          if ('object' === typeof arg && null !== arg) {
            return Object.keys(arg)
              .reduce((acc, key) => (
                arg[key] === true ? acc.concat(arg[key]
              ) : acc), []);
          }

          return null;
        })
        .filter((el) => Array.isArray(el) && el.length > 0)
        .reduce((acc, el) => acc.concat(el), [])
    )
  )
    .join(' ')
    .trim()
);

export default classNames;
