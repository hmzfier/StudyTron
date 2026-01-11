//note: this was the new code that added the focus buttons

const submitBtn = document.getElementById('submitBtn');
const inputText = document.getElementById('inputText');
const outputHtml = document.getElementById('outputHtml');
const copyBtn = document.getElementById('copyBtn');
const titleInput = document.getElementById('titleInput');

submitBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const lines = inputText.value.split('\n');
    let htmlOutput = '';
    let divID = 1; // div counter
    let currentDivContent = null; // accumulate question + choices + answer
    let waitingForAnswer = false; // true after a question is added

    if (title) {
        htmlOutput += `<p class="title">${title}</p>\n\n`;
    }

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return; // skip empty lines

        const tabCount = line.match(/^\t*/)[0].length;

        // Detect titles starting with ***
        if (trimmed.startsWith('***')) {
            // Close current div if open
            if (currentDivContent) {
                htmlOutput += `<div divID="${divID}">\n${currentDivContent}${generateFocusButtons(divID)}</div>\n`;
                divID++;
                currentDivContent = null;
                waitingForAnswer = false;
            }
            htmlOutput += `<hr class="divider"><p class="subTopicHeader">${trimmed.substring(3).trim()}</p>\n`;
            return;
        }

        // New question (no tabs)
        if (tabCount === 0 && !waitingForAnswer) {
            // Close previous div if somehow still open
            if (currentDivContent) {
                htmlOutput += `<div divID="${divID}">\n${currentDivContent}${generateFocusButtons(divID)}</div>\n`;
                divID++;
            }
            currentDivContent = `<hr class="divider"><p class="question">${trimmed}</p>\n`;
            waitingForAnswer = true; // now expecting choices or answer
        } 
        else if (tabCount === 0 && waitingForAnswer) {
            // Choices for the current question
            currentDivContent += `<p class="questionChoice">${trimmed}</p>\n`;
        }
        else if (tabCount >= 1 && waitingForAnswer) {
            // Answer line (tabbed)
            currentDivContent += `<p class="answer">${trimmed}</p>\n`;

            // After adding answer, close the div
            htmlOutput += `<div divID="${divID}">\n${currentDivContent}${generateFocusButtons(divID)}</div>\n`;
            divID++;
            currentDivContent = null;
            waitingForAnswer = false;
        }
    });

    // If the last question didn't have a tabbed answer, close it anyway
    if (currentDivContent) {
        htmlOutput += `<div divID="${divID}">\n${currentDivContent}${generateFocusButtons(divID)}</div>\n`;
    }

    outputHtml.textContent = htmlOutput;
});

// Function to generate 3 focus buttons for a div
function generateFocusButtons(divID) {
    return `
        <div class="focus-btn-container">
            <button class="focus-btn" data-divid="${divID}" data-focus="1">Focus</button>
        </div>
    `;
}

//If i ever want to add more focus buttons, I can just add these buttons to the above return code
//<button class="focus-btn" data-divid="${divID}" data-focus="2">Focus 2</button>
//<button class="focus-btn" data-divid="${divID}" data-focus="3">Focus 3</button>

// Copy title + output to clipboard silently
copyBtn.addEventListener('click', () => {
    const textToCopy = outputHtml.textContent;
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy)
        .catch(err => console.error('Failed to copy: ', err));
});
