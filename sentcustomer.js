const Scripturl =
  "https://script.google.com/macros/s/AKfycbyqUtyGDfxM_mtWSxvS805UBwaJQ8Rtnm_M6h4ufAlCNewFuFTmVYjTWLlzneMpF3PGZw/exec";
document.getElementById("bill-form").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent default HTML form submission

  const formData = new FormData(e.target);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  fetch("Scripturl", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      alert("Sales data saved successfully!");
      console.log(result);
    })
    .catch((error) => {
      alert("Error submitting form");
      console.error("Fetch error:", error);
    });
});
