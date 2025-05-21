import { useState, useEffect } from 'react';
import EventList from './EventList';
import { getLatestEvents, getUpdatedEvents, getprogramEvents, getCarouselEvents, getgalleryEvents, getnewBooksEvents, getbooktitle, gethomenews } from '../../api/eventsApi';

const EventTabs = () => {
  const [activeTab, setActiveTab] = useState('latest');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      let response;
      if (activeTab === 'latest') {
        response = await getLatestEvents();
      }else if (activeTab === 'updated') {
        response = await getUpdatedEvents();
      }else if (activeTab === 'carousel') {
        response = await getCarouselEvents();
      }else if (activeTab === 'gallery') {
        response = await getgalleryEvents();
      }else if (activeTab === 'program') {
        response = await getprogramEvents();
      }else if (activeTab === 'newbook') {
        response = await getnewBooksEvents();
      }else if (activeTab === 'booktitle') {
        response = await getbooktitle();
      }else if (activeTab === 'homeslider') {
        response = await gethomenews();
      }
      setEvents(response.data);
    };

    fetchEvents();
  }, [activeTab]);

  return (
    <div>
      <div className="flex gap-4 border-b mb-4">
        <button onClick={() => setActiveTab('carousel')} className={activeTab === 'carousel' ? 'font-bold' : ''}>Carousel Events</button>
        <button onClick={() => setActiveTab('homeslider')} className={activeTab === 'homeslider' ? 'font-bold' : ''}>HomeSlider</button>
        <button onClick={() => setActiveTab('latest')} className={activeTab === 'latest' ? 'font-bold' : ''}>Latest News</button>
        <button onClick={() => setActiveTab('updated')} className={activeTab === 'updated' ? 'font-bold' : ''}>Updated News</button>
        <button onClick={() => setActiveTab('gallery')} className={activeTab === 'gallery' ? 'font-bold' : ''}>Gallery</button>
        <button onClick={() => setActiveTab('newbook')} className={activeTab === 'newbook' ? 'font-bold' : ''}>NewBooks</button>
        <button onClick={() => setActiveTab('booktitle')} className={activeTab === 'booktitle' ? 'font-bold' : ''}>BookTitle</button>
        <button onClick={() => setActiveTab('program')} className={activeTab === 'program' ? 'font-bold' : ''}>ALL Events</button>
      </div>
      <EventList events={events} />
    </div>
  );
};

export default EventTabs;
