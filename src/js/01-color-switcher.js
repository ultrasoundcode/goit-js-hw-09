function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

document.querySelector('[data-start]').addEventListener('click', function () {
  let interval = setInterval(function () {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

document.querySelector('[data-stop]').addEventListener('click', function () {
  clearInterval(interval);
  this.disabled = true;
});
