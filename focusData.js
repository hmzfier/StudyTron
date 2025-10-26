// Arrays to store selected divIDs
const focusArray1 = [];
const focusArray2 = [];
const focusArray3 = [];

// Function to update debug output
function updateDebug() {
    let debugContainer = document.getElementById('debugOutput');

    // Create debug container if it doesn't exist
    if (!debugContainer) {
        debugContainer = document.createElement('div');
        debugContainer.id = 'debugOutput';
        debugContainer.style.marginTop = '20px';
        debugContainer.style.padding = '10px';
        debugContainer.style.border = '1px solid #ccc';
        debugContainer.style.backgroundColor = '#f9f9f9';
        document.body.appendChild(debugContainer);
    }

    debugContainer.innerHTML = `
        <p><strong>Focus 1:</strong> [${focusArray1.join(', ')}]</p>
        <p><strong>Focus 2:</strong> [${focusArray2.join(', ')}]</p>
        <p><strong>Focus 3:</strong> [${focusArray3.join(', ')}]</p>
    `;
}

// Function to attach click events to the focus buttons
function initFocusButtons() {
    const buttons = document.querySelectorAll('.focus-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const divID = btn.dataset.divid;
            const focus = parseInt(btn.dataset.focus);

            let arr;
            if (focus === 1) arr = focusArray1;
            else if (focus === 2) arr = focusArray2;
            else arr = focusArray3;

            const index = arr.indexOf(divID);
            if (index === -1) {
                arr.push(divID);
                btn.classList.add('selected');
            } else {
                arr.splice(index, 1);
                btn.classList.remove('selected');
            }

            updateDebug();
        });
    });
}

// Initialize buttons on page load (if already rendered)
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initFocusButtons === 'function') initFocusButtons();
});


const submitToSheetBtn = document.getElementById("submitToSheet");

submitToSheetBtn.addEventListener("click", () => {
    const pageTitleElement = document.querySelector(".title");
    const title = pageTitleElement ? pageTitleElement.textContent.trim() : null;
    if (!title) return alert("No page title found");

    const payload = {
        title: title,
        focus1: focusArray1,
        focus2: focusArray2,
        focus3: focusArray3
    };

    fetch("https://script.google.com/macros/s/AKfycbz_PIFgFdfUMdSfO8kjMCThYc6ENo17oLAi1NA2EhDUfGmpXDjA7q_Pri1To9XKSzaT/exec", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.text())
    .then(response => alert("Google Sheets updated: " + response))
    .catch(err => alert("Error updating Google Sheets: " + err));
});