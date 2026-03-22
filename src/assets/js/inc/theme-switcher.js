export function themeSwitcher() {

    const html = document.documentElement;
    const themeToggle = document.getElementById("theme-toggle");
    let currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    document.documentElement.setAttribute("data-theme", currentTheme);

    themeToggle.addEventListener("click", function() {
        currentTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", currentTheme);
        localStorage.setItem("theme", currentTheme);
    });

}