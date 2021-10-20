const detectWebp = () => {
  window.Modernizr.on('webp', function (result) {
    const html = document.getElementsByClassName('webp')[0];
    result ? html.classList.remove('no-webp') : html.classList.remove('webp');
  });
};
