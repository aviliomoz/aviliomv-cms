import { useEffect, useState } from "react";

// Utils
import { useAutosave } from "../hooks/useAutosave";
import { toggleTag, updateTag } from "../utils/tags";

const TagCard = ({ tag }) => {
  const { data, setData, updated } = useAutosave(tag, updateTag);
  const [updatedCheck, setUpdatedCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (updated && loading) setUpdatedCheck(true);
    let closeUpdatedCheck = setTimeout(() => {
      setUpdatedCheck(false);
    }, 1000);

    if (!loading) setLoading(true);

    return () => {
      clearTimeout(closeUpdatedCheck);
    };
  }, [updated]);

  return (
    <article className="relative group shadow-md rounded-md p-4 border-[1px] border-black w-[calc((100%-80px)/5)] cursor-pointer mr-4 mb-4">
      <input
        className="font-bold mb-2 focus:outline-none w-full"
        type={"text"}
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />
      <label htmlFor={tag.id}>
        <input
          type={"checkbox"}
          className="mr-2 cursor-pointer"
          id={tag.id}
          checked={tag.status}
          onChange={() => toggleTag(tag)}
        />
        {tag.status ? "Activa" : "Inactiva"}
      </label>
      {updatedCheck && <span className={`absolute right-1 top-1`}>✔</span>}
    </article>
  );
};

export default TagCard;
