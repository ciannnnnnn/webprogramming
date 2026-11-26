const getUsers = () => {
  const raw = localStorage.getItem("users");
  return JSON.parse(raw) ?? [];
};

const screens = document.querySelectorAll(".screen");
const show = (id) => {
  screens.forEach((s) => {
    s.classList.toggle("hidden", s.id !== id);
  });
};

setTimeout(() => show("register"), 2000);

document.addEventListener("click", (e) => {
  const id = e.target.id;
  if (id === "toLogin") show("login");
  if (id === "toRegister") show("register");
  if (id === "logout") show("login");
});

const regForm = document.querySelector("#regForm");
const regMsg = document.querySelector("#regMsg");

regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = regForm.elements;
  try {
    if (f.password.value.length < 8)
      throw new Error("Password too short");
    if (f.password.value !== f.confirm.value)
      throw new Error("Passwords do not match");

    const email = f.email.value.trim().toLowerCase();
    if (getUsers().some((u) => u.email === email))
      throw new Error("Email already used");

    const users = [
      ...getUsers(),
      {
        name: f.name.value,
        email,
        password: f.password.value,
      },
    ];
    localStorage.setItem("users", JSON.stringify(users));
    regForm.reset();
    show("login");
  } catch (error) {
    regMsg.textContent = error.message;
  }
});

const logForm = document.querySelector("#logForm");
const logMsg = document.querySelector("#logMsg");
const hello = document.querySelector("#welcomeText");

logForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = logForm.elements;
  const mail = f.email.value.trim().toLowerCase();
  const user = getUsers().find((u) => u.email === mail);
  if (user?.password === f.password.value) {
    hello.textContent = `Welcome, ${user.name}!`;
    show("welcome");
  } else {
    logMsg.textContent = "Wrong email or password";
  }
});

const root = document.documentElement;
const toggle = document.querySelector("#themeToggle");

const setTheme = (name) => {
  const dark = name === "dark";
  root.dataset.theme = name;
  toggle.textContent = dark ? "Light" : "Dark";
  localStorage.setItem("theme", name);
};

const systemDark = matchMedia("(prefers-color-scheme: dark)").matches;
const saved = localStorage.getItem("theme");
setTheme(saved ?? (systemDark ? "dark" : "light"));

toggle.onclick = () => {
  const dark = root.dataset.theme === "dark";
  setTheme(dark ? "light" : "dark");
};
