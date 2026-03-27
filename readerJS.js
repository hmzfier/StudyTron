document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const submitBtn = document.getElementById("submitBtn");
    const outputHtml = document.getElementById("outputHtml");
    const copyBtn = document.getElementById("copyBtn");
    const clearBtn = document.getElementById("clearBtn");
    const showTextBtn = document.getElementById("blepButton");

    let answersHidden = false;

    // Format text on submit
    submitBtn.addEventListener("click", () => {
        const rawText = inputText.value;

        // Split into lines and ignore empty lines
        const lines = rawText.split("\n").filter(line => line.trim() !== "");

        let formattedHTML = "";

        lines.forEach(line => {
            line = line.trim();

            // Check for title line starting with ***
            if (line.startsWith("***")) {
                const titleText = line.replace(/^\*{3}/, "").trim();
                formattedHTML += `<p class="chapterHeader" style="display: block;">${titleText}</p>\n`;
            } else {
                // Replace --text-- with <span class="answer">
                const formattedLine = line.replace(/--(.*?)--/g, (match, p1) => {
                    return `<span class="answer">${p1}</span>`;
                });

                formattedHTML += `
<div class="sentenceContainer">
    <p class="sentence">${formattedLine}</p>
</div>
`;
            }
        });

        outputHtml.innerHTML = formattedHTML;

        // Reset show/hide state
        answersHidden = false;
        showTextBtn.textContent = "HIDE";
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
        showTextBtn.textContent = "SHOW";
    });

    // Toggle show/hide answers
    showTextBtn.addEventListener("click", () => {
        const allAnswers = outputHtml.querySelectorAll("span.answer");
        if (!answersHidden) {
            allAnswers.forEach(span => span.style.visibility = "hidden");
            showTextBtn.textContent = "SHOW";
        } else {
            allAnswers.forEach(span => span.style.visibility = "visible");
            showTextBtn.textContent = "HIDE";
        }
        answersHidden = !answersHidden;
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