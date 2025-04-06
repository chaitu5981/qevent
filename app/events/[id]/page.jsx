const EventPage = async ({ params }) => {
  const { id } = params;
  const eventRes = await fetch(
    `https://qevent-backend.labs.crio.do/events/${id}`
  );
  const event = await eventRes.json();

  return (
    <div className="flex flex-col px-20">
      <img
        src={event.image}
        alt="Event Img"
        className="w-[40rem] object-cover mx-auto"
      />
      <div className="text-[#C59455] font-semibold">
        <p className="text-4xl ">{event.name}</p>
        <p>{event.location}</p>
        <p>{event.artist}</p>
      </div>
      <div className="flex gap-4 mt-16 flex-wrap">
        {Array.isArray(event?.tags) &&
          event.tags.length > 0 &&
          event.tags.map((tag, i) => (
            <div className="bg-gradient-to-r from-orange-400 to-teal-600 text-white rounded-2xl w-fit px-3 py-1 text-center font-bold">
              # {tag}
            </div>
          ))}
      </div>
      <p className="mt-4">{event.description}</p>
      <div className="my-4 flex justify-between w-full">
        <p className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-teal-600 bg-clip-text text-transparent">
          $ {event.price}
        </p>
        <button className="bg-red-500 text-white rounded px-4 py-1">
          Buy Tickets
        </button>
      </div>
    </div>
  );
};
export default EventPage;
