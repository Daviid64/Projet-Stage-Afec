import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

API.interceptors.response.use(
    response => response,
    error => {
        // Gestion centralisée des erreurs API
        if (error.response) {
            console.error('Erreur API:', error.response.status, error.response.data);
            return Promise.reject(error.response.data);
        }  else if (error.request) {
            console.error('Aucune réponse recue du backend');
            return Promise.reject({message: 'Backend non accessible'})
        }  else {
            console.error('Erreur lors de la requête', error.message);
            return Promise.reject({message: error.message});
        }
    }
);

export default API;