    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfC2fDjdQH3W3Y3eRktW01871ZAkvpMHNAwIjfQNajGh4YfnPIhO6cJoZ0G17BXZErmWHRZLtN1e_g/pub?gid=0&single=true&output=csv";

    async function getRowData(searchName) {
      const response = await fetch(sheetUrl);
      const csvText = await response.text();

      // Split into rows
      const rows = csvText.split("\n").map(row => row.split(","));

      // Get the header indices
      const headers = rows[0];
      const nameIndex = headers.indexOf("Name");
      const easyIndex = headers.indexOf("EasyData");
      const mediumIndex = headers.indexOf("MediumData");
      const hardIndex = headers.indexOf("HardData");

      // Find the row with the matching name
      for (let i = 1; i < rows.length; i++) {
        if (rows[i][nameIndex] === searchName) {
          return {
            EasyData: rows[i][easyIndex],
            MediumData: rows[i][mediumIndex],
            HardData: rows[i][hardIndex]
          };
        }
      }

      return null; // not found
    }

    // Display the data as HTML
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
    });
  </script>