document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const submitBtn = document.getElementById("submitBtn");
    const outputHtml = document.getElementById("outputHtml");
    const mainTitle = document.getElementById("mainTitle");


    const showEasyBtn = document.getElementById("showEasyBtn");
    const showMedBtn = document.getElementById("showMedBtn");
    const showHardBtn = document.getElementById("showHardBtn");

    //show text area button
    const showTextBtn = document.getElementById("showTextBtn");

    // Filters
    const filterAllBtn = document.getElementById("filterAll");

    const groupFilterButtons = {};

    for (let i = 1; i <= 20; i++) {
        groupFilterButtons[i] = document.getElementById("filterG" + i);
    }


    // Pagination elements (top)
    const prevBtnTop = document.getElementById("prevPage");
    const nextBtnTop = document.getElementById("nextPage");
    const pageDropdownTop = document.getElementById("pageDropdownTop");
    const showAllBtnTop = document.getElementById("showAllPage");

    // Pagination elements (bottom)
    const prevBtnBottom = document.getElementById("prevPageBottom");
    const nextBtnBottom = document.getElementById("nextPageBottom");
    const pageDropdownBottom = document.getElementById("pageDropdownBottom");
    const showAllBtnBottom = document.getElementById("showAllPageBottom");

    const DIVS_PER_PAGE = 8;
    let currentPage = 0;
    let totalPages = 0;

// Difficulty button listeners
showEasyBtn.addEventListener("click", () => {
    currentDifficultyFilter = "easy";
    updateDifficultyView();
    mainTitle.textContent = "Easy Questions";
});

showMedBtn.addEventListener("click", () => {
    currentDifficultyFilter = "med";
    updateDifficultyView();
    mainTitle.textContent = "Medium Questions";
});

showHardBtn.addEventListener("click", () => {
    currentDifficultyFilter = "hard";
    updateDifficultyView();
    mainTitle.textContent = "Hard Questions";
});

