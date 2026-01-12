//V1 - works
document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const submitBtn = document.getElementById("submitBtn");
    const outputHtml = document.getElementById("outputHtml");
    const filterG1Btn = document.getElementById("filterG1");
    const filterG2Btn = document.getElementById("filterG2");
    const filterAllBtn = document.getElementById("filterAll");
    const mainTitle = document.getElementById("mainTitle");

    const page1Btn = document.getElementById("page1");
    const page2Btn = document.getElementById("page2");
    const page3Btn = document.getElementById("page3");
    const page4Btn = document.getElementById("page4");
    const page5Btn = document.getElementById("page5");
    const page6Btn = document.getElementById("page6");
    const page7Btn = document.getElementById("page7");
    const page8Btn = document.getElementById("page8");
    const page9Btn = document.getElementById("page9");
    const page10Btn = document.getElementById("page10");
    const page11Btn = document.getElementById("page11");
    const page12Btn = document.getElementById("page12");
    const page13Btn = document.getElementById("page13");
    const page14Btn = document.getElementById("page14");
    const page15Btn = document.getElementById("page15");
    const page16Btn = document.getElementById("page16");
    const page17Btn = document.getElementById("page17");
    const page18Btn = document.getElementById("page18");
    const page19Btn = document.getElementById("page19");
    const page20Btn = document.getElementById("page20");
    const page21Btn = document.getElementById("page21");
    const page22Btn = document.getElementById("page22");
    const page23Btn = document.getElementById("page23");
    const page24Btn = document.getElementById("page24");
    const page25Btn = document.getElementById("page25");
    const pageAllBtn = document.getElementById("pageAll");

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
        else if (trimmedLine.startsWith(">")) {
            htmlOutput += `<p class="answer"><span class="arrow">→</span> ${trimmedLine.substring(1).trim()}</p>\n`;
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

    // Hide chapter headers during pagination
    allChapters.forEach(h => h.style.display = "none");
});

filterG2Btn.addEventListener("click", () => {
    document.querySelectorAll('[data-group-type]').forEach(div => {
        div.style.display = div.dataset.groupType === "G2" ? "block" : "none";
    });
    mainTitle.textContent = "Group 2"; // Update H1 title

    // Hide chapter headers during pagination
    allChapters.forEach(h => h.style.display = "none");
});

/*filterAllBtn.addEventListener("click", () => {
    document.querySelectorAll('[data-group-type]').forEach(div => {
        div.style.display = "block";
    });
    mainTitle.textContent = "StudyTron"; // Reset H1 title
});*/



filterAllBtn.addEventListener("click", () => {
    document.querySelectorAll('[data-group-type]').forEach(div => {
        div.style.display = "block";
    });

    // Make chapter headers visible again
    document.querySelectorAll("#outputHtml .chapterHeader").forEach(h => {
        h.style.display = "block";
    });

    mainTitle.textContent = "StudyTron"; // Reset H1 title
});

pageAllBtn.addEventListener("click", () => {
    filterAllBtn.click(); // triggers the same "Show All" functionality

    // Also remove active highlight from page buttons
   [page1Btn, page2Btn, page3Btn, page4Btn, page5Btn, page6Btn, page7Btn, page8Btn, page9Btn, page10Btn, page11Btn, page12Btn, page13Btn, page14Btn, page15Btn, page16Btn, page17Btn, page18Btn, page19Btn, page20Btn, page21Btn, page22Btn, page23Btn, page24Btn, page25Btn].forEach(b => b.classList.remove("active"));
    pageAllBtn.classList.add("active"); // optional: highlight Show All button
});


//pagination

/*function showPage(start, end) {
        const allGroups = document.querySelectorAll("#outputHtml > div");

        allGroups.forEach((div, index) => {
            if (index >= start && index <= end) {
                div.style.display = "block";
            } else {
                div.style.display = "none";
            }
        });
    }*/

