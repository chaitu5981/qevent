"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { format, parse } from "date-fns";
const CreateEvent = () => {
  const session = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    time: "",
    tags: [],
    artist: "",
    price: "",
    description: "",
  });
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsRes = await fetch("https://qevent-backend.labs.crio.do/tags");
        const tagsR = await tagsRes.json();
        setTags(tagsR);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTags();
  }, []);
  useEffect(() => {
    if (session.status === "unauthenticated") router.push("/events");
  }, []);
  const handleCheck = (e, tagName) => {
    if (e.target.checked)
      setFormData((prev) => ({ ...prev, tags: [...formData.tags, tagName] }));
    else {
      const prevTags = formData.tags;
      const newTags = prevTags.filter((t) => t !== tagName);
      setFormData((prev) => ({ ...prev, tags: newTags }));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "time") {
      const parsed = parse(value, "HH:mm", new Date());
      const newTime = format(parsed, "hh:mm a");
      setFormData((prev) => ({
        ...prev,
        time: newTime,
      }));
    } else setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleEventCreate = async (e) => {
    e.preventDefault();
    const { name, location, date, time, tags, price, description, artist } =
      formData;
    if (
      !name ||
      !location ||
      !date ||
      !time ||
      !tags ||
      !price ||
      !description ||
      !artist
    )
      return alert("All fields are required");
    if (price < 0) return alert("Price is invalid");
    if (tags.length === 0) return alert("Tags should not be empty");
    const id = uuidV4();
    const random = Math.ceil(Math.random() * 99);
    const image = `https://randomuser.me/api/portraits/men/${random}.jpg`;
    console.log(formData);
    try {
      const { data } = await axios.post(
        "https://qevent-backend.labs.crio.do/eventss",
        { id, ...formData, image }
      );
      if (data) router.push("/events");
    } catch (error) {
      console.log(error);
      alert("Event creation failed");
    }
  };
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center py-8">
      <p className="text-2xl font-semibold">Create Event</p>
      <form
        onSubmit={handleEventCreate}
        className="flex flex-col gap-2 w-[40%]"
      >
        <label>Event Name</label>
        <input
          className="border-2 border-slate-400 rounded p-2"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label>Location</label>
        <input
          className="border-2 border-slate-400 rounded p-2"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <label>Artist Name</label>
        <input
          className="border-2 border-slate-400 rounded p-2"
          type="text"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
        />
        <label>Price</label>
        <input
          className="border-2 border-slate-400 rounded p-2"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          className="border-2 border-slate-400 rounded p-2"
          type="text"
          name="description"
          rows="6"
          value={formData.description}
          onChange={handleChange}
        />
        <label>Date</label>
        <input
          className="border-2 border-slate-400 rounded p-2"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <label>Time</label>
        <input
          className="border-2 border-slate-400 rounded p-2"
          type="time"
          name="time"
          onChange={handleChange}
        />
        <label>Tags</label>
        <div className="flex gap-4 flex-wrap">
          {tags.map((t) => (
            <label className="flex gap-1" key={t.id}>
              <input
                type="checkbox"
                checked={formData.tags.includes(t.name)}
                onChange={(e) => handleCheck(e, t.name)}
              />
              <p>{t.name}</p>
            </label>
          ))}
        </div>
        <button
          type="submit"
          className=" bg-gradient-to-r text-xl from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-70"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};
export default CreateEvent;
