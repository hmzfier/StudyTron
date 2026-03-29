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

  const DIVS_PER_PAGE = 8;
  let currentPage = 0;
  let totalPages = 0;
  let currentDifficultyFilter = null;

  // ========================== BUTTON LISTENERS ==========================
  clearBtn.addEventListener("click", () => { inputText.value = ""; });

  menuButton.addEventListener('click', () => { sideMenu.classList.toggle('active'); });

  blepButton.addEventListener('click', () => {
    document.querySelectorAll('.answer, .answer2, .highlight, .highlight2, .arrow').forEach(el => {
      if (el.classList.contains("answer")) el.style.color = isRed2 ? '#ffffff' : '#2d2d2d';
      else if (el.classList.contains("answer2")) el.style.color = isRed2 ? '#ffffff' : '#2d2d2d';
      else if (el.classList.contains("highlight")) el.style.color = isRed2 ? '#fd3ac3' : '#2d2d2d';
      else if (el.classList.contains("highlight2")) el.style.color = isRed2 ? '#ff4039' : '#2d2d2d';
      else if (el.classList.contains("arrow")) el.style.color = isRed2 ? '#77ff29' : '#2d2d2d';
    });
    isRed2 = !isRed2;
  });

  backToTopBtn.addEventListener('click', () => { window.scrollTo({top:0, behavior:'smooth'}); });
  toMiddle.addEventListener('click', () => { window.scrollTo({ top: document.body.scrollHeight / 2, behavior:'smooth'}); });
  toBottom.addEventListener('click', () => { window.scrollTo({ top: document.body.scrollHeight, behavior:'smooth'}); });


  copyBtn.addEventListener("click", () => { navigator.clipboard.writeText(inputText.value).catch(err => console.error(err)); });

  // Hard/Focus textarea copy and clear buttons
  hardCopyBtn.addEventListener("click", () => { navigator.clipboard.writeText(hardText.value).catch(err => console.error(err)); });
  hardClearBtn.addEventListener("click", () => { hardText.value = ""; });
  focusCopyBtn.addEventListener("click", () => { navigator.clipboard.writeText(focusText.value).catch(err => console.error(err)); });
  focusClearBtn.addEventListener("click", () => { focusText.value = ""; });

  prevBtnTop.addEventListener("click", prevPage);
  prevBtnBottom.addEventListener("click", prevPage);
  nextBtnTop.addEventListener("click", nextPage);
  nextBtnBottom.addEventListener("click", nextPage);

  [pageDropdownTop, pageDropdownBottom].forEach(dropdown => {
    dropdown.addEventListener("change", (e) => { goToPage(Number(e.target.value)); });
  });

  showAllBtnTop.addEventListener("click", () => { showAllPages(); });
  showAllBtnBottom.addEventListener("click", () => { showAllPages(); });

  // ========================== FORMAT TEXT ==========================
  function formatTextToHTML(text) {
    const lines = text.split("\n");
    let htmlOutput = "";
    let groupOpen = false;

    lines.forEach((line, index) => {
      const sentenceOrder = index + 1;
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      if (trimmedLine.startsWith("=")) {
        if(groupOpen) htmlOutput += "</div>\n";

        let groupType = "G0";
        let difficulty = "none";
        const afterEqual = trimmedLine.substring(1).trim();
        const prefixMatch = trimmedLine.match(/^=(\d*)/);
        const originalPrefix = prefixMatch[1] ? "=" + prefixMatch[1] : "=";

        groupOpen = true;

        htmlOutput += `<div data-group-type="${groupType}" data-difficulty="${difficulty}" data-original-prefix="${originalPrefix}">\n`;
        htmlOutput += `<hr class="divider"><p class="question" data-sentence-order="${sentenceOrder}">${afterEqual}</p>\n`;

      } else if(trimmedLine.startsWith("@")) htmlOutput += `<p class="questionChoice" data-sentence-order="${sentenceOrder}">${trimmedLine.substring(1).trim()}</p>\n`;
      else if(trimmedLine.startsWith("+")) htmlOutput += `<p class="highlight" data-sentence-order="${sentenceOrder}">${trimmedLine.substring(1).trim()}</p>\n`;
      else if(trimmedLine.startsWith("#")) htmlOutput += `<p class="highlight2" data-sentence-order="${sentenceOrder}">${trimmedLine.substring(1).trim()}</p>\n`;
      else if(trimmedLine.startsWith("***")) htmlOutput += `<p class="chapterHeader" data-sentence-order="${sentenceOrder}">${trimmedLine.substring(3).trim()}</p>\n`;
      else if(trimmedLine.startsWith("-")) htmlOutput += `<p class="subTopicHeader" data-sentence-order="${sentenceOrder}">${trimmedLine.substring(1).trim()}</p>\n`;
      else if(trimmedLine.startsWith(">")) htmlOutput += `<p class="answer" data-sentence-order="${sentenceOrder}"><span class="arrow">→</span> ${trimmedLine.substring(1).trim()}</p>\n`;
      else htmlOutput += `<p class="answer" data-sentence-order="${sentenceOrder}">${trimmedLine}</p>\n`;

      if(index === lines.length-1 && groupOpen) htmlOutput += "</div>\n";
    });

    return htmlOutput;
  }

  // ========================== SUBMIT ==========================
  submitBtn.addEventListener("click",()=> {
    outputHtml.innerHTML=formatTextToHTML(inputText.value);
    addDifficultyButtons();
    currentPage=0;
    populateDropdowns();
    goToPage(0);

    // hide all textareas and buttons
    [inputText,hardText,focusText,submitBtn,copyBtn,clearBtn,hardCopyBtn, hardClearBtn, focusCopyBtn, focusClearBtn].forEach(el => el.style.display="none");
    showTextBtn.style.display="inline-block";
  });

  showTextBtn.addEventListener("click",()=> {
    const isHidden=inputText.style.display==="none";
    [inputText,hardText,focusText,submitBtn,copyBtn,clearBtn,hardCopyBtn, hardClearBtn, focusCopyBtn, focusClearBtn].forEach(el=>el.style.display=isHidden?"inline-block":"none");
    showTextBtn.textContent=isHidden?"Hide Text":"Show Text";
  });

  // ========================== HARD/FOCUS BUTTONS ==========================
