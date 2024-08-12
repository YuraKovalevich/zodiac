import React, { useState, useEffect } from 'react';
import styles from '../styles/Modal.module.css';

const Modal = ({ description, selectedSign, onClose }) => {
    const [startX, setStartX] = useState(0);

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX;
        const swipeDistance = endX - startX;

        if (swipeDistance > 100) {
            onClose();
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <h2>{selectedSign.name}</h2>
                <p>{description}</p>
                <button className={styles.closeButton} onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default Modal;
