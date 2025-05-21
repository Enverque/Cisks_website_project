const EventCard = ({ event }) => (
    <div className="border p-4 rounded shadow">
      <h3 className="text-xl font-bold">{event.title}</h3>
      <p>{event.description}</p>
      <span className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
    </div>
  );
  
  export default EventCard;
  