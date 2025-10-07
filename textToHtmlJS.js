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
        htmlOutput += `<p class="title">${title}</p>\n\n`; // Add title with class "title"
    }

    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed === '') return; // skip empty lines

        let htmlLine = '';
        const tabCount = line.match(/^\t*/)[0].length;

        // Detect titles starting with ***
        if (trimmed.startsWith('***')) {
            const cleanTitle = trimmed.replace(/^\*{3}/, '').trim(); // remove ***
            htmlLine = `<hr class="divider"><p class="subTopicHeader">${cleanTitle}</p>`;
        } 
        else if (tabCount === 0) {
            htmlLine = `<hr class="divider"><p class="topicHeader">${trimmed}</p>`;
        } else if (tabCount === 1) {
            htmlLine = `<p class="question">${trimmed}</p>`;
        } else if (tabCount === 2) {
            htmlLine = `<p class="answer">${trimmed}</p>`;
        } else if (tabCount === 3) {
            htmlLine = `<p class="answer2">${trimmed}</p>`;
        }

        htmlOutput += htmlLine + '\n';
    });

    outputHtml.textContent = htmlOutput; // show as text, not rendered HTML
});

// Copy title + output to clipboard silently
copyBtn.addEventListener('click', () => {
    const textToCopy = outputHtml.textContent;
    if (!textToCopy) return; // nothing to copy

    navigator.clipboard.writeText(textToCopy)
        .catch(err => console.error('Failed to copy: ', err));
});
