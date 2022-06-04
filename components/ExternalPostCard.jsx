import { useAutosave } from "../hooks/useAutosave";
import { updateExternalPost } from "../utils/external-posts";

const ExternalPostCard = ({ post }) => {
  const { data, setData, updated } = useAutosave(post, updateExternalPost);

  return (
    <div className="relative w-full flex flex-col border-[1px] p-2 rounded-md border-black shadow-md mb-4">
      <label className="font-semibold flex items-center">
        Título:{" "}
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="ml-2 w-full p-1 outline-none"
        />
      </label>
      <label className="font-semibold flex items-center">
        Enlace:{" "}
        <input
          type="text"
          name="url"
          value={data.url}
          onChange={(e) => setData({ ...data, url: e.target.value })}
          className="ml-2 w-full p-1 outline-none"
        />
      </label>
      <label className="font-semibold flex items-center">
        Fecha:{" "}
        <input
          type="text"
          name="date"
          value={data.date}
          onChange={(e) => setData({ ...data, date: e.target.value })}
          className="ml-2 w-full p-1 outline-none"
        />
      </label>
      <label className="font-semibold flex items-center">
        Estado:{" "}
        <input
          type="checkbox"
          name="status"
          checked={data.status}
          onChange={(e) => setData({ ...data, status: e.target.checked })}
          className="ml-2 p-1"
        />
        <span className="font-normal ml-2">
          {data.status ? "Activo" : "Oculto"}
        </span>
      </label>
      <span className="absolute top-2 right-2">{updated ? "✔" : ""}</span>
    </div>
  );
};

export default ExternalPostCard;
