export const checkTwoBattlers = (battlers) => {
  const isNoOne = Object.values(battlers).filter(
    (battler) => !battler.name,
  ).length;

  return isNoOne ? false : true;
};