function formatTextToHTML(text) {
    const lines = text.split("\n");
    let htmlOutput = "";
    let groupOpen = false;

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return;

        if (trimmedLine.startsWith("=")) {
            if (groupOpen) htmlOutput += "</div>\n";

            let groupType = "G0";
            let difficulty = "none";
            let questionText = "";

            const afterEqual = trimmedLine.substring(1).trim();

            if (!afterEqual) {
                // Case: just "="
                questionText = "";
            } else if (/[A-Z]/.test(afterEqual[0])) {
                // Case: =D:H or similar (difficulty only)
                const diffMatch = afterEqual.match(/^D:([EMH])\s*(.*)/);
                if (diffMatch) {
                    const diffLetter = diffMatch[1];
                    if (diffLetter === "E") difficulty = "easy";
                    if (diffLetter === "M") difficulty = "med";
                    if (diffLetter === "H") difficulty = "hard";
                    questionText = diffMatch[2];
                } else {
                    questionText = afterEqual;
                }
            } else {
                // Case: optional number + optional =D:X
                const numMatch = afterEqual.match(/^(\d+)(?:=D:([EMH]))?\s*(.*)/);
                if (numMatch) {
                    const num = numMatch[1];
                    const diffLetter = numMatch[2];
                    questionText = numMatch[3] || "";

                    groupType = "G" + num;

                    if (diffLetter) {
                        if (diffLetter === "E") difficulty = "easy";
                        if (diffLetter === "M") difficulty = "med";
                        if (diffLetter === "H") difficulty = "hard";
                    }
                } else {
                    questionText = afterEqual;
                }
            }

            // Save original prefix for later updates
            const prefixMatch = trimmedLine.match(/^=(\d*)/);
            const originalPrefix = prefixMatch[1] ? "=" + prefixMatch[1] : "=";

            htmlOutput += `<div data-group-type="${groupType}" data-difficulty="${difficulty}" data-original-prefix="${originalPrefix}">\n`;
            groupOpen = true;
            htmlOutput += `<hr class="divider"><p class="question">${questionText}</p>\n`;
        }
        else if (trimmedLine.startsWith("+")) {
            htmlOutput += `<p class="highlight">${trimmedLine.substring(1).trim()}</p>\n`;
        }
        else if (trimmedLine.startsWith("#")) {
            htmlOutput += `<p class="highlight2">${trimmedLine.substring(1).trim()}</p>\n`;
        }
        else if (trimmedLine.startsWith("@")) {
            htmlOutput += `<p class="questionChoice">${trimmedLine.substring(1).trim()}</p>\n`;
        }
        else if (trimmedLine.startsWith("***")) {
            htmlOutput += `<p class="chapterHeader">${trimmedLine.substring(3).trim()}</p>\n`;
        }
        else if (trimmedLine.startsWith("-")) {
            htmlOutput += `<p class="subTopicHeader">${trimmedLine.substring(1).trim()}</p>\n`;
        }
        else if (trimmedLine.startsWith(">")) {
            htmlOutput += `<p class="answer"><span class="arrow">→</span> ${trimmedLine.substring(1).trim()}</p>\n`;
        }
        else {
            htmlOutput += `<p class="answer">${trimmedLine}</p>\n`;
        }

        if (index === lines.length - 1 && groupOpen) htmlOutput += "</div>\n";
    });

    return htmlOutput;
}









    // Show divs based on start/end index
    function showPage(start, end) {
        const allGroups = document.querySelectorAll("#outputHtml > div");
        const allChapters = document.querySelectorAll("#outputHtml .chapterHeader");

        // Hide chapter headers during pagination
        allChapters.forEach(h => h.style.display = "none");

        allGroups.forEach((div, index) => {
            div.style.display = index >= start && index <= end ? "block" : "none";
        });
    }

    // Populate dropdown menus dynamically
    function populateDropdowns() {
        const allGroups = document.querySelectorAll("#outputHtml > div");
        totalPages = Math.ceil(allGroups.length / DIVS_PER_PAGE);

        const options = [];
        options.push({value: 0, text: "All"}); // page 0 = show all
        for (let i = 1; i <= totalPages; i++) {
            options.push({value: i, text: `Page ${i}`});
        }

        [pageDropdownTop, pageDropdownBottom].forEach(dropdown => {
            dropdown.innerHTML = "";
            options.forEach(opt => {
                const option = document.createElement("option");
                option.value = opt.value;
                option.textContent = opt.text;
                dropdown.appendChild(option);
            });
        });
    }

    // Update dropdowns when current page changes
    function updateDropdowns() {
        [pageDropdownTop, pageDropdownBottom].forEach(dropdown => {
            dropdown.value = currentPage;
        });
    }

   // Display page based on page number
    function goToPage(pageNum) {
        const allGroups = document.querySelectorAll("#outputHtml > div");
        if (pageNum === 0) {
            allGroups.forEach(div => div.style.display = "block");
            document.querySelectorAll("#outputHtml .chapterHeader").forEach(h => h.style.display = "block");
            mainTitle.textContent = "Show All"; // <-- update title
        } else {
            const start = (pageNum - 1) * DIVS_PER_PAGE;
            const end = start + DIVS_PER_PAGE - 1;
            showPage(start, end);
            mainTitle.textContent = `Page ${pageNum}`; // <-- update title
        }
        currentPage = pageNum;
        updateDropdowns();
    }

    // Submit button: show all and setup pagination
    submitBtn.addEventListener("click", () => {
        outputHtml.innerHTML = formatTextToHTML(inputText.value);
        addDifficultyButtons();

          // Highlight difficulty buttons based on data-difficulty
    document.querySelectorAll("#outputHtml > div").forEach(div => {
        const diff = div.dataset.difficulty;
        if (diff === "easy") div.querySelector(".focus-btn-container button:nth-child(1)").style.backgroundColor = "#3b7ce1";
        if (diff === "med") div.querySelector(".focus-btn-container button:nth-child(2)").style.backgroundColor = "#3b7ce1";
        if (diff === "hard") div.querySelector(".focus-btn-container button:nth-child(3)").style.backgroundColor = "#3b7ce1";
    });



        currentPage = 0;
        populateDropdowns();
        goToPage(0); // show all initially

        // Hide textarea and submit button
        inputText.style.display = "none";
        submitBtn.style.display = "none";

        // Show the "Show Text" button
        showTextBtn.style.display = "inline-block";
    });

    showTextBtn.addEventListener("click", () => {
    if (inputText.style.display === "none") {
        inputText.style.display = "block";
        submitBtn.style.display = "inline-block"; // show submit button again
        showTextBtn.textContent = "Hide Text";
    } else {
        inputText.style.display = "none";
        submitBtn.style.display = "none";
        showTextBtn.textContent = "Show Text";
    }
});

    // Next button
    function nextPage() {
        if (currentPage < totalPages) goToPage(currentPage + 1);
    }

    // Previous button
    function prevPage() {
        if (currentPage > 0) goToPage(currentPage - 1);
    }

    nextBtnTop.addEventListener("click", nextPage);
    nextBtnBottom.addEventListener("click", nextPage);
    prevBtnTop.addEventListener("click", prevPage);
    prevBtnBottom.addEventListener("click", prevPage);

    // Dropdown change
    [pageDropdownTop, pageDropdownBottom].forEach(dropdown => {
        dropdown.addEventListener("change", (e) => {
            goToPage(Number(e.target.value));
        });
    });

    // Show All buttons
    /*showAllBtnTop.addEventListener("click", () => goToPage(0));
    showAllBtnBottom.addEventListener("click", () => goToPage(0));*/

        showAllBtnTop.addEventListener("click", () => {
        currentDifficultyFilter = null;
        document.querySelectorAll('#outputHtml > div').forEach(div => div.style.display = "block");
        document.querySelectorAll("#outputHtml .chapterHeader").forEach(h => h.style.display = "block");
        mainTitle.textContent = "StudyTron";
    });

    showAllBtnBottom.addEventListener("click", () => {
        currentDifficultyFilter = null;
        document.querySelectorAll('#outputHtml > div').forEach(div => div.style.display = "block");
        document.querySelectorAll("#outputHtml .chapterHeader").forEach(h => h.style.display = "block");
        mainTitle.textContent = "StudyTron";
    });


    // Reset filter when showing all
    filterAllBtn.addEventListener("click", () => {
        currentDifficultyFilter = null;
        document.querySelectorAll('[data-group-type]').forEach(div => div.style.display = "block");
        document.querySelectorAll("#outputHtml .chapterHeader").forEach(h => h.style.display = "block");
        mainTitle.textContent = "StudyTron";
    });

