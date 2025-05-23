function home() {
  window.location.href = "index.html";
}
function sales() {
  window.location.href = "sales.html";
}
function attendence() {
  window.location.href = "attendence.html";
}
function stock() {
  const password = prompt("Enter password to access stock:");
  if (password === "raju3672") {
    // Replace with your actual password
    window.location.href = "stock.html";
  } else {
    alert("Incorrect password!");
  }
}
