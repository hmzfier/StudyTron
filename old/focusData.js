// Arrays to store selected divIDs
const focusArray1 = [];
const focusArray2 = [];
const focusArray3 = [];

// Function to update debug output
/*function updateDebug() {
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
}*/

// Function to attach click events to the focus buttons
function initFocusButtons() {
    const buttons = document.querySelectorAll('.focus-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const divID = btn.dataset.divid;
            const focus = parseInt(btn.dataset.focus);

            let arr;
            let containerClass;
            if (focus === 1) { arr = focusArray1; containerClass = 'focus1Container'; }
            else if (focus === 2) { arr = focusArray2; containerClass = 'focus2Container'; }
            else { arr = focusArray3; containerClass = 'focus3Container'; }

            const index = arr.indexOf(divID);
            if (index === -1) {
                arr.push(divID);
                btn.classList.add('selected');

                // Clone the div
                const originalDiv = document.querySelector(`div[divID="${divID}"]`);
                if (!originalDiv) return;

                const clone = originalDiv.cloneNode(true);

                // Remove the focus buttons from the clone
                const focusButtons = clone.querySelectorAll('.focus-btn');
                focusButtons.forEach(b => b.remove());

                // Add a remove button
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.className = 'remove-btn';
                removeBtn.style.marginTop = '5px';
                removeBtn.addEventListener('click', () => {
                    // Remove div from container
                    clone.remove();

                    // Remove divID from array
                    const removeIndex = arr.indexOf(divID);
                    if (removeIndex !== -1) arr.splice(removeIndex, 1);

                    // Unhighlight the original focus button
                    const originalBtn = document.querySelector(`.focus-btn[data-divid="${divID}"][data-focus="${focus}"]`);
                    if (originalBtn) originalBtn.classList.remove('selected');

                    updateDebug();
                });

                clone.appendChild(removeBtn);

                // Append clone to the correct container
                const container = document.querySelector(`.${containerClass}`);
                if (container) container.appendChild(clone);

            } else {
                // Already selected: remove from array and remove clone
                arr.splice(index, 1);
                btn.classList.remove('selected');

                const container = document.querySelector(`.${containerClass}`);
                if (container) {
                    const clone = container.querySelector(`div[divID="${divID}"]`);
                    if (clone) clone.remove();
                }
            }

            //updateDebug();
        });
    });
}

// Initialize buttons on page load (if already rendered)
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initFocusButtons === 'function') initFocusButtons();
});







