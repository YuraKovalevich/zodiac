import React, { useState, useEffect } from 'react';
import styles from "../styles/Zodiac.module.css";
import { zodiacSignsData } from "../utils/consts";
import ZodiacBlock from "../components/ZodiacBlock";
import { fetchHoroscope as fetchHoroscopeFromAPI } from "../API/PostDesc";
import Modal from '../components/Modal';
import { toggleLanguage } from '../utils/zodiacBtns';
import Loader from "../UI/Loader";

const ZodiacPage = () => {
    const [description, setDescription] = useState('');
    const [selectedSign, setSelectedSign] = useState();
    const [language, setLanguage] = useState('ru');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const languageCode = window.Telegram.WebApp.initDataUnsafe.language_code || 'en';
        console.log(languageCode)
        setLanguage(languageCode.startsWith('ru') ? 'ru' : 'en');
    }, []);

    const zodiacSigns = zodiacSignsData[language];

    const handleFetchHoroscope = async (sign) => {
        try {
            setIsLoading(true);
            setTimeout(async () => {
                try {
                    const horoscope = await fetchHoroscopeFromAPI(sign.sign, language);
                    setDescription(horoscope);
                    setSelectedSign(sign);
                } catch (error) {
                    setDescription('Ошибка при загрузке описания');
                } finally {
                    setIsLoading(false);
                }
            }, 1000);
        } catch (error) {
            setDescription('Ошибка при загрузке описания');
            setIsLoading(false);
        }
    };

    const handleCloseDescription = () => {
        setDescription('');
        setSelectedSign();
    };

    return (
        <div>
            <button className={styles.languageToggle} onClick={() => toggleLanguage(setLanguage)}>
                {language === 'ru' ? 'Switch to English' : 'Переключить на Русский'}
            </button>

            <div className={styles.zodiacContainer}>
                {zodiacSigns.map((sign, index) => (
                    <ZodiacBlock key={index} sign={sign} onClick={() => handleFetchHoroscope(sign)} />
                ))}
            </div>

            {(isLoading || (description && selectedSign)) && (
                <div>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <Modal
                            description={description}
                            selectedSign={selectedSign}
                            onClose={handleCloseDescription}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default ZodiacPage;