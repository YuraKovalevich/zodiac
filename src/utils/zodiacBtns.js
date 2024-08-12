export const handleBackClick = (setDescription, setSelectedSign) => {
    setDescription('');
    setSelectedSign();
};

export const handleTouchStart = (e, touchStartX) => {
    touchStartX.current = e.touches[0].clientX;
};

export const handleTouchMove = (e, touchStartX, onClose) => {
    const touchEndX = e.touches[0].clientX;
    if (touchStartX.current - touchEndX > 50) {
        onClose();
    }
};


export const toggleLanguage = (setLanguage) => {
    setLanguage((prevLanguage) => (prevLanguage === 'ru' ? 'en' : 'ru'));
};
