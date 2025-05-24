function home() {
  window.location.href = "home.html";
}
function sales() {
  window.location.href = "sales.html";
}
function attendence() {
  window.location.href = "attendence.html";
}
function stock() {
  const password = prompt("Enter password to access stock:");
  if (password === "raju3672") {
    // Replace with your actual password
    window.location.href = "stock.html";
  } else {
    alert("Incorrect password!");
  }
}
const scriptsURL =
  "https://script.google.com/macros/s/AKfycbwayZdkSvZGGx-BUuAmf2XHJHxZAEkqynLGOeOEZKN1jMCS4IrOKtLHgWH6mdAHJZYAIg/exec";

document.addEventListener("DOMContentLoaded", function () {
  // Attendance summary
  fetch(scriptsURL, {
    method: "POST",
    body: JSON.stringify({ formType: "attendanceSummaryForAll" }),
    headers: { "Content-Type": "text/plain;charset=utf-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      const presentDaysElem = document.getElementById("present-days");
      const advanceTakenElem = document.getElementById("advance-taken");
      const updateBtn = document.getElementById("update-attendance-btn");
      if (presentDaysElem) {
        presentDaysElem.innerHTML = `Present Days: <span class="p-number">${data.presentDays}</span>`;
      }
      if (advanceTakenElem) {
        advanceTakenElem.innerHTML = `Advance Taken: <span class="stock-number">${data.totalAdvance}</span>`;
      }
      if (updateBtn) {
        updateBtn.style.display = data.todayMarked ? "none" : "inline-block";
        updateBtn.onclick = function () {
          window.location.href = "attendence.html";
        };
      }
    });

  // Fetch total stock
  fetch(scriptsURL, {
    method: "POST",
    body: JSON.stringify({ formType: "totalStock" }),
    headers: { "Content-Type": "text/plain;charset=utf-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      const stockElem = document.getElementById("total-stock");
      if (stockElem) {
        stockElem.innerHTML = `Total Stock: <span class="stock-number">${data.totalStock}</span>`;
        // Show low stock products as a list
        let lowStockElem = document.getElementById("low-stock");
        if (data.lowStock && data.lowStock.length > 0) {
          if (!lowStockElem) {
            lowStockElem = document.createElement("ul");
            lowStockElem.id = "low-stock";
            stockElem.insertAdjacentElement("afterend", lowStockElem); // <-- FIXED
          }
          // Clear previous list
          lowStockElem.innerHTML = "";
          // Add each low stock product as a list item
          data.lowStock.forEach(function (id) {
            const li = document.createElement("li");
            li.innerText = ` ${id}`;
            lowStockElem.appendChild(li);
          });
        } else if (lowStockElem) {
          // If no low stock, clear the list
          lowStockElem.innerHTML = "";
        }
      }
    });

  // Showroom statistics
  fetch(scriptsURL, {
    method: "POST",
    body: JSON.stringify({ formType: "showroomStats" }),
    headers: { "Content-Type": "text/plain;charset=utf-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      const mostBuyElem = document.getElementById("most-buy-showroom");
      const mostOldElem = document.getElementById("most-old-showroom");
      if (mostBuyElem)
        mostBuyElem.innerText = ` Most Purchases: ${data.mostBuy}`;
      if (mostOldElem)
        mostOldElem.innerText = `Most Old Batteries: ${data.mostOld}`;
    });

  // Expense card logic
  const updateExpenseBtn = document.getElementById("update-expense-btn");

  // Check if this month's expense is already submitted
  fetch(scriptsURL, {
    method: "POST",
    body: JSON.stringify({ formType: "checkExpenseThisMonth" }),
    headers: { "Content-Type": "text/plain;charset=utf-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (updateExpenseBtn) {
        if (data.submitted) {
          updateExpenseBtn.style.display = "none";
        } else {
          updateExpenseBtn.style.display = "inline-block";
        }
      }
    });

  // On button click, open the expense entry page
  if (updateExpenseBtn) {
    updateExpenseBtn.addEventListener("click", function () {
      window.location.href = "expenes.html";
    });
  }
});

function toggleNav() {
  document.getElementById("nav-links").classList.toggle("active");
}
