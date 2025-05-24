const scriptURL =
  "https://script.google.com/macros/s/AKfycbwayZdkSvZGGx-BUuAmf2XHJHxZAEkqynLGOeOEZKN1jMCS4IrOKtLHgWH6mdAHJZYAIg/exec";

function submitAttendance() {
  const btn = document.getElementById("submit-attendance-btn");
  btn.disabled = true; // Disable button

  // ...collect data...
  const name = document.getElementById("name").value;
  const status = document.getElementById("status").value;
  const advance = document.getElementById("advance").value;

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({
      formType: "attendance",
      name,
      status,
      advance,
    }),
    headers: { "Content-Type": "text/plain;charset=utf-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("response").innerText =
        data.message || "Submitted!";
    })
    .catch(() => {
      document.getElementById("response").innerText = "Submission failed!";
    })
    .finally(() => {
      btn.disabled = false; // Re-enable button
    });
}

function showSalary() {
  const data = {
    formType: "salary",
    name: document.getElementById("name").value,
  };

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "text/plain;charset=utf-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("response").innerText = `Salary: ₹${data.salary}`;
    })
    .catch((err) => {
      document.getElementById("response").innerText = "Error fetching salary.";
      console.log(err);
    });
}
