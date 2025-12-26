import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('Erreur API:', error.response.status, error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error('Aucune réponse du backend');
      return Promise.reject({ message: 'Backend non accessible' });
    } else {
      console.error('Erreur lors de la requête', error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

export default API;