/*function showPage(start, end) {
    const allGroups = document.querySelectorAll("#outputHtml > div");
    const allChapters = document.querySelectorAll("#outputHtml .chapterHeader");

    // Remove ALL chapter headers globally
    allChapters.forEach(h => h.remove());

    allGroups.forEach((div, index) => {
        if (index >= start && index <= end) {
            div.style.display = "block";
        } else {
            div.style.display = "none";
        }
    });
}*/

function showPage(start, end) {
    const allGroups = document.querySelectorAll("#outputHtml > div");
    const allChapters = document.querySelectorAll("#outputHtml .chapterHeader");

    // Hide chapter headers during pagination
    allChapters.forEach(h => h.style.display = "none");

    allGroups.forEach((div, index) => {
        if (index >= start && index <= end) {
            div.style.display = "block";
        } else {
            div.style.display = "none";
        }
    });
}


function setActivePage(btn) {
    [page1Btn, page2Btn, page3Btn, page4Btn, page5Btn, page6Btn, page7Btn, page8Btn, page9Btn, page10Btn, page11Btn, page12Btn, page13Btn, page14Btn, page15Btn, page16Btn, page17Btn, page18Btn, page19Btn, page20Btn, page21Btn, page22Btn, page23Btn, page24Btn, page25Btn].forEach(b => {
        b.classList.remove("active");
    });
    btn.classList.add("active");
}

page1Btn.addEventListener("click", () => {
    showPage(0, 4);
    setActivePage(page1Btn);
});

page2Btn.addEventListener("click", () => {
    showPage(5, 9);
    setActivePage(page2Btn);
});

page3Btn.addEventListener("click", () => {
    showPage(10, 14);
    setActivePage(page3Btn);
});
page4Btn.addEventListener("click", () => {
    showPage(15, 19);
    setActivePage(page4Btn);
});
page5Btn.addEventListener("click", () => {
    showPage(20, 24);
    setActivePage(page5Btn);
});
page6Btn.addEventListener("click", () => {
    showPage(25, 29);
    setActivePage(page6Btn);
});
page7Btn.addEventListener("click", () => {
    showPage(30, 34);
    setActivePage(page7Btn);
});
page8Btn.addEventListener("click", () => {
    showPage(35, 39);
    setActivePage(page8Btn);
});
page9Btn.addEventListener("click", () => {
    showPage(40, 44);
    setActivePage(page9Btn);
});
page10Btn.addEventListener("click", () => {
    showPage(45, 49);
    setActivePage(page10Btn);
});
page11Btn.addEventListener("click", () => {
    showPage(50, 54);
    setActivePage(page11Btn);
});
page12Btn.addEventListener("click", () => {
    showPage(55, 59);
    setActivePage(page12Btn);
});
page13Btn.addEventListener("click", () => {
    showPage(60, 64);
    setActivePage(page13Btn);
});
page14Btn.addEventListener("click", () => {
    showPage(65, 69);
    setActivePage(page14Btn);
});
page15Btn.addEventListener("click", () => {
    showPage(70, 74);
    setActivePage(page15Btn);
});
page16Btn.addEventListener("click", () => {
    showPage(75, 79);
    setActivePage(page16Btn);
});
page17Btn.addEventListener("click", () => {
    showPage(80, 84);
    setActivePage(page17Btn);
});
page18Btn.addEventListener("click", () => {
    showPage(85, 89);
    setActivePage(page18Btn);
});
page19Btn.addEventListener("click", () => {
    showPage(90, 94);
    setActivePage(page19Btn);
});
page20Btn.addEventListener("click", () => {
    showPage(95, 99);
    setActivePage(page20Btn);
});
page21Btn.addEventListener("click", () => {
    showPage(100, 104);
    setActivePage(page21Btn);
});
page22Btn.addEventListener("click", () => {
    showPage(105, 109);
    setActivePage(page22Btn);
});
page23Btn.addEventListener("click", () => {
    showPage(110, 114);
    setActivePage(page23Btn);
});
page24Btn.addEventListener("click", () => {
    showPage(115, 119);
    setActivePage(page24Btn);
});
page25Btn.addEventListener("click", () => {
    showPage(120, 124);
    setActivePage(page25Btn);
});



});



