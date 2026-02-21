const menuButton = document.getElementById('menuButton');
const sideMenu = document.getElementById('sideMenu');

menuButton.addEventListener('click', () => {
  sideMenu.classList.toggle('active');
});

// Close the menu when any button inside the menu is clicked
const menuButtons = sideMenu.querySelectorAll('button');
menuButtons.forEach(button => {
  button.addEventListener('click', () => {
    sideMenu.classList.remove('active');
  });
});