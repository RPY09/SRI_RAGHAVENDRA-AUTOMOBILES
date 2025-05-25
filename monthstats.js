// const date1 = document.getElementById("date1").value;
// const date2 = document.getElementById("date2").value;

document
  .getElementById("monthStatsForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // prevent default form submission

    const date1 = document.getElementById("date1").value;
    const date2 = document.getElementById("date2").value;

    if (date1 && date2) {
      fetchMonthStats(date1, date2);
    } else {
      alert("Please select both start and end dates.");
    }
  });

const API_URL =
  "https://script.google.com/macros/s/AKfycbwayZdkSvZGGx-BUuAmf2XHJHxZAEkqynLGOeOEZKN1jMCS4IrOKtLHgWH6mdAHJZYAIg/exec";

// Fetch Monthly Stats
function fetchMonthStats(date1, date2) {
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      formType: "monthstats",
      startDate: date1,
      endDate: date2,
    }),
    headers: { "Content-Type": "text/plain;charset=utf-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data && data.records) {
        displayTable(data.records, "month");
      }
    })
    .catch((error) => console.error("Error fetching month stats:", error));
}

// Fetch Daily Stats
function fetchDailyReport() {
  const today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      formType: "dailyreport",
      date: today,
    }),
    headers: { "Content-Type": "text/plain;charset=utf-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data && !data.error) {
        displayTable([data], "daily");
      } else {
        console.error("Error fetching daily report:", data.error);
      }
    })
    .catch((error) => console.error("Error fetching daily report:", error));
}

// Function to Display Data in a Table
function displayTable(records, reportType) {
  let tableHTML =
    "<table border='1' id='monthStatsTable'><thead><tr><th>Date</th><th>Total Sales</th><th>Profits</th><th>Total Batteries</th></tr></thead><tbody>";

  records.forEach((record) => {
    tableHTML += `<tr>
            <td>${formatDate(record.date)}</td>
            <td>${record.totalSales}</td>
            <td>${record.profits}</td>
            <td>${record.totalBatteries}</td>
        </tr>`;
  });

  tableHTML += "</tbody></table>";

  const container = document.getElementById(
    reportType === "daily" ? "dailyResults" : "monthResults"
  );
  container.innerHTML = tableHTML;

  const btn = document.getElementById("showTotalsBtn");
  const pbtn = document.getElementById("printButton");
  if (reportType === "month" && records.length > 0) {
    btn.style.display = "inline-block";
    pbtn.style.display = "inline-block";
  } else {
    btn.style.display = "none";
    pbtn.style.display = "none";
    document.getElementById("totals").innerHTML = "";
  }
}

// Schedule Daily Report Fetch at 8 PM
function scheduleDailyFetch() {
  function checkTime() {
    const now = new Date();
    if (now.getHours() === 16 && now.getMinutes() === 0) {
      // 8:00 PM
      fetchDailyReport();
    }
  }
  setInterval(checkTime, 60000); // Check every minute
}

// Call this function when the page loads
scheduleDailyFetch();
function formatDate(isoDateString) {
  const date = new Date(isoDateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
document.getElementById("printButton").addEventListener("click", function () {
  const printContent = document.getElementById("monthResults").innerHTML;
  const originalContent = document.body.innerHTML;

  const printHTML = `
    <html>
      <head>
        <title>Monthly Report</title>
        <style>
          body {
            margin: 20mm;
            font-family: Arial, sans-serif;
            color: #000;
          }
          h2 {
            text-align: center;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
          }
          th, td {
            border: 1px solid #333;
            padding: 8px;
            text-align: center;
          }
          th {
            background-color: #f2f2f2;
          }
          /* Hide buttons and inputs when printing */
          button, form {
            display: none !important;
          }
        </style>
      </head>
      <body>
        <h2>Monthly Report</h2>
        ${printContent}
      </body>
    </html>
  `;

  // Replace the whole page with print content
  document.open();
  document.write(printHTML);
  document.close();

  // Wait a bit for the new content to render before printing
  setTimeout(() => {
    window.print();
    // Reload original page after print
    window.location.reload();
  }, 250);
});

document.getElementById("showTotalsBtn").addEventListener("click", () => {
  const table = document.getElementById("monthStatsTable");
  if (!table) return alert("No data table found!");

  const rows = table.querySelectorAll("tbody tr");

  const monthlyTotals = {}; // { "May-2025": { sales: 0, profits: 0 }, ... }

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const rawDate = cells[0].textContent;
    const sales = parseFloat(cells[1].textContent) || 0;
    const profits = parseFloat(cells[2].textContent) || 0;
    const batteries = parseFloat(cells[3].textContent) || 0;
    // Extract month and year, format like "May-2025"
    const [day, month, year] = rawDate.split("-");
    const monthName = new Date(`${year}-${month}-01`).toLocaleString(
      "default",
      {
        month: "long",
      }
    );
    const key = `${monthName}-${year}`;

    if (!monthlyTotals[key]) {
      monthlyTotals[key] = { sales: 0, profits: 0, batteries: 0 };
    }

    monthlyTotals[key].sales += sales;
    monthlyTotals[key].profits += profits;
    monthlyTotals[key].batteries += batteries;
  });

  // Create HTML to show totals
  let totalsHTML = `<h3>Monthly Totals:</h3><ul>`;
  for (const month in monthlyTotals) {
    const data = monthlyTotals[month];
    totalsHTML += `<div class="month-summary">
  <h3>${month}</h3>
  <ul>
    <li><strong>Sales:</strong> ₹${data.sales.toFixed(2)}</li>
    <li><strong>Profits:</strong> ₹${data.profits.toFixed(2)}</li>
    <li><strong>Batteries Sold:</strong> ${data.batteries}</li>
  </ul>
</div>`;
  }
  totalsHTML += `</ul>`;

  document.getElementById("totals").innerHTML = totalsHTML;
});
