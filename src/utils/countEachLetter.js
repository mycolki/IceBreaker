export const countEachLetter = (string) => {
  const hash = {};

  for (const str of [...string]) {
    if (hash[str]) {
      hash[str] = +1;
      continue;
    }

    hash[str] = 1;
  }

  return hash;
};
