import axios from 'axios';

const API_URL = 'https://poker247tech.ru/get_horoscope/';

export const fetchHoroscope = async (sign, language) => {
    const requestBody = { sign, language: language === 'ru' ? 'original' : 'translated' };

    try {
        const response = await axios.post(API_URL, requestBody);
        return response.data.horoscope || 'No description';
    } catch (error) {
        throw new Error('Error getting description.');
    }
};
