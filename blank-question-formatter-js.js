const submitBtn = document.getElementById('submitBtn');
const inputText = document.getElementById('inputText');
const outputHtml = document.getElementById('outputHtml');
const copyBtn = document.getElementById('copyBtn');
const titleInput = document.getElementById('titleInput');

submitBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const lines = inputText.value.split('\n');
    let htmlOutput = '';

    if (title) {
        htmlOutput += `<p class="title">${title}</p>\n\n`;
    }

    let lastWasQuestion = false;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) {
            lastWasQuestion = false; // blank line resets question flag
            return;
        }

        const tabCount = line.match(/^\t*/)[0].length;
        let htmlLine = '';

        if (tabCount === 0) {
            if (!lastWasQuestion) {
                // This is a new question
                htmlLine = `<hr class="divider"><p class="question">${trimmed}</p>`;
                lastWasQuestion = true;
            } else {
                // This is a question choice (single new line after a question)
                htmlLine = `<p class="questionChoice">${trimmed}</p>`;
            }
        } else if (tabCount >= 1) {
            // This is an answer
            htmlLine = `<p class="answer">${trimmed}</p>`;
            lastWasQuestion = false; // reset after an answer
        }

        htmlOutput += htmlLine + '\n';
    });

    outputHtml.textContent = htmlOutput;
});

// Copy title + output to clipboard silently
copyBtn.addEventListener('click', () => {
    const textToCopy = outputHtml.textContent;
    if (!textToCopy) return; // nothing to copy

    navigator.clipboard.writeText(textToCopy)
        .catch(err => console.error('Failed to copy: ', err));
});
