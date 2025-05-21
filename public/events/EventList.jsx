import EventCard from './EventCard';

const EventList = ({ events }) => {
  if (events.length === 0) return <p>No events to display.</p>;

  return (
    <div className="grid gap-4">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
