import Link from "next/link";

const ProjectCard = ({ project }) => {
  return (
    <Link href={`/projects/${project.id}`}>
      <a className="relative flex flex-col shadow-md rounded-md p-4 border-[1px] border-black w-full cursor-pointer mb-4 h-[120px]">
        <h3 className="font-semibold text-xl truncate">{project.title}</h3>
        <p>Tipo: {project.type}</p>
        {project.status ? (
          <span className="bg-green-300 text-green-900 px-2 py-[2px] text-sm font-medium rounded-md absolute bottom-4 right-4">
            Activo
          </span>
        ) : (
          <span className="bg-red-300 text-red-900 px-2 py-[2px] text-sm font-medium rounded-md absolute bottom-4 right-4">
            Oculto
          </span>
        )}
      </a>
    </Link>
  );
};

export default ProjectCard;
