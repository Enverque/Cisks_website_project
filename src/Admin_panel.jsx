import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Admin_panel.css';

const Admin_panel = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: '',
    category: 'latest',
    image: null
  });
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await axios.get('https://cisksbackend1-0.onrender.com/api/verify-admin', { 
          withCredentials: true 
        });
        if (!res.data.valid) navigate('/login');
      } catch (error) {
        navigate('/login');
      }
    };
    verifyAdmin();
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [formData.category]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`https://cisksbackend1-0.onrender.com/api/${formData.category}-events`);
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      toast.error("Failed to fetch events");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, date, category, image } = formData;

    if (['carousel', 'gallery', 'newbook'].includes(category)) {
      if (!image || !date) {
        toast.error("Image and date are required");
        return;
      }    
    } 
    else if (['homeslider', 'booktitle'].includes(category)) {
      if (!title) {
        toast.error("Title is required");
        return;
      }    
    } 
    else {
      if (!title || !content || !date) {
        toast.error("All fields are required");
        return;
      }
    }

    try {
      const form = new FormData();
      form.append('title', title);
      form.append('content', content);
      form.append('category', category);
      form.append('date', date);
      if (image) form.append('image', image);

      const res = await axios.post('https://cisksbackend1-0.onrender.com/api/events', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

       if (res.data.success) {
      toast.success("Event created successfully!");
      console.log("Image URL:", res.data.imageUrl); // Verify URL
      setFormData({ 
        title: '', 
        content: '', 
        date: '', 
        category: 'latest', 
        image: null 
      });
      fetchEvents(); // Refresh the list
    }
  } catch (err) {
    toast.error("Upload failed: " + err.message);
    console.error("Full error:", err.response?.data || err.message);
  }
};


  const handleDelete = async (id) => {
    toast.success("Event deleted Successfully!");
    try {
      await axios.delete(`https://cisksbackend1-0.onrender.com/api/events/${id}`, { 
        withCredentials: true }
      );
      toast.success("Event deleted successfully!");
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
      toast.error("Failed to delete event");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto admin-container">
      <h2 className="text-2xl font-bold mb-6">Event Management</h2>

      <form onSubmit={handleSubmit} className="event-form">
        <div className="space-y-4">
          {/* Title Field */}
          {!(["carousel", "gallery", "newbook"].includes(formData.category)) && (
            <input
              type="text"
              placeholder="Event Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded"
            />
          )}

        
          {!["carousel", "gallery", "newbook", "homeslider", "booktitle"].includes(formData.category) && (
            <textarea
              placeholder="Event Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-2 border rounded h-32"
            />
          )}

         
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-2 border rounded"
            />

     
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="carousel">Carousel Events</option>
            <option value="homeslider">Home Slider</option>
            <option value="latest">Latest News</option>
            <option value="updated">Updated News</option>
            <option value="gallery">Gallery</option>
            <option value="newbook">New Books</option>
            <option value="booktitle">Book Title</option>
            <option value="program">ALL Events</option>
          </select>
          
          {/* Image Upload */}
          {!["homeslider", "booktitle"].includes(formData.category) && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              className="w-full p-2 border rounded"
            />
          )}

     
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Create Event
          </button>
        </div>
      </form>

    
      <div className="space-y-4 content_section">
        <h3 className="text-xl font-semibold mb-4">
          {formData.category.charAt(0).toUpperCase() + formData.category.slice(1)} Events
        </h3>

        {events.length === 0 ? (
          <p className="text-gray-500">No events found in this category.</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="border p-4 rounded-lg bg-white shadow-sm">
              <div className="event-card-content">
                <h6 className="font-bold text-lg mb-2">{event.title}</h6>

                {event.imagePath && (
                  <img
                    src={event.imagePath}
                    alt={event.title}
                    className="event-image"
                  />
                )}

                <p className="event-description">{event.content}</p>

                <div className="event-footer">
                  <p className="event-meta">
                    {new Date(event.date).toLocaleDateString()} - {event.category}
                  </p>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin_panel;
