import React from 'react';
import styles from "../styles/Zodiac.module.css"

const ZodiacBlock = ({sign, onClick}) => {
    return (
        <div className={styles.zodiacBlock} onClick={() => onClick(sign)}>
            <div className={styles.zodiacIcon}>{sign.icon}</div>
            <h3>{sign.name}</h3>
            <p>{sign.dates}</p>
        </div>
    );
};

export default ZodiacBlock;