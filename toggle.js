//toggle button to show answers
const button = document.getElementById('toggleAnswers');
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
});

// Toggle button to show/hide answers
/*const button = document.getElementById('toggleAnswers');
let answersHidden = false; // Keeps track of toggle state

button.addEventListener('click', () => {
    // Remember the current scroll position
    const scrollY = window.scrollY;

    const answers = document.querySelectorAll('.answer, .answer2'); // select both classes

    answers.forEach(el => {
        if (answersHidden) {
            el.style.display = 'block'; // show
        } else {
            el.style.display = 'none';  // hide
        }
    });

    answersHidden = !answersHidden; // flip the toggle state

    // After the layout updates, restore scroll position
    requestAnimationFrame(() => {
        window.scrollTo({
            top: scrollY,
            behavior: 'instant'
        });
    });
});*/

// Toggle button to show/hide answers while keeping vertical position stable
/*const button = document.getElementById('toggleAnswers');
let answersHidden = false; // false = answers currently visible

button.addEventListener('click', () => {
  const answers = Array.from(document.querySelectorAll('.answer, .answer2'));

  // Find a good anchor element (first visible <p> that's NOT an answer)
  const paragraphs = Array.from(document.querySelectorAll('p'));
  let anchor = null;

  for (let i = 0; i < paragraphs.length; i++) {
    const rect = paragraphs[i].getBoundingClientRect();
    // element is at least partially visible in the viewport (bottom > 0)
    if (rect.bottom > 0) {
      // prefer a non-answer element for an anchor
      if (!paragraphs[i].classList.contains('answer') &&
          !paragraphs[i].classList.contains('answer2')) {
        anchor = paragraphs[i];
      } else {
        // if it's an answer, try to find the nearest preceding non-answer
        let j = i - 1;
        while (j >= 0) {
          if (!paragraphs[j].classList.contains('answer') &&
              !paragraphs[j].classList.contains('answer2')) {
            anchor = paragraphs[j];
            break;
          }
          j--;
        }
        // otherwise try the next non-answer after it
        if (!anchor) {
          let k = i + 1;
          while (k < paragraphs.length) {
            if (!paragraphs[k].classList.contains('answer') &&
                !paragraphs[k].classList.contains('answer2')) {
              anchor = paragraphs[k];
              break;
            }
            k++;
          }
        }
        // if still none found, fall back to this paragraph (answer) as anchor
        if (!anchor) anchor = paragraphs[i];
      }
      break;
    }
  }

  // fallback anchor
  if (!anchor) anchor = document.body;

  // measure anchor offset from top of viewport BEFORE toggle
  const anchorTopBefore = anchor.getBoundingClientRect().top;

  // toggle answers: if they are currently visible (answersHidden === false), hide them; otherwise show
  const willHide = !answersHidden;
  answers.forEach(el => {
    el.style.display = willHide ? 'none' : '';
  });
  // update state
  answersHidden = willHide;

  // Wait for layout to stabilize, then adjust scroll so anchor returns to same viewport offset.
  // Use two rAFs to be safe across browsers (ensures reflow/paint done).
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const anchorTopAfter = anchor.getBoundingClientRect().top;
      const delta = anchorTopBefore - anchorTopAfter;
      // If delta is non-zero, scroll by that amount to restore anchor position
      if (Math.abs(delta) > 0.5) {
        window.scrollBy({ top: delta, left: 0, behavior: 'auto' });
      }
    });
  });
});*/




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
/*const toggleButtons = document.getElementById('toggleJump');
const scrollButtons = document.querySelector('.scroll-buttons');

toggleButtons.addEventListener('click', () => {
    const isHidden = scrollButtons.classList.toggle('hidden');
    toggleButtons.textContent = isHidden ? 'Menu' : 'Hide';
});*/



// JS to hide on scroll down, show on scroll up
let lastScrollY = window.scrollY;
const bottomMenu = document.querySelector('.bottom-menu');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        // Scrolling down → hide menu
        bottomMenu.style.display = 'none';
    } else {
        // Scrolling up → show menu
        bottomMenu.style.display = 'flex';
    }

    lastScrollY = currentScrollY;
});