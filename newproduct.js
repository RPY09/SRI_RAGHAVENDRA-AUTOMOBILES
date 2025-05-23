console.log("Script Loaded ✅");

// Your Google Apps Script Web App URL
const API_URL =
  "https://script.google.com/macros/s/AKfycbwayZdkSvZGGx-BUuAmf2XHJHxZAEkqynLGOeOEZKN1jMCS4IrOKtLHgWH6mdAHJZYAIg/exec";

let productData = []; // Stores all product data fetched from the API
const dropdown = document.getElementById("product-dropdown");
const productNameInput = document.getElementById("product-name");
const productMrpInput = document.getElementById("product-mrp");
const quantityInput = document.getElementById("quantity");
const priceInput = document.getElementById("price");
const totalAmountInput = document.getElementById("total-amount");

const fetchAllProducts = () => {
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

const calculateTotalAmount = () => {
  const quantity = parseFloat(quantityInput.value) || 0;
  const sellPrice = parseFloat(priceInput.value) || 0;
  const totalAmount = quantity * sellPrice;

  totalAmountInput.value = totalAmount.toFixed(2);
};

document.addEventListener("DOMContentLoaded", fetchAllProducts);

dropdown.addEventListener("change", handleProductSelection);

quantityInput.addEventListener("input", calculateTotalAmount);
priceInput.addEventListener("input", calculateTotalAmount);

calculateTotalAmount();

document.getElementById("bill-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  const form = e.target;
  const formData = new FormData(form);

  // Convert FormData to a plain object
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

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
    });
});
