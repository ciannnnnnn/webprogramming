
// ---------- Splash Screen ----------

window.addEventListener("load", () => {

    setTimeout(() => {

        const splash = document.querySelector("#splash");

        splash.classList.add("hidden");

    }, 2000);

});


// ---------- Dark / Light Theme ----------

const root = document.documentElement;
const toggle = document.querySelector("#themeToggle");

const setTheme = (name) => {

    const dark = name === "dark";

    root.dataset.theme = name;

    toggle.textContent = dark ? "Light" : "Dark";

    localStorage.setItem("theme", name);

};

const systemDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
).matches;

const savedTheme = localStorage.getItem("theme");

setTheme(savedTheme || (systemDark ? "dark" : "light"));

toggle.addEventListener("click", () => {

    const currentTheme = root.dataset.theme;

    setTheme(currentTheme === "dark" ? "light" : "dark");

});


// ---------- Notice Storage ----------

const getNotices = () => {

    try {

        return JSON.parse(
            localStorage.getItem("campusNotices")
        ) || [];

    } catch {

        return [];

    }

};


// ---------- Display Notices ----------

const noticeList = document.querySelector("#noticeList");
const emptyMessage = document.querySelector("#emptyMessage");

const displayNotices = () => {

    const notices = getNotices();

    noticeList.innerHTML = "";

    notices.forEach((notice) => {

        const article = document.createElement("article");
        article.className = "notice";

        const heading = document.createElement("h2");
        heading.textContent = notice.title;

        const meta = document.createElement("p");
        meta.className = "meta";

        const date = document.createTextNode(notice.date + " ");

        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = notice.category;

        meta.append(date, tag);

        const message = document.createElement("p");
        message.textContent = notice.message;

        const email = document.createElement("p");
        email.className = "meta";
        email.textContent = "Posted by: " + notice.email;

        article.append(heading, meta, message, email);

        noticeList.appendChild(article);

    });

    emptyMessage.hidden = notices.length > 0;

};


// ---------- Post a Notice ----------

const noticeForm = document.querySelector("#noticeForm");
const formMessage = document.querySelector("#formMessage");

noticeForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const form = noticeForm.elements;

    const newNotice = {

        title: form.title.value.trim(),

        category: form.category.value,

        date: form.date.value,

        message: form.message.value.trim(),

        email: form.email.value.trim(),

    };

    if (
        !newNotice.title ||
        !newNotice.date ||
        !newNotice.message ||
        !newNotice.email
    ) {

        formMessage.textContent = "Please complete all fields.";

        return;

    }

    const notices = getNotices();

    notices.unshift(newNotice);

    try {

        localStorage.setItem(
            "campusNotices",
            JSON.stringify(notices)
        );

        displayNotices();

        noticeForm.reset();

        formMessage.textContent = "Notice posted successfully!";

    } catch {

        formMessage.textContent =
            "Unable to save notice. Browser storage may be full.";

    }

});


// ---------- Load Saved Notices ----------

displayNotices();
