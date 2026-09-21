const themeToggle = document.getElementById("theme-toggle");

themeToggle.checked = localStorage.getItem("theme") === "dark";
themeToggle.addEventListener("change", () => {
    localStorage.setItem("theme", themeToggle.checked ? "dark" : "light");
});

document.querySelectorAll(".burger-nav a").forEach((link) => {
    link.addEventListener("click", () => {
        document.getElementById("burger-toggle").checked = false;
    });
});
