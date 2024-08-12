import React, { useState, useEffect } from 'react';
import styles from "./styles/Zodiac.module.css";
import { zodiacSignsData } from "./utils/consts";
import ZodiacBlock from "./components/ZodiacBlock";
import { fetchHoroscope as fetchHoroscopeFromAPI } from "./API/PostDesc";
import HoroscopeDescription from "./components/HoroscopeDescription";
import {toggleLanguage } from './utils/zodiacBtns';

const ZodiacPage = () => {
    const [description, setDescription] = useState('');
    const [selectedSign, setSelectedSign] = useState();
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const userLanguage = navigator.language || navigator.userLanguage;
        setLanguage(userLanguage.startsWith('ru') ? 'ru' : 'en');
    }, []);

    const zodiacSigns = zodiacSignsData[language];

    const handleFetchHoroscope = async (sign) => {
        try {
            const horoscope = await fetchHoroscopeFromAPI(sign.sign, language);
            setDescription(horoscope);
            setSelectedSign(sign);
        } catch (error) {
            setDescription('error description');
        }
    };

    const handleCloseDescription = () => {
        setDescription('');
        setSelectedSign(null);
    };

    return (
        <div>
            <button className={styles.languageToggle} onClick={() => toggleLanguage(setLanguage)}>
                Переключить на {language === 'ru' ? 'English' : 'Русский'}
            </button>

            <div className={styles.zodiacContainer}>
                {zodiacSigns.map((sign, index) => (
                    <ZodiacBlock key={index} sign={sign} onClick={handleFetchHoroscope} />
                ))}
            </div>

            {description && selectedSign && (
                <HoroscopeDescription
                    description={description}
                    selectedSign={selectedSign}
                    onClose={handleCloseDescription}
                />
            )}
        </div>
    );
};

export default ZodiacPage;
