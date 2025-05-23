document.addEventListener("DOMContentLoaded", function () {
  console.log("script loaded ");
  const API_URL =
    "https://script.google.com/macros/s/AKfycbz0CPdJNGeCoIozW3vRMTIVO7O1m-6KyuQwocha89Jb4Py2orVKUs48Xk66tq07vbEE_Q/exec?type=viewStock";
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbz0CPdJNGeCoIozW3vRMTIVO7O1m-6KyuQwocha89Jb4Py2orVKUs48Xk66tq07vbEE_Q/exec";
  console.log("fetching the data");
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      // Create table
      const table = document.createElement("table");
      table.border = "1";
      table.style.width = "100%";

      // Create table header
      const header = table.insertRow();
      const columns = [
        "ID",
        "Name",
        "Purchase Price",
        "MRP",
        "Stock No",
        "Stock Sold",
        "Current Stock",
        "Actions",
      ];
      columns.forEach((col) => {
        const th = document.createElement("th");
        th.textContent = col;
        header.appendChild(th);
      });

      // Add data rows
      data.forEach((item) => {
        const row = table.insertRow();
        row.insertCell().textContent = item.id || "";
        row.insertCell().textContent = item.name || "";

        // Editable cells
        const purchaseCell = row.insertCell();
        purchaseCell.textContent = item.purchase || "";
        purchaseCell.contentEditable = "true";

        const mrpCell = row.insertCell();
        mrpCell.textContent = item.mrp || "";
        mrpCell.contentEditable = "true";

        const noCell = row.insertCell();
        noCell.textContent = item.no || "";
        noCell.contentEditable = "true";

        row.insertCell().textContent = item.sold || ""; // Not editable
        row.insertCell().textContent = item.current || ""; // Not editable

        // Actions cell
        const actionsCell = row.insertCell();

        // Update button
        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";
        updateBtn.name = "type";
        updateBtn.value = "update";
        updateBtn.onclick = function () {
          // Read edited values from the table
          const newPurchase = purchaseCell.textContent;
          const newMrp = mrpCell.textContent;
          const newNo = noCell.textContent;
          const newName = row.cells[1].textContent;

          fetch(scriptURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "update",
              id: item.id,
              name: newName,
              purchase: newPurchase,
              mrp: newMrp,
              no: newNo,
              sold: item.sold,
              current: item.current,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.success) {
                alert("Updated successfully!");
              } else {
                alert("Update failed: " + res.error);
              }
            });
        };
        actionsCell.appendChild(updateBtn);

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "8px";
        deleteBtn.onclick = function () {
          if (confirm("Are you sure you want to delete ID: " + item.id + "?")) {
            fetch(scriptURL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ type: "delete", id: item.id }),
            })
              .then((res) => res.json())
              .then((res) => {
                if (res.success) {
                  alert("Deleted successfully!");
                  table.deleteRow(row.rowIndex);
                } else {
                  alert("Delete failed: " + res.error);
                }
              });
          }
        };
        actionsCell.appendChild(deleteBtn);
      });

      // Add table to the page
      document.body.appendChild(table);
    })
    .catch((err) => {
      console.error("Error loading products:", err);
      document.body.innerHTML = "<p>Error loading stock data.</p>";
    });
});
