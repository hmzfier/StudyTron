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

    const toggleHFBtn = document.getElementById("toggleHFBtn");

    const hardText = document.getElementById("hardText");
    const copyHardBtn = document.getElementById("copyHardBtn");
    const clearHardBtn = document.getElementById("clearHardBtn");

    const focusText = document.getElementById("focusText");
    const copyFocusBtn = document.getElementById("copyFocusBtn");
    const clearFocusBtn = document.getElementById("clearFocusBtn");

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
    let hfVisible = false;
    let groups = [];
    let currentGroupIndex = -1;
    let originalLines = [];

    // SUBMIT
    submitBtn.addEventListener("click", () => {
        const rawText = inputText.value;
        const lines = rawText.split("\n").filter(line => line.trim() !== "");
        originalLines = lines;

        let currentGroupName = "Ungrouped";
        let currentGroupHTML = "";
        groups = [];

        lines.forEach((line, index) => {
            line = line.trim();

            if (line.startsWith("***")) {
                if (currentGroupHTML) {
                    groups.push({ name: currentGroupName, html: currentGroupHTML });
                    currentGroupHTML = "";
                }
                currentGroupName = line.replace(/^\*{3}/, "").trim();
            } else {
                let formattedLine = "";
                const parts = line.split(/(--.*?--)/g);

                parts.forEach((part, i) => {
                    const nextPart = parts[i + 1] ? parts[i + 1].trim() : "";

                    if (part.startsWith("--") && part.endsWith("--")) {
                        const answerText = part.slice(2, -2).trim();

                        formattedLine += `<span class="answer" style="position: relative; display: inline-block;">
                            ${answerText}
                            <span class="answerCover" style="position:absolute; inset:0; background:#484848; display:none;"></span>
                        </span>`;

                        // ONLY add space if next part is NOT punctuation
                        if (!/^[.,!?]/.test(nextPart)) {
                            formattedLine += " ";
                        }

                    } else if (part.trim() !== "") {
                        const cleanText = part.trim();

                        // If this part starts with punctuation, remove previous space
                        if (/^[.,!?]/.test(cleanText)) {
                            formattedLine = formattedLine.trimEnd();
                            formattedLine += `<span class="statement">${cleanText}</span> `;
                        } else {
                            formattedLine += `<span class="statement">${cleanText} </span>`;
                        }
                    }
                });

                currentGroupHTML += `
<div class="sentenceContainer" data-sentence-order="${index + 1}">
    <p class="sentence">
        ${formattedLine}
        <button class="hardBtn" style="display:none;">Hard</button>
        <button class="focusBtn" style="display:none;">Focus</button>
    </p>
</div>`;
            }
        });

        if (currentGroupHTML) {
            groups.push({ name: currentGroupName, html: currentGroupHTML });
        }

        renderGroups();
        setupPagination();

        answersHidden = false;
        statementsHidden = false;
        hfVisible = false;

        showTextBtn.textContent = "HIDE 1";
        blepButton2.textContent = "HIDE 2";
        toggleHFBtn.textContent = "SHOW HF";

        inputContainer.style.display = "none";
        showTextareaBtn.style.display = "inline-block";
    });

    // RENDER
    function renderGroups() {
        if (currentGroupIndex === -1) {
            outputHtml.innerHTML = groups.map(g => `
                <div class="groupContainer">
                    <p class="chapterHeader">${g.name}</p>
                    ${g.html}
                </div>`).join("");
                        } else {
                            const g = groups[currentGroupIndex];
                            outputHtml.innerHTML = `
                <div class="groupContainer">
                    <p class="chapterHeader">${g.name}</p>
                    ${g.html}
                </div>`;
        }

        attachSentenceButtons();
        toggleHFButtons(hfVisible);

        const covers = outputHtml.querySelectorAll(".answerCover");
        covers.forEach(c => c.style.display = answersHidden ? "block" : "none");

        toggleStatementCovers(statementsHidden);
    }

    // Attach Hard / Focus button logic
    function attachSentenceButtons() {
        const hardBtns = outputHtml.querySelectorAll(".hardBtn");
        const focusBtns = outputHtml.querySelectorAll(".focusBtn");

        hardBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const container = e.target.closest(".sentenceContainer");
                const index = parseInt(container.dataset.sentenceOrder) - 1;
                const line = originalLines[index] || "";
                hardText.value += (hardText.value ? "\n" : "") + line + "\n";
            });
        });

        focusBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const container = e.target.closest(".sentenceContainer");
                const index = parseInt(container.dataset.sentenceOrder) - 1;
                const line = originalLines[index] || "";
                focusText.value += (focusText.value ? "\n" : "") + line + "\n";
            });
        });
    }

    // Show/Hide Hard & Focus buttons
    function toggleHFButtons(show) {
        const hardBtns = outputHtml.querySelectorAll(".hardBtn");
        const focusBtns = outputHtml.querySelectorAll(".focusBtn");

        hardBtns.forEach(btn => btn.style.display = show ? "inline-block" : "none");
        focusBtns.forEach(btn => btn.style.display = show ? "inline-block" : "none");
    }

    // Toggle HF button
    toggleHFBtn.addEventListener("click", () => {
        hfVisible = !hfVisible;
        toggleHFButtons(hfVisible);
        toggleHFBtn.textContent = hfVisible ? "HIDE HF" : "SHOW HF";
    });

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

    function goToGroup(index) {
        if (index < -1) index = groups.length - 1;
        if (index > groups.length - 1) index = -1;

        currentGroupIndex = index;
        renderGroups();

        pageDropdownTop.value = index;
        pageDropdownBottom.value = index;
    }

    [prevPageTop, prevPageBottom].forEach(btn =>
        btn.addEventListener("click", () => goToGroup(currentGroupIndex - 1))
    );

    [nextPageTop, nextPageBottom].forEach(btn =>
        btn.addEventListener("click", () => goToGroup(currentGroupIndex + 1))
    );

    [showAllPageTop, showAllPageBottom].forEach(btn =>
        btn.addEventListener("click", () => goToGroup(-1))
    );

    [pageDropdownTop, pageDropdownBottom].forEach(drop =>
        drop.addEventListener("change", e => goToGroup(parseInt(e.target.value)))
    );

    // Copy / Clear
    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(outputHtml.innerHTML);
    });

    clearBtn.addEventListener("click", () => {
        inputText.value = "";
        outputHtml.innerHTML = "";
        setupPagination();
    });

    copyHardBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(hardText.value);
    });

    clearHardBtn.addEventListener("click", () => {
        hardText.value = "";
    });

    copyFocusBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(focusText.value);
    });

    clearFocusBtn.addEventListener("click", () => {
        focusText.value = "";
    });

    // Toggle answers
    showTextBtn.addEventListener("click", () => {
        const covers = outputHtml.querySelectorAll(".answerCover");

        if (!answersHidden) {
            covers.forEach(c => c.style.display = "block");
            showTextBtn.textContent = "SHOW 1";
        } else {
            covers.forEach(c => c.style.display = "none");
            showTextBtn.textContent = "HIDE 1";
        }

        answersHidden = !answersHidden;
    });

    function toggleStatementCovers(hide) {
        const allStatements = outputHtml.querySelectorAll(".statement");
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

    // Show textarea again
    showTextareaBtn.addEventListener("click", () => {
        inputContainer.style.display = "block";
        showTextareaBtn.style.display = "none";
    });

    // Menu
    const menuButton = document.getElementById("menuButton");
    const sideMenu = document.getElementById("sideMenu");

    menuButton.addEventListener("click", () => {
        sideMenu.classList.toggle("active");
    });

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