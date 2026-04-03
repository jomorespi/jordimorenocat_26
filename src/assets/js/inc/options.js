const options = () => {

    const html = document.documentElement;
    const mainContent = document.querySelector(".main-content");
    const resetBtn = document.getElementById("optionsReset");

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
            enableReset("theme");
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
                enableReset("font");
            });
        });
    }

    // Font Size Switcher
    const fontSizeSwitcher = () => {
        const sizeRange = document.getElementById("font-size");

        if (!sizeRange) return;

        const sizeOutput = document.getElementById("font-size__output");
        const savedFontSize = localStorage.getItem("fontSize");

        if (savedFontSize) {
            mainContent.style.setProperty("--text-base", `${savedFontSize/100}rem`);
            sizeRange.value = savedFontSize;
            if (sizeOutput) {
                sizeOutput.textContent = `${savedFontSize/100}rem`;
            }
        }

        sizeRange.addEventListener("input", function () {
            const sizeValue = this.value;
            mainContent.style.setProperty("--text-base", `${sizeValue/100}rem`);
            localStorage.setItem("fontSize", sizeValue);

            if (sizeOutput) {
                sizeOutput.textContent = `${sizeValue}%`;
            }

            enableReset("fontSize");
        });
    }

    // Text alignment
    const textAlignment= () => {
        const alignBtn = document.getElementById("textAlign");

        if (!alignBtn) return;

        const savedAlignment = localStorage.getItem("textAlignment");
        const alignIcons = alignBtn.querySelectorAll("span");

        if (savedAlignment) {
            mainContent.style.setProperty("--align", savedAlignment);
        }

        alignBtn.addEventListener("click", function () {
            const currentAlignment = mainContent.style.getPropertyValue("--align") || "left";
            const newAlignment = currentAlignment === "left" ? "center" : currentAlignment === "center" ? "right" : "left";
            mainContent.style.setProperty("--align", newAlignment);
            localStorage.setItem("textAlignment", newAlignment);
            enableReset("textAlign");

            alignIcons.forEach(icon => {
                icon.classList.add("hidden");

                if ( icon.classList.contains(`${newAlignment}`) ) {
                    icon.classList.remove("hidden");
                }

            });

        });

    }

    // Enable reset button
    const enableReset = (opt) => {

        if (!resetBtn) return;

        let updatedOptionsModified = localStorage.getItem("optionsModified")
            ? JSON.parse(localStorage.getItem("optionsModified"))
            : { theme: false, font: false, fontSize: false, textAlign: false };

        updatedOptionsModified[opt] = true;
        localStorage.setItem("optionsModified", JSON.stringify(updatedOptionsModified));
        resetBtn.removeAttribute("disabled");
        
    }

    // Options reset
    const optionsReset = () => {

        if (!resetBtn) return;

        resetBtn.addEventListener("click", function () {
            ["theme", "selectedFont", "fontSize", "textAlignment", "optionsModified"].forEach(key => {
                localStorage.removeItem(key);
            });

            html.removeAttribute("data-theme");
            html.classList.remove("font-sans", "font-serif", "font-mono");
            mainContent.style.removeProperty("--text-base");
            mainContent.style.removeProperty("--align");

            this.setAttribute("disabled", "disabled");

            let currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            html.setAttribute("data-theme", currentTheme);

            const fontSwitchMenu = document.querySelector('.options__submenu--font');
            if (fontSwitchMenu) {
                const fontOptions = fontSwitchMenu.querySelectorAll("input[type='radio']");
                fontOptions.forEach(option => {
                    if (option.value === "sans") {
                        option.checked = true;
                    } else {
                        option.checked = false;
                    }
                });
            }

            const sizeRange = document.getElementById("font-size");
            const sizeOutput = document.getElementById("font-size__output");
            if (sizeRange) {
                sizeRange.value = 100;
            }
            if (sizeOutput) {
                sizeOutput.textContent = `100%`;
            }

            const alignBtn = document.getElementById("textAlign");
            if (alignBtn) {
            const alignIcons = alignBtn.querySelectorAll("span");
            alignIcons.forEach(icon => {
                icon.classList.add("hidden");
                if (icon.classList.contains("left")) {
                    icon.classList.remove("hidden");
                }
            });
            }


        });
    }

    // Initialize Options
    submenuToggle();
    fontSwitcher();
    themeSwitcher();
    fontSizeSwitcher();
    textAlignment();
    optionsReset();
}

export default options;