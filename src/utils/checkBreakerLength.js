export const checkBreakerLength = (breakers) => {
  const length = breakers.filter((breaker) => breaker.name).length;

  return length;
};
