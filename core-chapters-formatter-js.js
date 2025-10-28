//V4 - Works - note this was the new code that added the focus buttons
/*document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const submitBtn = document.getElementById("submitBtn");
    const copyBtn = document.getElementById("copyBtn");
    const outputHtml = document.getElementById("outputHtml");
    const titleInput = document.getElementById('titleInput');

    function formatTextToHTML(text) {
        const title = titleInput.value.trim();
        const lines = text.split("\n");
        let htmlOutput = "";
        let divID = 1; // Initialize div counter
        let currentDivOpen = false;
        let currentDivContent = ""; // accumulate content of the current div

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
                // Close previous div if it exists
                if (currentDivOpen) {
                    // Append Focus buttons before closing
                    currentDivContent += generateFocusButtons(divID);
                    htmlOutput += `<div divID="${divID}">\n${currentDivContent}</div>\n`;
                    divID++;
                }
                // Open new div for this question
                currentDivContent = `<hr class="divider"><p class="question">${trimmedLine.substring(1).trim()}</p>\n`;
                currentDivOpen = true;
            } else if (trimmedLine.startsWith("+")) {
                currentDivContent += `<p class="highlight">${trimmedLine.substring(1).trim()}</p>\n`;
            } else {
                // Treat as answer
                currentDivContent += `<p class="answer">${trimmedLine}</p>\n`;
            }
        });

        // Close the last div if still open
        if (currentDivOpen) {
            currentDivContent += generateFocusButtons(divID);
            htmlOutput += `<div divID="${divID}">\n${currentDivContent}</div>\n`;
        }

        return htmlOutput;
    }

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

    submitBtn.addEventListener("click", () => {
        const formattedHTML = formatTextToHTML(inputText.value);

        // Output raw HTML code (do not render)
        outputHtml.textContent = formattedHTML;
    });

    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(outputHtml.textContent)
            .then(() => alert("HTML copied to clipboard!"))
            .catch(err => alert("Failed to copy: " + err));
    });
});*/






//V3 Works
/*document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const submitBtn = document.getElementById("submitBtn");
    const copyBtn = document.getElementById("copyBtn");
    const outputHtml = document.getElementById("outputHtml");
    const titleInput = document.getElementById('titleInput');

    function formatTextToHTML(text) {
        const title = titleInput.value.trim();
        const lines = text.split("\n");
        let htmlOutput = "";
        let divID = 1; // Initialize div counter
        let currentDivOpen = false;

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
                // Close previous div if it exists
                if (currentDivOpen) {
                    htmlOutput += `</div>\n`;
                    divID++;
                }
                // Open new div for this question
                htmlOutput += `<div divID="${divID}">\n<hr class="divider"><p class="question">${trimmedLine.substring(1).trim()}</p>\n`;

                // Add Focus buttons as HTML (will not render since we output as textContent)
                htmlOutput += `
                    <div class="focus-btn-container">
                        <button class="focus-btn" data-divid="${divID}" data-focus="1">Focus 1</button>
                        <button class="focus-btn" data-divid="${divID}" data-focus="2">Focus 2</button>
                        <button class="focus-btn" data-divid="${divID}" data-focus="3">Focus 3</button>
                    </div>
                `;

                currentDivOpen = true;
            } else if (trimmedLine.startsWith("+")) {
                htmlOutput += `<p class="highlight">${trimmedLine.substring(1).trim()}</p>\n`;
            } else {
                // Treat as answer
                htmlOutput += `<p class="answer">${trimmedLine}</p>\n`;
            }
        });

        // Close the last div if still open
        if (currentDivOpen) {
            htmlOutput += `</div>\n`;
        }

        return htmlOutput;
    }

    submitBtn.addEventListener("click", () => {
        const formattedHTML = formatTextToHTML(inputText.value);

        // Output raw HTML code (do not render)
        outputHtml.textContent = formattedHTML;
    });

    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(outputHtml.textContent)
            .then(() => alert("HTML copied to clipboard!"))
            .catch(err => alert("Failed to copy: " + err));
    });
});*/







//V2 Works
/*document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const submitBtn = document.getElementById("submitBtn");
    const copyBtn = document.getElementById("copyBtn");
    const outputHtml = document.getElementById("outputHtml");
    const titleInput = document.getElementById('titleInput');

    function formatTextToHTML(text) {
        const title = titleInput.value.trim();
        const lines = text.split("\n");
        let htmlOutput = "";
        let divID = 1; // Initialize div counter
        let currentDivOpen = false;

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
                // Close previous div if it exists
                if (currentDivOpen) {
                    htmlOutput += `</div>\n`;
                    divID++;
                }
                // Open new div for this question
                htmlOutput += `<div divID="${divID}">\n<hr class="divider"><p class="question">${trimmedLine.substring(1).trim()}</p>\n`;
                currentDivOpen = true;
            } else if (trimmedLine.startsWith("+")) {
                htmlOutput += `<p class="highlight">${trimmedLine.substring(1).trim()}</p>\n`;
            } else {
                // Treat as answer
                htmlOutput += `<p class="answer">${trimmedLine}</p>\n`;
            }
        });

        // Close the last div if still open
        if (currentDivOpen) {
            htmlOutput += `</div>\n`;
        }

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
});*/












//V1 - works
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
            } else if (trimmedLine.startsWith("+")) {
                htmlOutput += `<p class="highlight">${trimmedLine.substring(1).trim()}</p>\n`;
            }
            else {
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
