console.log("Script Loaded ✅");

// Your Google Apps Script Web App URL
const API_URL =
  "https://script.google.com/macros/s/AKfycbwayZdkSvZGGx-BUuAmf2XHJHxZAEkqynLGOeOEZKN1jMCS4IrOKtLHgWH6mdAHJZYAIg/exec";

let productData = []; // Stores all product data fetched from the API
const billDropdown = document.getElementById("product-dropdown");
const showroomDropdown = document.getElementById("showroom-product-dropdown");
const productNameInput = document.getElementById("product-name");
const productMrpInput = document.getElementById("product-mrp");
const quantityInput = document.getElementById("quantity");
const priceInput = document.getElementById("price");
const totalAmountInput = document.getElementById("total-amount");

const fetchAllProducts = (dropdown) => {
  fetch(`${API_URL}?type=allProducts`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // Check if the data received is an array (as expected for 'allProducts')
      if (Array.isArray(data)) {
        productData = data;
        console.log("API Data Received:", productData);

        dropdown.innerHTML =
          "<option disabled selected value=''>Select Product ID</option>";

        productData.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.id;
          option.textContent = item.id;
          dropdown.appendChild(option);
        });
      } else {
        console.error("API returned an error or unexpected format:", data);
        alert(`Error: ${data.error || "Unknown API error"}`);
      }
    })
    .catch((err) => {
      console.error("Error loading products:", err);
      alert("Failed to load products. Please check the console for details.");
    });
};

// Handler for Bill form dropdown
const handleProductSelection = (event) => {
  const selectedId = event.target.value;
  const selectedProduct = productData.find((item) => item.id === selectedId);

  if (selectedProduct) {
    productNameInput.value = selectedProduct.name || "";
    productMrpInput.value = selectedProduct.mrp || "";
    priceInput.value = selectedProduct.mrp || "";
    calculateTotalAmount();
  } else {
    productNameInput.value = "";
    productMrpInput.value = "";
    priceInput.value = "";
    calculateTotalAmount();
  }
};

// Handler for Showroom form dropdown
const showroomProductNameInput = document.getElementById(
  "showroom-product-name"
);
const showroomProductMrpInput = document.getElementById("showroom-mrp");
if (showroomDropdown) {
  showroomDropdown.addEventListener("change", function (event) {
    const selectedId = event.target.value;
    const selectedProduct = productData.find((item) => item.id === selectedId);

    if (selectedProduct) {
      // If you have showroom-specific name/mrp fields, set them here
      if (showroomProductNameInput)
        showroomProductNameInput.value = selectedProduct.name || "";
      if (showroomProductMrpInput)
        showroomProductMrpInput.value = selectedProduct.mrp || "";
    } else {
      if (showroomProductNameInput) showroomProductNameInput.value = "";
      if (showroomProductMrpInput) showroomProductMrpInput.value = "";
    }
  });
}

const calculateTotalAmount = () => {
  const quantity = parseFloat(quantityInput.value) || 0;
  const sellPrice = parseFloat(priceInput.value) || 0;
  const totalAmount = quantity * sellPrice;

  totalAmountInput.value = totalAmount.toFixed(2);
};

document.addEventListener("DOMContentLoaded", function () {
  if (billDropdown) fetchAllProducts(billDropdown);
  if (showroomDropdown) fetchAllProducts(showroomDropdown);
});

billDropdown.addEventListener("change", handleProductSelection);
quantityInput.addEventListener("input", calculateTotalAmount);
priceInput.addEventListener("input", calculateTotalAmount);

calculateTotalAmount();

const billForm = document.getElementById("bill-form");
if (billForm) {
  billForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const form = e.target;
    const formData = new FormData(form);

    // Convert FormData to a plain object
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    setFormButtonsDisabled(form, true); // Disable buttons

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result.message || "Submitted successfully!");
        form.reset();
      })
      .catch((err) => {
        alert("Submission failed!");
        console.error(err);
      })
      .finally(() => {
        setFormButtonsDisabled(form, false); // Re-enable buttons
      });
  });
}

const chargingBillForm = document.getElementById("charging-bill-form");
if (chargingBillForm) {
  chargingBillForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Convert FormData to a plain object
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    data.formType = "charging";
    setFormButtonsDisabled(form, true); // Disable buttons

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result.message || "Charging submitted successfully!");
        form.reset();
      })
      .catch((err) => {
        alert("Charging submission failed!");
        console.error(err);
      })
      .finally(() => {
        setFormButtonsDisabled(form, false); // Re-enable buttons
      });
  });
}

const showroomBillForm = document.getElementById("showroom-bill-form");
if (showroomBillForm) {
  showroomBillForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    data.formType = "showroom";
    setFormButtonsDisabled(form, true); // Disable buttons

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "text/plain;charset=utf-8" },
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result.message || "Showroom submitted successfully!");
        form.reset();

        // If "old" selected, check for battery match
        if (data.showroomType === "old") {
          checkBatteryMatch(data.showroomBatteryNo);
        }
      })
      .catch((err) => {
        alert("Showroom submission failed!");
        console.error(err);
      })
      .finally(() => {
        setFormButtonsDisabled(form, false); // Re-enable buttons
      });
  });
}

// Function to check battery match and show result
function checkBatteryMatch(batteryNo) {
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ formType: "checkBattery", batteryNo }),
    headers: { "Content-Type": "text/plain;charset=utf-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Battery match API response:", data); // <-- Add this
      const resultDiv = document.getElementById("battery-match-result");
      if (data.found) {
        resultDiv.innerHTML = `
          <strong>Battery Match Found:</strong><br>
          Date: ${data.date || "-"}<br>
          Battery Type: ${data.batteryType || "-"}<br>
          Battery No: ${data.batteryNo || "-"}
        `;
      } else {
        resultDiv.innerHTML =
          "No matching new battery found for this old battery number.";
      }
    });
}

function setFormButtonsDisabled(form, disabled) {
  const buttons = form.querySelectorAll('button[type="submit"], .btn-bill');
  buttons.forEach((btn) => (btn.disabled = disabled));
}
