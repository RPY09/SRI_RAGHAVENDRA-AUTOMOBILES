const scriptURL =
  "https://script.google.com/macros/s/AKfycbwayZdkSvZGGx-BUuAmf2XHJHxZAEkqynLGOeOEZKN1jMCS4IrOKtLHgWH6mdAHJZYAIg/exec";

function submitAttendance() {
  const data = {
    formType: "attendance",
    name: document.getElementById("name").value,
    status: document.getElementById("status").value,
    advance: document.getElementById("advance").value || 0,
  };

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "text/plain;charset=utf-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("response").innerText = data.message;
    })
    .catch((err) => {
      document.getElementById("response").innerText =
        "Error submitting attendance.";
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
