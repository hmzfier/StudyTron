//toggle button to show answers
/*const button = document.getElementById('toggleAnswers');
let isRed = false; // Keeps track of toggle state

button.addEventListener('click', () => {
    const answers = document.querySelectorAll('.answer');
    const answers2 = document.querySelectorAll('.answer2');
    
    answers.forEach(el => {
        el.style.color = isRed ? '#ffffff' : '#303030';
    });

    answers2.forEach(el => {
        el.style.color = isRed ? '#ffffff' : '#303030';
    });

    isRed = !isRed; // Flip the toggle state
});*/

// Toggle button to show/hide answers
const button = document.getElementById('toggleAnswers');
let answersHidden = false; // Keeps track of toggle state

button.addEventListener('click', () => {
    const answers = document.querySelectorAll('.answer, .answer2'); // select both classes

    answers.forEach(el => {
        if (answersHidden) {
            el.style.display = 'block'; // show
        } else {
            el.style.display = 'none';  // hide
        }
    });

    answersHidden = !answersHidden; // flip the toggle state
});




//back to top button
const backToTopBtn = document.getElementById('backToTop');

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



//scroll to middle and bottom
const toMiddle = document.getElementById('toMiddle');
const toBottom = document.getElementById('toBottom');

toMiddle.addEventListener('click', () => {
    const middle = document.body.scrollHeight / 2;
    window.scrollTo({ top: middle, behavior: 'smooth' });
});

toBottom.addEventListener('click', () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});



// Toggle show/hide Jump Buttons
const toggleButtons = document.getElementById('toggleJump');
const scrollButtons = document.querySelector('.scroll-buttons');

toggleButtons.addEventListener('click', () => {
    const isHidden = scrollButtons.classList.toggle('hidden');
    toggleButtons.textContent = isHidden ? 'Menu' : 'Hide';
});