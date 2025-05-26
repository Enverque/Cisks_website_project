import axios from 'axios';

const baseURL = "https://cisksbackend1-0.onrender.com/api";



// Add withCredentials to all requests
export const getLatestEvents = () => axios.get(`${baseURL}/latest-events`, { withCredentials: true });
export const getUpdatedEvents = () => axios.get(`${baseURL}/updated-events`, { withCredentials: true });
export const getCarouselEvents = () => axios.get(`${baseURL}/carousel-events`, { withCredentials: true });
export const getgalleryEvents = () => axios.get(`${baseURL}/gallery-events`, { withCredentials: true });
export const getprogramEvents = () => axios.get(`${baseURL}/program-events`, { withCredentials: true });
export const getnewBooksEvents = () => axios.get(`${baseURL}/newbook-events`, { withCredentials: true });
export const getbooktitle = () => axios.get(`${baseURL}/booktitle-events`, { withCredentials: true });
export const gethomenews = () => axios.get(`${baseURL}/homeslider-events`, { withCredentials: true });
