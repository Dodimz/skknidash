const translate = (text) => {
    const translation = localStorage.getItem("translation") ? JSON.parse(localStorage.getItem("translation")) : {};
    const translateText = translation[text];
    return translateText ?? text;
}
export default translate;
