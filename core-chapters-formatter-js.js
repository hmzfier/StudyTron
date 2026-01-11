//V1 - works
document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const submitBtn = document.getElementById("submitBtn");
    const outputHtml = document.getElementById("outputHtml");
    const filterG1Btn = document.getElementById("filterG1");
    const filterG2Btn = document.getElementById("filterG2");
    const filterAllBtn = document.getElementById("filterAll");
    const mainTitle = document.getElementById("mainTitle");

function formatTextToHTML(text) {
    //const title = titleInput.value.trim();
    const lines = text.split("\n");
    let htmlOutput = "";
    let groupOpen = false;

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return;

        // Detect question lines
        if (trimmedLine.startsWith("=")) {

            // Close previous group
            if (groupOpen) {
                htmlOutput += `</div>\n`;
            }

            let groupType = "G0";   // default
            let questionText = trimmedLine.substring(1).trim(); // remove first =

            // Detect =G1= or =G2=
            if (trimmedLine.startsWith("=1")) {
                groupType = "G1";
                questionText = trimmedLine.substring(3).trim(); // remove =G1=
            }
            else if (trimmedLine.startsWith("=2")) {
                groupType = "G2";
                questionText = trimmedLine.substring(3).trim(); // remove =G2=
            }

            htmlOutput += `<div data-group-type="${groupType}">\n`;
            groupOpen = true;
            htmlOutput += `<hr class="divider"><p class="question">${questionText}</p>\n`;
        }
        else if (trimmedLine.startsWith("+")) {
            htmlOutput += `<p class="highlight">${trimmedLine.substring(1).trim()}</p>\n`;
        }
        else if (trimmedLine.startsWith("***")) {
            htmlOutput += `<p class="chapterHeader">${trimmedLine.substring(3).trim()}</p>\n`;
        }
        else if (trimmedLine.startsWith("-")) {
            htmlOutput += `<p class="subTopicHeader">${trimmedLine.substring(1).trim()}</p>\n`;
        }
        else {
            htmlOutput += `<p class="answer">${trimmedLine}</p>\n`;
        }

        // Close final group at end of file
        if (index === lines.length - 1 && groupOpen) {
            htmlOutput += `</div>\n`;
        }
    });

    return htmlOutput;
}



    submitBtn.addEventListener("click", () => {
        const formattedHTML = formatTextToHTML(inputText.value);
       outputHtml.innerHTML = formattedHTML;

    });

  filterG1Btn.addEventListener("click", () => {
    document.querySelectorAll('[data-group-type]').forEach(div => {
        div.style.display = div.dataset.groupType === "G1" ? "block" : "none";
    });
    mainTitle.textContent = "Group 1"; // Update H1 title
});

filterG2Btn.addEventListener("click", () => {
    document.querySelectorAll('[data-group-type]').forEach(div => {
        div.style.display = div.dataset.groupType === "G2" ? "block" : "none";
    });
    mainTitle.textContent = "Group 2"; // Update H1 title
});

filterAllBtn.addEventListener("click", () => {
    document.querySelectorAll('[data-group-type]').forEach(div => {
        div.style.display = "block";
    });
    mainTitle.textContent = "StudyTron"; // Reset H1 title
});

});



