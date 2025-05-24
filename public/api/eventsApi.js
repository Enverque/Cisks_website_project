import axios from 'axios';

// const baseURL = "https://cisksbackend1-0.onrender.com/api";



// Add withCredentials to all requests
export const getLatestEvents = () => axios.get(`https://cisksbackend1-0.onrender.com/api/latest-events`, { withCredentials: true });
export const getUpdatedEvents = () => axios.get(`https://cisksbackend1-0.onrender.com/api/updated-events`, { withCredentials: true });
export const getCarouselEvents = () => axios.get(`https://cisksbackend1-0.onrender.com/api/carousel-events`, { withCredentials: true });
export const getgalleryEvents = () => axios.get(`https://cisksbackend1-0.onrender.com/api/gallery-events`, { withCredentials: true });
export const getprogramEvents = () => axios.get(`https://cisksbackend1-0.onrender.com/api/program-events`, { withCredentials: true });
export const getnewBooksEvents = () => axios.get(`https://cisksbackend1-0.onrender.com/api/newbook-events`, { withCredentials: true });
export const getbooktitle = () => axios.get(`https://cisksbackend1-0.onrender.com/api/booktitle-events`, { withCredentials: true });
export const gethomenews = () => axios.get(`https://cisksbackend1-0.onrender.com/api/homeslider-events`, { withCredentials: true });
