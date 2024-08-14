export const toggleLanguage = (setLanguage) => {
    setLanguage((prevLanguage) => (prevLanguage === 'ru' ? 'en' : 'ru'));
};
