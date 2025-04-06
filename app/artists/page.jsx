import ArtistCard from "@/components/ArtistCard";

const ArtistPage = async () => {
  const artistsRes = await fetch("https://qevent-backend.labs.crio.do/artists");
  const artists = await artistsRes.json();
  return (
    <div className="flex flex-wrap justify-between">
      {artists.map((artist, i) => (
        <ArtistCard artistData={artist} key={artist.id} />
      ))}
    </div>
  );
};
export default ArtistPage;
