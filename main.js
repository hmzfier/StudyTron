document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const submitBtn = document.getElementById("submitBtn");
    const outputHtml = document.getElementById("outputHtml");
    const mainTitle = document.getElementById("mainTitle");

    //show text area button
    const showTextBtn = document.getElementById("showTextBtn");

    // Filters
    const filterG1Btn = document.getElementById("filterG1");
    const filterG2Btn = document.getElementById("filterG2");
    const filterAllBtn = document.getElementById("filterAll");

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
                let questionText = trimmedLine.substring(1).trim();

                if (trimmedLine.startsWith("=1")) {
                    groupType = "G1";
                    questionText = trimmedLine.substring(3).trim();
                } else if (trimmedLine.startsWith("=2")) {
                    groupType = "G2";
                    questionText = trimmedLine.substring(3).trim();
                }

                htmlOutput += `<div data-group-type="${groupType}">\n`;
                groupOpen = true;
                htmlOutput += `<hr class="divider"><p class="question">${questionText}</p>\n`;
            } else if (trimmedLine.startsWith("+")) {
                htmlOutput += `<p class="highlight">${trimmedLine.substring(1).trim()}</p>\n`;
            } else if (trimmedLine.startsWith("***")) {
                htmlOutput += `<p class="chapterHeader">${trimmedLine.substring(3).trim()}</p>\n`;
            } else if (trimmedLine.startsWith("-")) {
                htmlOutput += `<p class="subTopicHeader">${trimmedLine.substring(1).trim()}</p>\n`;
            } else if (trimmedLine.startsWith(">")) {
                htmlOutput += `<p class="answer"><span class="arrow">→</span> ${trimmedLine.substring(1).trim()}</p>\n`;
            } else {
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
    showAllBtnTop.addEventListener("click", () => goToPage(0));
    showAllBtnBottom.addEventListener("click", () => goToPage(0));

    // Filters (G1/G2)
    filterG1Btn.addEventListener("click", () => {
        document.querySelectorAll('[data-group-type]').forEach(div => {
            div.style.display = div.dataset.groupType === "G1" ? "block" : "none";
        });
        document.querySelectorAll("#outputHtml .chapterHeader").forEach(h => h.style.display = "none");
        mainTitle.textContent = "Group 1";
    });

    filterG2Btn.addEventListener("click", () => {
        document.querySelectorAll('[data-group-type]').forEach(div => {
            div.style.display = div.dataset.groupType === "G2" ? "block" : "none";
        });
        document.querySelectorAll("#outputHtml .chapterHeader").forEach(h => h.style.display = "none");
        mainTitle.textContent = "Group 2";
    });

    filterAllBtn.addEventListener("click", () => {
        document.querySelectorAll('[data-group-type]').forEach(div => div.style.display = "block");
        document.querySelectorAll("#outputHtml .chapterHeader").forEach(h => h.style.display = "block");
        mainTitle.textContent = "StudyTron";
    });

});
