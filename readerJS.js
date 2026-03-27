document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const submitBtn = document.getElementById("submitBtn");
    const outputHtml = document.getElementById("outputHtml");
    const copyBtn = document.getElementById("copyBtn");
    const clearBtn = document.getElementById("clearBtn");

    // Format text on submit
    submitBtn.addEventListener("click", () => {
        const rawText = inputText.value;

        // Split into sentences/lines (ignore empty lines)
        const lines = rawText.split("\n").filter(line => line.trim() !== "");

        let formattedHTML = "";

        lines.forEach(line => {
            // Replace --text-- with span
            const formattedLine = line.replace(/--(.*?)--/g, (match, p1) => {
                return `<span class="answer">${p1}</span>`;
            });

            formattedHTML += `
<div class="sentenceContainer">
    <p class="sentence">${formattedLine}</p>
</div>
`;
        });

        outputHtml.innerHTML = formattedHTML;
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