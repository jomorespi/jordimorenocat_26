import { transitionVars } from "./inc/transition-vars.js";
import { themeSwitcher } from "./inc/theme-switcher.js";
import { fontSwitcher } from "./inc/font-switcher.js";

window.addEventListener("DOMContentLoaded", function() {
    transitionVars();
    themeSwitcher();
    fontSwitcher();
});