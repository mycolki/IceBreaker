export const checkBreakerLength = (breakers, target) => {
  return breakers.filter((breaker) => breaker[target]).length;
};
