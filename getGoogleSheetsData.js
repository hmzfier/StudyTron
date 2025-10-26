const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfC2fDjdQH3W3Y3eRktW01871ZAkvpMHNAwIjfQNajGh4YfnPIhO6cJoZ0G17BXZErmWHRZLtN1e_g/pub?gid=0&single=true&output=csv";

async function getRowData(searchName) {
    const response = await fetch(sheetUrl);
    const csvText = await response.text();

    const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true
    });

    const rows = parsed.data;

    // Match by Name
    const row = rows.find(r => r.Name.trim() === searchName);

    return row || null;
}

// Grab page title dynamically
const pageTitleElement = document.querySelector(".title");
const searchName = pageTitleElement ? pageTitleElement.textContent.trim() : null;

if (searchName) {
    getRowData(searchName).then(data => {
        const container = document.getElementById("data-container");

        if (data) {
            container.innerHTML = `
              <p><strong>Focus 1:</strong> ${data.Focus1}</p>
              <p><strong>Focus 2:</strong> ${data.Focus2}</p>
              <p><strong>Focus 3:</strong> ${data.Focus3}</p>
            `;
        } else {
            container.innerHTML = "<p>Data not found.</p>";
        }
    });
} else {
    console.error("No .title element found on the page.");
}
