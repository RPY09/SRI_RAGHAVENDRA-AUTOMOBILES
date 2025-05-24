const API_URL =
  "https://script.google.com/macros/s/AKfycbwayZdkSvZGGx-BUuAmf2XHJHxZAEkqynLGOeOEZKN1jMCS4IrOKtLHgWH6mdAHJZYAIg/exec";
document.addEventListener("DOMContentLoaded", function () {
  const monthInput = document.querySelector('input[name="month"]');
  if (monthInput) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    monthInput.value = `${year}-${month}`;
  }
});

document
  .getElementById("expenditure-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true; // Disable button

    const data = {
      formType: "addMonthlyExpenditure",
      rent: form.rent.value,
      electricity: form.electricity.value,
      salary: form.salary.value,
      other: form.other.value,
    };
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "text/plain;charset=utf-8" },
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("exp-response").innerText = data.message;
        form.reset();
      })
      .catch(() => {
        document.getElementById("exp-response").innerText =
          "Error adding expenditure.";
      })
      .finally(() => {
        submitBtn.disabled = false; // Re-enable button
      });
  });
