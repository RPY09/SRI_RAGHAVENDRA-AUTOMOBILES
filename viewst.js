document.addEventListener("DOMContentLoaded", function () {
  console.log("script loaded ");
  const API_URL =
    "https://script.google.com/macros/s/AKfycbwayZdkSvZGGx-BUuAmf2XHJHxZAEkqynLGOeOEZKN1jMCS4IrOKtLHgWH6mdAHJZYAIg/exec";

  console.log("fetching the data");
  fetch(`${API_URL}?type=getStock`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched data:", data);
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
        "Action",
      ];
      columns.forEach((col) => {
        const th = document.createElement("th");
        th.textContent = col;
        header.appendChild(th);
      });

      // Track changed rows
      const changedRows = new Set();

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

        // Mark row as changed on edit
        [purchaseCell, mrpCell, noCell].forEach((cell) => {
          cell.addEventListener("input", () => {
            changedRows.add(row);
            row.style.background = "#fff8dc"; // highlight changed row
          });
        });

        // Add Update button
        const updateCell = row.insertCell();
        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";
        updateBtn.onclick = function () {
          updateBtn.disabled = true; // Disable button
          const updatedPurchase = purchaseCell.textContent.trim();
          const updatedMrp = mrpCell.textContent.trim();
          const updatedNo = noCell.textContent.trim();
          const id = row.cells[0].textContent.trim();

          fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
              formType: "updateStock",
              id: id,
              purchase: updatedPurchase,
              mrp: updatedMrp,
              no: updatedNo,
            }),
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
          })
            .then((res) => res.json())
            .then((result) => {
              alert(result.message || "Stock updated!");
              row.style.background = ""; // remove highlight
              changedRows.delete(row);
            })
            .catch((err) => {
              alert("Update failed!");
              console.error("Update failed!", err);
            })
            .finally(() => {
              updateBtn.disabled = false; // Re-enable button
            });
        };
        updateCell.appendChild(updateBtn);

        // Add Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "8px";
        deleteBtn.onclick = function () {
          deleteBtn.disabled = true; // Disable button
          const id = row.cells[0].textContent.trim();
          if (confirm("Are you sure you want to delete this row?")) {
            fetch(API_URL, {
              method: "POST",
              body: JSON.stringify({
                formType: "deleteStock",
                id: id,
              }),
              headers: {
                "Content-Type": "text/plain;charset=utf-8",
              },
            })
              .then((res) => res.json())
              .then((result) => {
                alert(result.message || "Stock deleted!");
                if (!result.error) {
                  row.remove(); // Remove the row from the table on success
                  changedRows.delete(row);
                }
              })
              .catch((err) => {
                alert("Delete failed!");
                console.error("Delete failed!", err);
              })
              .finally(() => {
                deleteBtn.disabled = false; // Re-enable button
              });
          } else {
            deleteBtn.disabled = false; // Re-enable if cancelled
          }
        };
        updateCell.appendChild(deleteBtn);
      });

      // Add table to the page
      document.body.appendChild(table);

      // Add "Save All" button at the end of the table
      const saveAllBtn = document.createElement("button");
      saveAllBtn.textContent = "Save All Changes";
      saveAllBtn.style.marginTop = "16px";
      saveAllBtn.onclick = function () {
        if (changedRows.size === 0) {
          alert("No changes to save.");
          return;
        }
        saveAllBtn.disabled = true; // Disable button
        let pending = changedRows.size;
        let errors = 0;
        changedRows.forEach((row) => {
          const id = row.cells[0].textContent.trim();
          const updatedPurchase = row.cells[2].textContent.trim();
          const updatedMrp = row.cells[3].textContent.trim();
          const updatedNo = row.cells[4].textContent.trim();

          fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
              formType: "updateStock",
              id: id,
              purchase: updatedPurchase,
              mrp: updatedMrp,
              no: updatedNo,
            }),
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.error) errors++;
              row.style.background = ""; // remove highlight
              changedRows.delete(row);
              if (--pending === 0) {
                alert(
                  errors === 0
                    ? "All changes saved!"
                    : `${errors} row(s) failed to update.`
                );
                saveAllBtn.disabled = false; // Re-enable button
              }
            })
            .catch(() => {
              errors++;
              if (--pending === 0) {
                alert(
                  errors === 0
                    ? "All changes saved!"
                    : `${errors} row(s) failed to update.`
                );
                saveAllBtn.disabled = false; // Re-enable button
              }
            });
        });
      };
      document.body.appendChild(saveAllBtn);
    })
    .catch((err) => {
      console.error("Error loading products:", err);
      document.body.innerHTML = "<p>Error loading stock data.</p>";
    });
});
