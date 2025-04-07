import Tag from "../../components/Tag";

const TagsPage = async () => {
  const tagsRes = await fetch("https://qevent-backend.labs.crio.do/tags");
  const tags = await tagsRes.json();
  return (
    <div className="flex justify-center gap-4 flex-wrap mx-24 mt-24">
      {tags.map((tag) => (
        <Tag text={tag.name} key={tag.id} />
      ))}
    </div>
  );
};
export default TagsPage;
