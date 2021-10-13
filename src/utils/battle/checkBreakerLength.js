export const checkBreakerLength = (breakers, target) => {
  console.log(target);
  const length = breakers.filter((breaker) => breaker[target]).length;

  return length;
};
