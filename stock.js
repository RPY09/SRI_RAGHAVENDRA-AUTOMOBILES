const scriptURL =
  "https://script.google.com/macros/s/AKfycbz0CPdJNGeCoIozW3vRMTIVO7O1m-6KyuQwocha89Jb4Py2orVKUs48Xk66tq07vbEE_Q/exec";

document.getElementById("stock-form").addEventListener("submit", function (e) {
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
      alert("stock submitted successfully!");
      document.getElementById("pd_id").value = " ";
      document.getElementById("pd_name").value = " ";
      document.getElementById("purchase").value = " ";
      document.getElementById("pd_mrp").value = " ";
      document.getElementById("pd_no").value = " ";
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Error submitting bill");
    });
});
function viewstock() {
  window.location.href = "viewstock.html";
}