function applyGroupFilter(groupNum) {
    document.querySelectorAll('[data-group-type]').forEach(div => {
        div.style.display = div.dataset.groupType === "G" + groupNum ? "block" : "none";
    });

    document.querySelectorAll("#outputHtml .chapterHeader").forEach(h => {
        h.style.display = "none";
    });

    mainTitle.textContent = "Group " + groupNum;
}

for (let i = 1; i <= 20; i++) {
    const btn = groupFilterButtons[i];
    if (!btn) continue;

    btn.addEventListener("click", () => {
        applyGroupFilter(i);
    });
}


    //Difficulty buttons
    // Add difficulty buttons to each div
function addDifficultyButtons() {
    const allGroups = document.querySelectorAll("#outputHtml > div");

    allGroups.forEach((div, divIndex) => {
        if (div.querySelector(".focus-btn-container")) return;

        //div.dataset.difficulty = "none";

        div.dataset.difficulty = div.dataset.difficulty || "none";

        const container = document.createElement("div");
        container.classList.add("focus-btn-container");

        const difficulties = ["EASY", "MED", "HARD"];

        difficulties.forEach(level => {
            const btn = document.createElement("button");
            btn.textContent = level;
            btn.classList.add("focus-btn");
            btn.addEventListener("click", () => {
                container.querySelectorAll("button.focus-btn").forEach(b => b.style.backgroundColor = "");
                div.dataset.difficulty = level.toLowerCase();
                btn.style.backgroundColor = "#3b7ce1";
                updateTextareaDifficulty(divIndex, level[0].toUpperCase());
                if (currentDifficultyFilter) updateDifficultyView();
            });
            container.appendChild(btn);
        });

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "REMOVE";
        removeBtn.classList.add("remove-btn");
        removeBtn.addEventListener("click", () => {
            div.dataset.difficulty = "none";
            container.querySelectorAll("button.focus-btn").forEach(b => b.style.backgroundColor = "");
            updateTextareaDifficulty(divIndex, null); // remove difficulty but preserve original identifier
            if (currentDifficultyFilter) {
                div.style.display = "none";
            } else {
                div.style.display = "block";
            }
        });
        container.appendChild(removeBtn);

        div.appendChild(container);
    });
}

function updateDifficultyView() {
    const allGroups = document.querySelectorAll("#outputHtml > div");

    if (currentDifficultyFilter) {
        allGroups.forEach(div => {
            div.style.display = div.dataset.difficulty === currentDifficultyFilter ? "block" : "none";
        });
    } else {
        // No filter active → show all divs
        allGroups.forEach(div => {
            div.style.display = "block";
        });
    }
}

let currentDifficultyFilter = null;

showEasyBtn.addEventListener("click", () => {
    currentDifficultyFilter = "easy";
    updateDifficultyView();
    mainTitle.textContent = "Easy Questions";
});

showMedBtn.addEventListener("click", () => {
    currentDifficultyFilter = "med";
    updateDifficultyView();
    mainTitle.textContent = "Medium Questions";
});

showHardBtn.addEventListener("click", () => {
    currentDifficultyFilter = "hard";
    updateDifficultyView();
    mainTitle.textContent = "Hard Questions";
});


function updateTextareaDifficulty(divIndex, difficultyLetter) {
    const lines = inputText.value.split("\n");
    let current = -1;

    for (let i = 0; i < lines.length; i++) {
        if (!lines[i].startsWith("=")) continue;

        current++;
        if (current !== divIndex) continue;

        const div = document.querySelectorAll("#outputHtml > div")[divIndex];
        const originalPrefix = div.dataset.originalPrefix; // "=" or "=1" or "=20"
        const content = lines[i]
            .replace(/^=\d*=?D:[EMH]\s*/, "")
            .replace(/^=\d*\s*/, "")
            .replace(/^=\s*/, "")
            .trim();

        if (difficultyLetter) {
            // Apply difficulty
            if (originalPrefix === "=") {
                lines[i] = `=D:${difficultyLetter} ${content}`;
            } else {
                lines[i] = `${originalPrefix}=D:${difficultyLetter} ${content}`;
            }
        } else {
            // REMOVE — restore original prefix exactly
            if (originalPrefix === "=") {
                lines[i] = `=${content}`;
            } else {
                lines[i] = `${originalPrefix} ${content}`;
            }
        }
        break;
    }

    inputText.value = lines.join("\n");
}




});
