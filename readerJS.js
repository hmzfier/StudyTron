document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const submitBtn = document.getElementById("submitBtn");
    const outputHtml = document.getElementById("outputHtml");
    const copyBtn = document.getElementById("copyBtn");
    const clearBtn = document.getElementById("clearBtn");
    const showTextBtn = document.getElementById("blepButton");
    const blepButton2 = document.getElementById("blepButton2");
    const showTextareaBtn = document.getElementById("showTextareaBtn");
    const inputContainer = document.getElementById("inputContainer");

    const prevPageTop = document.getElementById("prevPage");
    const nextPageTop = document.getElementById("nextPage");
    const showAllPageTop = document.getElementById("showAllPage");
    const pageDropdownTop = document.getElementById("pageDropdownTop");

    const prevPageBottom = document.getElementById("prevPageBottom");
    const nextPageBottom = document.getElementById("nextPageBottom");
    const showAllPageBottom = document.getElementById("showAllPageBottom");
    const pageDropdownBottom = document.getElementById("pageDropdownBottom");

    let answersHidden = false;
    let statementsHidden = false;
    let groups = [];
    let currentGroupIndex = -1; // -1 = show all

    // Format text on submit
    submitBtn.addEventListener("click", () => {
        const rawText = inputText.value;
        const lines = rawText.split("\n").filter(line => line.trim() !== "");

        let currentGroupName = "Ungrouped";
        let currentGroupHTML = "";
        groups = [];

        lines.forEach(line => {
            line = line.trim();
            if (line.startsWith("***")) {
                // Save previous group
                if (currentGroupHTML) {
                    groups.push({
                        name: currentGroupName,
                        html: currentGroupHTML
                    });
                    currentGroupHTML = "";
                }
                currentGroupName = line.replace(/^\*{3}/, "").trim();
            } else {
                // Split line into parts by --answer-- and wrap them accordingly
                let formattedLine = "";
                const parts = line.split(/(--.*?--)/g); // split on --answer-- including the dashes

                parts.forEach(part => {
                    if (part.startsWith("--") && part.endsWith("--")) {
                        const answerText = part.slice(2, -2).trim();
                        formattedLine += `<span class="answer" style="position: relative; display: inline-block; line-height:1.4;">
                            ${answerText}
                            <span class="answerCover" style="position: absolute; inset:0; background-color: #484848; border-radius:4px; display:none;"></span>
                        </span> `;
                    } else if (part.trim() !== "") {
                        formattedLine += `<span class="statement">${part.trim()} </span>`;
                    }
                });

                currentGroupHTML += `<div class="sentenceContainer"><p class="sentence">${formattedLine}</p></div>`;
            }
        });

        // Push last group
        if (currentGroupHTML) {
            groups.push({
                name: currentGroupName,
                html: currentGroupHTML
            });
        }

        renderGroups();
        setupPagination();
        answersHidden = false;
        statementsHidden = false;
        showTextBtn.textContent = "HIDE 1";
        blepButton2.textContent = "HIDE 2";

        // Hide textarea + buttons, show "Show Textarea"
        inputContainer.style.display = "none";
        showTextareaBtn.style.display = "inline-block";
    });

    // Render groups based on currentGroupIndex
    function renderGroups() {
        if (currentGroupIndex === -1) {
            // Show all groups
            outputHtml.innerHTML = groups.map(g => `
<div class="groupContainer" data-group="${g.name}">
    <p class="chapterHeader" style="display: block;">${g.name}</p>
    ${g.html}
</div>
`).join("");
        } else {
            // Show only current group with its title
            const g = groups[currentGroupIndex];
            outputHtml.innerHTML = `
<div class="groupContainer" data-group="${g.name}">
    <p class="chapterHeader" style="display: block;">${g.name}</p>
    ${g.html}
</div>`;
        }

        // Apply show/hide state to all answer covers
        const allCovers = outputHtml.querySelectorAll("span.answerCover");
        allCovers.forEach(cover => cover.style.display = answersHidden ? "block" : "none");

        // Apply show/hide state to statements
        toggleStatementCovers(statementsHidden);
    }

    // Setup pagination dropdowns and buttons
    function setupPagination() {
        [pageDropdownTop, pageDropdownBottom].forEach(drop => {
            drop.innerHTML = "";
            const optionAll = document.createElement("option");
            optionAll.value = -1;
            optionAll.textContent = "ALL";
            drop.appendChild(optionAll);

            groups.forEach((g, index) => {
                const opt = document.createElement("option");
                opt.value = index;
                opt.textContent = g.name;
                drop.appendChild(opt);
            });
            drop.value = -1;
        });
        currentGroupIndex = -1;
    }

    // Pagination controls
    function goToGroup(index) {
        if (index < -1) index = groups.length - 1;
        if (index > groups.length - 1) index = -1;
        currentGroupIndex = index;
        renderGroups();
        pageDropdownTop.value = index;
        pageDropdownBottom.value = index;
    }

    [prevPageTop, prevPageBottom].forEach(btn => {
        btn.addEventListener("click", () => goToGroup(currentGroupIndex - 1));
    });

    [nextPageTop, nextPageBottom].forEach(btn => {
        btn.addEventListener("click", () => goToGroup(currentGroupIndex + 1));
    });

    [showAllPageTop, showAllPageBottom].forEach(btn => {
        btn.addEventListener("click", () => goToGroup(-1));
    });

    [pageDropdownTop, pageDropdownBottom].forEach(drop => {
        drop.addEventListener("change", e => goToGroup(parseInt(e.target.value)));
    });

    // Copy output
    copyBtn.addEventListener("click", () => {
        const temp = document.createElement("textarea");
        temp.value = outputHtml.innerHTML;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
    });

    // Clear input + output
    clearBtn.addEventListener("click", () => {
        inputText.value = "";
        outputHtml.innerHTML = "";
        answersHidden = false;
        statementsHidden = false;
        currentGroupIndex = -1;
        showTextBtn.textContent = "SHOW";
        blepButton2.textContent = "HIDE 2";
        setupPagination();
    });

    // Toggle show/hide answers (orange cover)
    showTextBtn.addEventListener("click", () => {
        const allCovers = outputHtml.querySelectorAll("span.answerCover");
        if (!answersHidden) {
            allCovers.forEach(cover => cover.style.display = "block");
            showTextBtn.textContent = "SHOW 1";
        } else {
            allCovers.forEach(cover => cover.style.display = "none");
            showTextBtn.textContent = "HIDE 1";
        }
        answersHidden = !answersHidden;
    });

    // Toggle show/hide statements
    function toggleStatementCovers(hide) {
        const allStatements = outputHtml.querySelectorAll("span.statement");
        allStatements.forEach(span => {
            span.style.backgroundColor = hide ? "#234178" : "transparent";
            span.style.color = hide ? "transparent" : "inherit";
        });
    }

    blepButton2.addEventListener("click", () => {
        statementsHidden = !statementsHidden;
        toggleStatementCovers(statementsHidden);
        blepButton2.textContent = statementsHidden ? "SHOW 2" : "HIDE 2";
    });

    // Toggle textarea visibility
    showTextareaBtn.addEventListener("click", () => {
        inputContainer.style.display = "block";
        showTextareaBtn.style.display = "none";
    });

    // Menu toggle
    const menuButton = document.getElementById("menuButton");
    const sideMenu = document.getElementById("sideMenu");

    menuButton.addEventListener("click", () => {
        sideMenu.classList.toggle("active");
    });

    // Navigation buttons
    document.getElementById("backToTop").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.getElementById("toMiddle").addEventListener("click", () => {
        window.scrollTo({ top: document.body.scrollHeight / 2, behavior: "smooth" });
    });

    document.getElementById("toBottom").addEventListener("click", () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });
});