const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfC2fDjdQH3W3Y3eRktW01871ZAkvpMHNAwIjfQNajGh4YfnPIhO6cJoZ0G17BXZErmWHRZLtN1e_g/pub?gid=0&single=true&output=csv";

async function getRowData(searchName) {
    const response = await fetch(sheetUrl);
    const csvText = await response.text();

    // Parse CSV properly with PapaParse
    const parsed = Papa.parse(csvText, {
        header: true,       // Treat the first row as header
        skipEmptyLines: true // Ignore empty rows
    });

    const rows = parsed.data;

    // Find the row with the matching name
    const row = rows.find(r => r.Name.trim() === searchName);

    return row || null;
}

// Grab the title from the page dynamically
const pageTitleElement = document.querySelector(".title");
const searchName = pageTitleElement ? pageTitleElement.textContent.trim() : null;

if (searchName) {
    getRowData(searchName).then(data => {
        const container = document.getElementById("data-container");

        if (data) {
            container.innerHTML = `
              <p><strong>Easy Data:</strong> ${data.EasyData}</p>
              <p><strong>Medium Data:</strong> ${data.MediumData}</p>
              <p><strong>Hard Data:</strong> ${data.HardData}</p>
            `;
        } else {
            container.innerHTML = "<p>Data not found.</p>";
        }
    });
} else {
    console.error("No .title element found on the page.");
}


//V2 WORKS
/*const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfC2fDjdQH3W3Y3eRktW01871ZAkvpMHNAwIjfQNajGh4YfnPIhO6cJoZ0G17BXZErmWHRZLtN1e_g/pub?gid=0&single=true&output=csv";

async function getRowData(searchName) {
    const response = await fetch(sheetUrl);
    const csvText = await response.text();

    // Parse CSV properly with PapaParse
    const parsed = Papa.parse(csvText, {
        header: true,       // Treat the first row as header
        skipEmptyLines: true // Ignore empty rows
    });

    const rows = parsed.data;

    // Find the row with the matching name
    const row = rows.find(r => r.Name.trim() === searchName);

    return row || null;
}

// Grab the title from the page dynamically
const pageTitleElement = document.querySelector(".title");
const searchName = pageTitleElement ? pageTitleElement.textContent.trim() : null;

if (searchName) {
    getRowData(searchName).then(data => {
        const container = document.getElementById("data-container");

        if (data) {
            container.innerHTML = `
              <p><strong>Easy Data:</strong> ${data.EasyData}</p>
              <p><strong>Medium Data:</strong> ${data.MediumData}</p>
              <p><strong>Hard Data:</strong> ${data.HardData}</p>
            `;
        } else {
            container.innerHTML = "<p>Data not found.</p>";
        }
    });
} else {
    console.error("No .title element found on the page.");
}*/



//note the below works in grabbing and displaying the data
/*const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfC2fDjdQH3W3Y3eRktW01871ZAkvpMHNAwIjfQNajGh4YfnPIhO6cJoZ0G17BXZErmWHRZLtN1e_g/pub?gid=0&single=true&output=csv";

async function getRowData(searchName) {
    const response = await fetch(sheetUrl);
    const csvText = await response.text();

    // Parse CSV properly with PapaParse
    const parsed = Papa.parse(csvText, {
        header: true,       // Treat the first row as header
        skipEmptyLines: true // Ignore empty rows
    });

    const rows = parsed.data;

    // Find the row with the matching name
    const row = rows.find(r => r.Name.trim() === searchName);

    return row || null;
}

getRowData("Chapter 8 Questions").then(data => {
    const container = document.getElementById("data-container");

    if (data) {
        container.innerHTML = `
          <p><strong>Easy Data:</strong> ${data.EasyData}</p>
          <p><strong>Medium Data:</strong> ${data.MediumData}</p>
          <p><strong>Hard Data:</strong> ${data.HardData}</p>
        `;
    } else {
        container.innerHTML = "<p>Data not found.</p>";
    }
});*/