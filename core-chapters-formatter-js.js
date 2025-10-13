document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const submitBtn = document.getElementById("submitBtn");
    const copyBtn = document.getElementById("copyBtn");
    const outputHtml = document.getElementById("outputHtml");
    const titleInput = document.getElementById('titleInput');

    function formatTextToHTML(text) {
        const title = titleInput.value.trim();
        const lines = text.split("\n");
        let htmlOutput = "";

            if (title) {
                htmlOutput += `<p class="title">${title}</p>\n\n`;
            }

        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return; // Skip empty lines

            if (trimmedLine.startsWith("***")) {
                htmlOutput += `<p class="chapterHeader">${trimmedLine.substring(3).trim()}</p>\n`;
            } else if (trimmedLine.startsWith("-")) {
                htmlOutput += `<p class="subTopicHeader">${trimmedLine.substring(1).trim()}</p>\n`;
            } else if (trimmedLine.startsWith("=")) {
                htmlOutput += `<hr class="divider"><p class="question">${trimmedLine.substring(1).trim()}</p>\n`;
            } else {
                htmlOutput += `<p class="answer">${trimmedLine}</p>\n`;
            }
        });

        return htmlOutput;
    }

    submitBtn.addEventListener("click", () => {
        const formattedHTML = formatTextToHTML(inputText.value);
        outputHtml.textContent = formattedHTML;
    });

    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(outputHtml.textContent)
            .then(() => alert("HTML copied to clipboard!"))
            .catch(err => alert("Failed to copy: " + err));
    });
});
