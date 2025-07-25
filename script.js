document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  fetch("data/users.json")
    .then((response) => response.json())
    .then((users) => {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        if (user.role === "admin") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "dashboard.html";
        }
      } else {
        alert("Login fehlgeschlagen – Benutzer nicht gefunden.");
      }
    });
});
