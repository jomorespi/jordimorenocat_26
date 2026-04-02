const options = () => {

    const html = document.documentElement;

    // Submenu Toggle
    const submenuToggle = () => {
        const optionBtns = document.querySelectorAll(".options > ul > li > button");
        const optionWrappers = document.querySelectorAll(".options__submenu");

        if (!optionBtns.length) return;

        optionBtns.forEach(btn => {
            const wrapper = btn.nextElementSibling;

            btn.addEventListener("click", () => {

                const isVisible = wrapper ? wrapper.classList.contains("options__submenu--visible") : false;

                optionWrappers.forEach(w => {
                    w.classList.remove("options__submenu--visible");
                    w.setAttribute("aria-hidden", "true");
                    w.setAttribute("inert", "");
                });

                if (wrapper && !isVisible) {
                    wrapper.classList.add("options__submenu--visible");
                    wrapper.setAttribute("aria-hidden", "false");
                    wrapper.removeAttribute("inert");
                }
            });

        });
    }

    // Close submenus when clicking outside
    document.addEventListener("click", (e) => {
        const isClickInside = e.target.closest(".options");

        if (!isClickInside) {
            const optionWrappers = document.querySelectorAll(".options__submenu");
            optionWrappers.forEach(w => {
                w.classList.remove("options__submenu--visible");
                w.setAttribute("aria-hidden", "true");
                w.setAttribute("inert", "");
            });
        }
    });


    // Theme Switcher
    const themeSwitcher = () => {
        const themeToggle = document.getElementById("theme-toggle");

        if (!themeToggle) return;

        let currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", currentTheme);

        themeToggle.addEventListener("click", function () {
            currentTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
            html.setAttribute("data-theme", currentTheme);
            localStorage.setItem("theme", currentTheme);
        });
    }

    // Font Switcher
    const fontSwitcher = () => {
        const fontSwitchMenu = document.querySelector('.options__submenu--font');

        if (!fontSwitchMenu) return;

        const fontOptions = fontSwitchMenu.querySelectorAll("input[type='radio']");
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
            option.addEventListener("change", function () {
                const selectedFont = this.value;
                html.classList.remove("font-sans", "font-serif", "font-mono");
                html.classList.add(`font-${selectedFont}`);
                localStorage.setItem("selectedFont", selectedFont);
            });
        });
    }

    // Initialize Options
    submenuToggle();
    fontSwitcher();
    themeSwitcher();

}

export default options;