function addDifficultyButtons(){
  const allGroups=document.querySelectorAll("#outputHtml > div");
  allGroups.forEach((div)=>{
    if(div.querySelector(".focus-btn-container")) return;
    const container=document.createElement("div");
    container.classList.add("focus-btn-container");

    // HARD BUTTON
    const hardBtn=document.createElement("button");
    hardBtn.textContent="Hard";
    hardBtn.classList.add("focus-btn"); // <-- added class
    hardBtn.addEventListener("click",()=>{ copyLinesPreserveNewlines(div, hardText); });
    container.appendChild(hardBtn);

    // FOCUS BUTTON
    const focusBtn=document.createElement("button");
    focusBtn.textContent="Focus";
    focusBtn.classList.add("focus-btn"); // <-- added class
    focusBtn.addEventListener("click",()=>{ copyLinesPreserveNewlines(div, focusText); });
    container.appendChild(focusBtn);

    div.appendChild(container);
  });
}

  // Copy lines from original textarea to target, preserve blank lines, append, add single new line at end
  function copyLinesPreserveNewlines(div,target){
    const orders=[];
    div.querySelectorAll(".question, .questionChoice, .answer, .highlight, .highlight2").forEach(el=>{
      const order=el.getAttribute("data-sentence-order");
      if(order) orders.push(parseInt(order));
    });
    if(orders.length===0) return;

    orders.sort((a,b)=>a-b);
    const originalLines=inputText.value.split("\n");
    const firstLineIndex=Math.min(...orders)-1;
    const lastLineIndex=Math.max(...orders)-1;
    const linesToCopy = originalLines.slice(firstLineIndex,lastLineIndex+1);

    if(target.value && !target.value.endsWith("\n")) target.value+="\n";

    // append lines including blank lines, add exactly 1 new line at the end
    target.value += linesToCopy.join("\n") + "\n\n";
  }

  // ========================== PAGINATION/FILTER FUNCTIONS ==========================
  function showPage(start,end){
    const allGroups=document.querySelectorAll("#outputHtml > div");
    const allChapters=document.querySelectorAll("#outputHtml .chapterHeader");
    allChapters.forEach(h=>h.style.display="none");
    allGroups.forEach((div,i)=>{ div.style.display=(i>=start && i<=end)?"block":"none"; });
  }

  function populateDropdowns() {
    const allGroups=document.querySelectorAll("#outputHtml > div");
    totalPages=Math.ceil(allGroups.length/DIVS_PER_PAGE);
    const options=[{value:0,text:"All"}];
    for(let i=1;i<=totalPages;i++) options.push({value:i,text:`Page ${i}`});
    [pageDropdownTop,pageDropdownBottom].forEach(dropdown=>{
      dropdown.innerHTML="";
      options.forEach(opt=>{
        const o=document.createElement("option");
        o.value=opt.value;
        o.textContent=opt.text;
        dropdown.appendChild(o);
      });
    });
  }

  function updateDropdowns(){ [pageDropdownTop,pageDropdownBottom].forEach(d=>d.value=currentPage); }

  function goToPage(pageNum){
    const allGroups=document.querySelectorAll("#outputHtml > div");
    if(pageNum===0){ allGroups.forEach(d=>d.style.display="block"); document.querySelectorAll("#outputHtml .chapterHeader").forEach(h=>h.style.display="block"); mainTitle.textContent="Show All";}
    else { const start=(pageNum-1)*DIVS_PER_PAGE,end=start+DIVS_PER_PAGE-1; showPage(start,end); mainTitle.textContent=`Page ${pageNum}`;}
    currentPage=pageNum; updateDropdowns(); window.scrollTo({top:0,behavior:'smooth'});
  }

  function nextPage(){ if(currentPage<totalPages) goToPage(currentPage+1); }
  function prevPage(){ if(currentPage>0) goToPage(currentPage-1); }

  function showAllPages(){ goToPage(0); }

  function applyGroupFilter(groupNum){
    document.querySelectorAll('[data-group-type]').forEach(div=>{
      div.style.display=div.dataset.groupType==="G"+groupNum?"block":"none";
    });
    document.querySelectorAll("#outputHtml .chapterHeader").forEach(h=>h.style.display="none");
    mainTitle.textContent="Group "+groupNum;
  }

  function updateDifficultyView(){
    const allGroups=document.querySelectorAll("#outputHtml > div");
    if(currentDifficultyFilter) allGroups.forEach(div=>div.style.display=(div.dataset.difficulty===currentDifficultyFilter?"block":"none"));
    else allGroups.forEach(div=>div.style.display="block");
  }

});