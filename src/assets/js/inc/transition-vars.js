const transitionVars = () => {
    const root = document.documentElement;

    setTimeout(() => {
        root.style.setProperty("--transition-duration", '.3s');
        root.style.setProperty("--transition-function", 'ease-in-out');
    }, 150);
}

export default transitionVars;