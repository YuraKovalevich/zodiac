import React, { useRef } from 'react';
import styles from "../styles/Zodiac.module.css";
import { handleTouchStart, handleTouchMove } from '../utils/zodiacBtns';

const HoroscopeDescription = ({ description, selectedSign, onClose }) => {
    const touchStartX = useRef(0);

    return (
        <div
            className={styles.horoscopeDescription}
            onTouchStart={(e) => handleTouchStart(e, touchStartX)}
            onTouchMove={(e) => handleTouchMove(e, touchStartX, onClose)}
        >
            <h2>{selectedSign.name}</h2>
            <p>{description}</p>
            <button className={styles.backButton} onClick={onClose}>Назад</button>
        </div>
    );
};

export default HoroscopeDescription;
