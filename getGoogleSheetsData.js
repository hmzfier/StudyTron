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

    // Example usage:
    getRowData("Chapter 8 Questions").then(data => {
      if (data) {
        console.log(data);
        // {EasyData: "1,2,3", MediumData: "4,5,6", HardData: "7,8,9"}
      } else {
        console.log("Not found");
      }
    });