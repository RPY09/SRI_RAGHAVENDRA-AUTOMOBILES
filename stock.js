const API_URL =
  "https://script.google.com/macros/s/AKfycbwayZdkSvZGGx-BUuAmf2XHJHxZAEkqynLGOeOEZKN1jMCS4IrOKtLHgWH6mdAHJZYAIg/exec";

document.getElementById("stock-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submit

  const form = e.target;
  const formData = new FormData(form);

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
      alert(result.message || "Stock enter successfully!");
      form.reset();
    })
    .catch((err) => {
      alert("Stock failed to enter!");
      console.error(err);
    });
});
function viewstock() {
  window.location.href = "viewstock.html";
}
