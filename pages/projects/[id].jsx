import { useRouter } from "next/router";
import { useEffect } from "react";

// Utils
import { useAutosave } from "../../hooks/useAutosave";
import { updateProject } from "../../utils/projects";
import { getProjectByID } from "../../utils/projects";

// Components
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const ProjectEditor = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, setData, updated, setInitialData } = useAutosave(
    null,
    updateProject
  );

  useEffect(() => {
    if (id) {
      getProjectByID(id).then(setInitialData);
    }
  }, [id]);

  if (!data || !id)
    return (
      <Layout title={"Proyectos > Editor"}>
        <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      </Layout>
    );

  return (
    <Layout title={"Proyectos > Editor"}>
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
          Participación:{" "}
          <input
            type="text"
            name="participation"
            value={data.participation}
            onChange={(e) =>
              setData({ ...data, participation: e.target.value })
            }
            className="ml-2 w-full p-1 outline-none"
          />
        </label>
        <label className="font-semibold flex items-center">
          Tipo:{" "}
          <input
            type="text"
            name="type"
            value={data.type}
            onChange={(e) => setData({ ...data, type: e.target.value })}
            className="ml-2 w-full p-1 outline-none"
          />
        </label>
        <label className="font-semibold flex items-center">
          Nivel:{" "}
          <input
            type="text"
            name="level"
            value={data.level}
            onChange={(e) => setData({ ...data, level: e.target.value })}
            className="ml-2 w-full p-1 outline-none"
          />
        </label>
        <label className="font-semibold flex items-center">
          Area:{" "}
          <input
            type="text"
            name="area"
            value={data.area}
            onChange={(e) => setData({ ...data, area: e.target.value })}
            className="ml-2 w-full p-1 outline-none"
          />
        </label>
        <label className="font-semibold flex items-center">
          Autor:{" "}
          <input
            type="text"
            name="author"
            value={data.author}
            onChange={(e) => setData({ ...data, author: e.target.value })}
            className="ml-2 w-full p-1 outline-none"
          />
        </label>
        <label className="font-semibold flex items-center">
          Año:{" "}
          <input
            type="text"
            name="year"
            value={data.year}
            onChange={(e) => setData({ ...data, year: e.target.value })}
            className="ml-2 w-full p-1 outline-none"
          />
        </label>
        <label className="font-semibold flex items-center">
          <span className="min-w-max">Centro de estudios:</span>{" "}
          <input
            type="text"
            name="study_center"
            value={data.study_center}
            onChange={(e) => setData({ ...data, study_center: e.target.value })}
            className="ml-2 w-full p-1 outline-none"
          />
        </label>
        <label className="font-semibold flex items-center">
          Observación:{" "}
          <input
            type="text"
            name="observation"
            value={data.observation}
            onChange={(e) => setData({ ...data, observation: e.target.value })}
            className="ml-2 w-full p-1 outline-none"
          />
        </label>
        <label className="font-semibold flex items-center">
          Enlace:{" "}
          <input
            type="text"
            name="link"
            value={data.link}
            onChange={(e) => setData({ ...data, link: e.target.value })}
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
    </Layout>
  );
};

export default ProjectEditor;
