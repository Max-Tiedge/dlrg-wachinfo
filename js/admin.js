let users = [];

async function loadUsers() {
  const res = await fetch('data/users.json');
  users = await res.json();
  displayUsers();
}

function login() {
  const user = document.getElementById("adminUser").value;
  const pass = document.getElementById("adminPass").value;

  const found = users.find(u => u.username === user && u.password === pass && u.role === "admin");

  if (found) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
  } else {
    alert("Falsche Anmeldedaten");
  }
}

function displayUsers() {
  const list = document.getElementById("userList");
  list.innerHTML = "";
  users.forEach((u, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${u.username} (${u.role}) 
      <button onclick="resetPassword(${i})">Passwort zurücksetzen</button>`;
    list.appendChild(li);
  });
}

function addUser() {
  const newUser = document.getElementById("newUser").value;
  const newPass = document.getElementById("newPass").value;
  const newRole = document.getElementById("newRole").value;

  if (!newUser || !newPass) {
    alert("Bitte Benutzername und Passwort angeben");
    return;
  }

  users.push({ username: newUser, password: newPass, role: newRole });
  displayUsers();
  alert("Benutzer hinzugefügt (Achtung: nicht gespeichert)");
}

function resetPassword(index) {
  const newPass = prompt("Neues Passwort für " + users[index].username + ":");
  if (newPass) {
    users[index].password = newPass;
    alert("Passwort geändert (Achtung: nicht gespeichert)");
  }
}

window.onload = loadUsers;
