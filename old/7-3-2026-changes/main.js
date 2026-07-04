document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.getElementById("inputText");
  const hardText = document.getElementById("hardText");
  const focusText = document.getElementById("focusText");
  const submitBtn = document.getElementById("submitBtn");
  const outputHtml = document.getElementById("outputHtml");
  const mainTitle = document.getElementById("mainTitle");
  const copyBtn = document.getElementById("copyBtn");
  const clearBtn = document.getElementById("clearBtn");
  const showTextBtn = document.getElementById("showTextBtn");

  const hardCopyBtn = document.getElementById("hardCopyBtn");
  const hardClearBtn = document.getElementById("hardClearBtn");
  const focusCopyBtn = document.getElementById("focusCopyBtn");
  const focusClearBtn = document.getElementById("focusClearBtn");

  const menuButton = document.getElementById('menuButton');
  const sideMenu = document.getElementById('sideMenu');
  const blepButton = document.getElementById('blepButton');
  let isRed2 = false;

  const backToTopBtn = document.getElementById('backToTop');
  const toMiddle = document.getElementById('toMiddle');
  const toBottom = document.getElementById('toBottom');

  const prevBtnTop = document.getElementById("prevPage");
  const nextBtnTop = document.getElementById("nextPage");
  const pageDropdownTop = document.getElementById("pageDropdownTop");
  const showAllBtnTop = document.getElementById("showAllPage");

  const prevBtnBottom = document.getElementById("prevPageBottom");
  const nextBtnBottom = document.getElementById("nextPageBottom");
  const pageDropdownBottom = document.getElementById("pageDropdownBottom");
  const showAllBtnBottom = document.getElementById("showAllPageBottom");

  let groups = [];
  let currentGroupIndex = -1; // -1 = show all
  let originalLines = [];

  // ========================== BUTTON LISTENERS ==========================
  clearBtn.addEventListener("click", () => { inputText.value = ""; });

  menuButton.addEventListener('click', () => { sideMenu.classList.toggle('active'); });

  blepButton.addEventListener('click', () => {
    document.querySelectorAll('.answer, .answer2, .highlight, .highlight2, .arrow').forEach(el => {
      if(el.classList.contains("answer") || el.classList.contains("answer2")) el.style.color = isRed2 ? '#ffffff' : '#2d2d2d';
      else if(el.classList.contains("highlight")) el.style.color = isRed2 ? '#fd3ac3' : '#2d2d2d';
      else if(el.classList.contains("highlight2")) el.style.color = isRed2 ? '#ff4039' : '#2d2d2d';
      else if(el.classList.contains("arrow")) el.style.color = isRed2 ? '#77ff29' : '#2d2d2d';
    });
    isRed2 = !isRed2;
  });

  backToTopBtn.addEventListener('click', () => { window.scrollTo({top:0, behavior:'smooth'}); });
  toMiddle.addEventListener('click', () => { window.scrollTo({ top: document.body.scrollHeight / 2, behavior:'smooth'}); });
  toBottom.addEventListener('click', () => { window.scrollTo({ top: document.body.scrollHeight, behavior:'smooth'}); });

  copyBtn.addEventListener("click", () => { navigator.clipboard.writeText(inputText.value).catch(err => console.error(err)); });
  hardCopyBtn.addEventListener("click", () => { navigator.clipboard.writeText(hardText.value).catch(err => console.error(err)); });
  hardClearBtn.addEventListener("click", () => { hardText.value = ""; });
  focusCopyBtn.addEventListener("click", () => { navigator.clipboard.writeText(focusText.value).catch(err => console.error(err)); });
  focusClearBtn.addEventListener("click", () => { focusText.value = ""; });

  prevBtnTop.addEventListener("click", () => goToGroup(currentGroupIndex - 1));
  prevBtnBottom.addEventListener("click", () => goToGroup(currentGroupIndex - 1));
  nextBtnTop.addEventListener("click", () => goToGroup(currentGroupIndex + 1));
  nextBtnBottom.addEventListener("click", () => goToGroup(currentGroupIndex + 1));
  [pageDropdownTop, pageDropdownBottom].forEach(dropdown => dropdown.addEventListener("change", e => goToGroup(parseInt(e.target.value))));
  [showAllBtnTop, showAllBtnBottom].forEach(btn => btn.addEventListener("click", () => goToGroup(-1)));

  // ========================== FORMAT TEXT ==========================
  function formatTextToHTML(text) {
  const lines = text.split("\n");
  originalLines = lines;
  groups = [];

  let currentGroupName = "";
  let currentGroupHTML = "";
  let questionOpen = false;

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    const sentenceOrder = index + 1;
    if (!trimmedLine) return;

    // New group
    if(trimmedLine.startsWith("***")) {
      // Push previous group if exists
      if(currentGroupName || currentGroupHTML) {
        if(questionOpen) {
          currentGroupHTML += "</div>\n"; // close last question
          questionOpen = false;
        }
        groups.push({ name: currentGroupName || "Ungrouped", html: currentGroupHTML });
      }
      currentGroupName = trimmedLine.substring(3).trim();
      currentGroupHTML = "";
      questionOpen = false;
    }
    // Question
    else if(trimmedLine.startsWith("=")) {
      if(questionOpen) currentGroupHTML += "</div>\n"; // close previous question
      questionOpen = true;
      currentGroupHTML += `<div class="questionContainer"><p class="question" data-sentence-order="${sentenceOrder}">${trimmedLine.substring(1).trim()}</p>\n`;
    }
    // Choices
    else if(trimmedLine.startsWith("@")) {
      currentGroupHTML += `<p class="questionChoice" data-sentence-order="${sentenceOrder}">${trimmedLine.substring(1).trim()}</p>\n`;
    }
    // Highlighting
    else if(trimmedLine.startsWith("+")) {
      currentGroupHTML += `<p class="highlight" data-sentence-order="${sentenceOrder}">${trimmedLine.substring(1).trim()}</p>\n`;
    }
    else if(trimmedLine.startsWith("#")) {
      currentGroupHTML += `<p class="highlight2" data-sentence-order="${sentenceOrder}">${trimmedLine.substring(1).trim()}</p>\n`;
    }
    // Answers
    else {
      currentGroupHTML += `<p class="answer" data-sentence-order="${sentenceOrder}">${trimmedLine}</p>\n`;
    }
  });

  // Close last questionContainer
  if(questionOpen) currentGroupHTML += "</div>\n";

  // Push the last group
  if(currentGroupName || currentGroupHTML) {
    groups.push({ name: currentGroupName || "Ungrouped", html: currentGroupHTML });
  }

  // Build final HTML
  return groups.map(g => `<div class="groupContainer"><p class="chapterHeader">${g.name}</p>${g.html}</div>`).join("\n");
}

  // ========================== SUBMIT ==========================
  submitBtn.addEventListener("click", () => {
    outputHtml.innerHTML = formatTextToHTML(inputText.value);
    addHardFocusButtons();
    currentGroupIndex = -1;
    setupPagination();
    goToGroup(-1);

    [inputText, hardText, focusText, submitBtn, copyBtn, clearBtn, hardCopyBtn, hardClearBtn, focusCopyBtn, focusClearBtn].forEach(el => el.style.display = "none");
    showTextBtn.style.display = "inline-block";
  });

  showTextBtn.addEventListener("click", () => {
    const isHidden = inputText.style.display === "none";
    [inputText, hardText, focusText, submitBtn, copyBtn, clearBtn, hardCopyBtn, hardClearBtn, focusCopyBtn, focusClearBtn].forEach(el => el.style.display = isHidden ? "inline-block" : "none");
    showTextBtn.textContent = isHidden ? "Hide Text" : "Show Text";
  });

  // ========================== HARD/FOCUS BUTTONS ==========================
  function addHardFocusButtons() {
    document.querySelectorAll(".questionContainer").forEach(container => {
      if(container.querySelector(".focus-btn-container")) return;

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("focus-btn-container");

      const hardBtn = document.createElement("button");
      hardBtn.textContent = "Hard";
      hardBtn.classList.add("focus-btn");
      hardBtn.addEventListener("click", () => copyQuestionLines(container, hardText));
      btnContainer.appendChild(hardBtn);

      const focusBtn = document.createElement("button");
      focusBtn.textContent = "Focus";
      focusBtn.classList.add("focus-btn");
      focusBtn.addEventListener("click", () => copyQuestionLines(container, focusText));
      btnContainer.appendChild(focusBtn);

      container.appendChild(btnContainer);
    });
  }

  function copyQuestionLines(container, target) {
    const orders = [];
    container.querySelectorAll(".question, .questionChoice, .answer, .highlight, .highlight2").forEach(el => {
      const order = parseInt(el.dataset.sentenceOrder);
      if(order) orders.push(order);
    });
    if(orders.length === 0) return;

    const originalLinesCopy = originalLines.slice(Math.min(...orders)-1, Math.max(...orders));
    if(target.value && !target.value.endsWith("\n")) target.value += "\n";
    target.value += originalLinesCopy.join("\n") + "\n\n";
  }

  // ========================== PAGINATION ==========================
  function setupPagination() {
    [pageDropdownTop, pageDropdownBottom].forEach(dropdown => {
      dropdown.innerHTML = "";
      const allOption = document.createElement("option");
      allOption.value = -1;
      allOption.textContent = "ALL";
      dropdown.appendChild(allOption);

      groups.forEach((g, i) => {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = g.name;
        dropdown.appendChild(opt);
      });

      dropdown.value = -1;
    });
  }

  function goToGroup(index) {
    const allGroups = document.querySelectorAll(".groupContainer");
    if(index < -1) index = allGroups.length - 1;
    if(index > allGroups.length - 1) index = -1;

    currentGroupIndex = index;

    if(currentGroupIndex === -1) {
      allGroups.forEach(div => div.style.display = "block");
      mainTitle.textContent = "Show All";
    } else {
      allGroups.forEach((div, i) => div.style.display = (i === currentGroupIndex) ? "block" : "none");
      mainTitle.textContent = groups[currentGroupIndex].name;
    }

    pageDropdownTop.value = currentGroupIndex;
    pageDropdownBottom.value = currentGroupIndex;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});