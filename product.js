document.addEventListener("DOMContentLoaded", () => {
  console.log("Script Loaded ✅");
  const API_URL =
    "https://script.google.com/macros/s/AKfycbz0CPdJNGeCoIozW3vRMTIVO7O1m-6KyuQwocha89Jb4Py2orVKUs48Xk66tq07vbEE_Q/exec";
  let productData = [];

  // Fetch product data from the API
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      productData = data;
      console.log("API Data Received:", data);
      const dropdown = document.getElementById("product-dropdown");
      dropdown.innerHTML =
        "<option disabled selected>Select Product ID</option>";

      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.id;
        dropdown.appendChild(option);
      });
    })
    .catch((err) => {
      console.error("Error loading products:", err);
    });

  // Handle product selection
  document
    .getElementById("product-dropdown")
    .addEventListener("change", (event) => {
      const selectedId = event.target.value;
      const selectedProduct = productData.find(
        (item) => item.id === selectedId
      );

      if (selectedProduct) {
        document.getElementById("product-name").value =
          selectedProduct.name || "";
        document.getElementById("product-mrp").value =
          selectedProduct.mrp || "";
      } else {
        document.getElementById("product-name").value = "";
        document.getElementById("product-mrp").value = "";
      }
    });

  // Function to calculate and update the Total Amount
  const calculateTotalAmount = () => {
    const quantity = parseFloat(document.getElementById("quantity").value) || 0;
    const sellPrice = parseFloat(document.getElementById("price").value) || 0;
    const totalAmount = quantity * sellPrice;

    // Update the Total Amount field
    document.getElementById("total-amount").value = totalAmount.toFixed(2);
  };

  // Add event listeners to Quantity and Sell Price fields
  document
    .getElementById("quantity")
    .addEventListener("input", calculateTotalAmount);
  document
    .getElementById("price")
    .addEventListener("input", calculateTotalAmount);

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbz0CPdJNGeCoIozW3vRMTIVO7O1m-6KyuQwocha89Jb4Py2orVKUs48Xk66tq07vbEE_Q/exec";

  document.getElementById("bill-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submit

    const form = e.target;
    const formData = new FormData(form);

    fetch(scriptURL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Bill submitted successfully!");
        // You can also auto-open invoice here:
        // window.open(INVOICE_PDF_URL, '_blank');
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Error submitting bill");
      });
  });

  document
    .getElementById("generate-bill")
    .addEventListener("click", function () {
      const printURL =
        "https://docs.google.com/spreadsheets/d/1UH17l-bl_FHEDGr-G1nCi2vIAGa-MNewlG5Wo8N4u9s/preview?gid=1660878737&widget=false&headers=false";
      window.open(printURL, "_blank");
    });
});
