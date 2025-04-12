import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import "./Automail.css";

const Automail = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
      
        const serviceId = 'service_uoeftgp';
        const templateId = 'template_lmdqgdp';
        const publicKey = 'cakWVogeMO-IQMc6y';
      
        const templateParams = {
            from_email: "connecttome20@gmail.com",
            to_name: 'Web Wizard',
            to_email: email, // REPLACE WITH ACTUAL EMAIL
        };
      
        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                console.log('Email sent successfully!', response);
                setName('');
                setEmail('');
                setMessage('');
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className='emailForm'>
            <input
                type="text"
                placeholder="User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='name'
            />
            <input
                type="email"
                placeholder="User Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='username'
            />
            <textarea
                cols="30"
                rows="10"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            ></textarea>
            <button type="submit">Send Email</button>
        </form>
    );
};

export default Automail;