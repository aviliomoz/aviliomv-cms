import moment from "moment";

import { useEffect, useState } from "react";

// Utils
import { getProjects } from "../../utils/projects";
import { supabase } from "../../utils/supabase";

// Components
import Layout from "../../components/Layout";
import ProjectCard from "../../components/ProjectCard";
import FloatingButton from "../../components/ui/FloatingButton";
import ProjectCreateModal from "../../components/ProjectCreateModal";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const ProjectsPage = () => {
  const [projects, setProjects] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const updateProjectSubscription = supabase
      .from("projects")
      .on("*", () => {
        getProjects().then(setProjects);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(updateProjectSubscription);
    };
  }, []);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  if (!projects)
    return (
      <Layout title={"Proyectos"}>
        <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      </Layout>
    );

  return (
    <Layout title={"Proyectos"}>
      <div className="w-full flex flex-col">
        {projects
          .sort(
            (a, b) =>
              Number(moment(b.year, "YYYY")) -
              Number(moment(a.year, "YYYY"))
          )
          .map((project) => {
            return <ProjectCard key={project.id} project={project} />;
          })}
      </div>
      <FloatingButton
        title={"Nuevo proyecto"}
        openModal={() => setModal(true)}
      />
      {modal && (
        <ProjectCreateModal
          title={"Nuevo proyecto"}
          closeModal={() => setModal(false)}
        />
      )}
    </Layout>
  );
};

export default ProjectsPage;
