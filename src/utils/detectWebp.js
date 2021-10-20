export const detectWebp = () => {
  if (document.getElementsByClassName('no-js').length) {
    return false;
  }

  return document.getElementsByClassName('webp').length !== 0;
};
