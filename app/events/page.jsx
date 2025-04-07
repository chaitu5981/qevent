"use client";
import EventCard from "../../components/EventCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const searchParams = useSearchParams();
  const artistName = searchParams.get("artist");
  const tag = searchParams.get("tag");
  let filteredEvents = artistName
    ? events.filter((e) => e?.artist === artistName)
    : events;
  filteredEvents = tag
    ? filteredEvents.filter((e) => e?.tags?.includes(tag))
    : filteredEvents;
  useEffect(() => {
    const fetchEvents = async () => {
      const eventsRes = await fetch(
        "https://qevent-backend.labs.crio.do/events"
      );
      const eventsR = await eventsRes.json();
      setEvents(eventsR);
    };
    fetchEvents();
  }, []);
  return (
    <div className="flex flex-wrap">
      {filteredEvents.map((e, i) => (
        <EventCard eventData={e} key={i}></EventCard>
      ))}
    </div>
  );
};
export default EventsPage;
