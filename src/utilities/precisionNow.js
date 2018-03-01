export const precisionNow = (typeof window === 'object' && window &&
  window.performance && window.performance.now.bind(window.performance)) ||
  (() => (new Date()).getTime());

export default precisionNow;
