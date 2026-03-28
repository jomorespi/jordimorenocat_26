const options = () => {

    const html = document.documentElement;

    // Theme Switcher
    const themeSwitcher = () => {
        const themeToggle = document.getElementById("theme-toggle");

        if (!themeToggle) return;

        let currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", currentTheme);

        themeToggle.addEventListener("click", function() {
            currentTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
            html.setAttribute("data-theme", currentTheme);
            localStorage.setItem("theme", currentTheme);
        });
    }

    // Font Switcher
    const fontSwitcher = () => {
        const fontSwitchToggle = document.getElementById("font-switch");

        if (!fontSwitchToggle) return;

        const fontSwitchMenu = document.querySelector('.options__submenu--font');
        const fontOptions = fontSwitchMenu.querySelectorAll("input[type='radio']");

        fontSwitchToggle.addEventListener("click", function() {
            fontSwitchMenu.classList.toggle("options__submenu--visible");
        });

        const selectedFont = localStorage.getItem("selectedFont");
        if (selectedFont) {
            html.classList.add(`font-${selectedFont}`);

            fontOptions.forEach(option => {
                if (option.value === selectedFont) {
                    option.checked = true;
                }
            });

        }

        fontOptions.forEach(option => {
            option.addEventListener("change", function() {
                const selectedFont = this.value;
                html.classList.remove("font-sans", "font-serif", "font-mono");
                html.classList.add(`font-${selectedFont}`);
                localStorage.setItem("selectedFont", selectedFont);
            });
        });
    }

    // Initialize Options
    fontSwitcher();
    themeSwitcher();

}

export default options;