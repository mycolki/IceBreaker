export const getRandomList = (array) => {
  const randomList = [...array];

  for (let i = 0; i < randomList.length; i++) {
    const temp = Math.floor(Math.random() * (i + 1));
    [randomList[i], randomList[temp]] = [randomList[temp], randomList[i]];
  }

  return randomList;
};
