//toggle button to show answers
/*const button = document.getElementById('toggleAnswers');
let isRed = false; // Keeps track of toggle state

button.addEventListener('click', () => {
    const answers = document.querySelectorAll('.answer');
    const answers2 = document.querySelectorAll('.answer2');
    const answers3 = document.querySelectorAll('.highlight');
    
    answers.forEach(el => {
        el.style.color = isRed ? '#ffffff' : '#2d2d2d';
    });

     //isRed = !isRed;

    answers2.forEach(el => {
        el.style.color = isRed ? '#ffffff' : '#2d2d2d';
    });

    isRed = !isRed; // Flip the toggle state
});*/


//new toggle button
//toggle button to show answers
const button2 = document.getElementById('blepButton');
let isRed2 = false; // Keeps track of toggle state

button2.addEventListener('click', () => {
    const answers = document.querySelectorAll('.answer');
    const answers2 = document.querySelectorAll('.answer2');
    const answers3 = document.querySelectorAll('.highlight');
    const answers4 = document.querySelectorAll('.arrow');
    const answers5 = document.querySelectorAll('.highlight2');
    
    answers.forEach(el => {
        el.style.color = isRed2 ? '#ffffff' : '#2d2d2d';
    });

    answers2.forEach(el => {
        el.style.color = isRed2 ? '#ffffff' : '#2d2d2d';
    });

    answers3.forEach(el => {
        el.style.color = isRed2 ? '#fd3ac3' : '#2d2d2d';
    });
    answers4.forEach(el => {
        el.style.color = isRed2 ? '#77ff29' : '#2d2d2d';
    });
     answers5.forEach(el => {
        el.style.color = isRed2 ? '#ff4039' : '#2d2d2d';
    });

    isRed2 = !isRed2; // Flip the toggle state
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



