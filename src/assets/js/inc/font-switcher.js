export function fontSwitcher() {
    const fontSwitchToggle = document.getElementById("font-switch");

    if (!fontSwitchToggle) return;

    const fontSwitchMenu = document.querySelector('.options__submenu--font');
    const fontOptions = fontSwitchMenu.querySelectorAll("input[type='radio']");

    fontSwitchToggle.addEventListener("click", function() {
        fontSwitchMenu.classList.toggle("options__submenu--visible");
    });

    fontOptions.forEach(option => {
        option.addEventListener("change", function() {
            const selectedFont = this.value;
            document.querySelector("body").classList.remove("font-sans", "font-serif", "font-mono");
            document.querySelector("body").classList.add(`font-${selectedFont}`);
        });
    });
}