import { supabase } from "./supabase";

export const getProjects = async () => {
  try {
    const { data: projects, error } = await supabase.from("projects").select();

    return projects;
  } catch (error) {
    alert(error);
  }
};

export const getProjectByID = async (id) => {
  try {
    const { data: project, error } = await supabase
      .from("projects")
      .select()
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

    return project;
  } catch (error) {
    alert(error.message);
  }
};

export const createProject = async (project) => {
  try {
    const { data, error } = await supabase.from("projects").insert([project]);

    if (error) throw new Error(error);
  } catch (error) {
    alert(error);
  }
};

export const updateProject = async (newProject) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .update({ ...newProject })
      .match({ id: newProject.id });

    if (error) throw new Error(error.message);
  } catch (error) {
    alert(error.message);
  }
};
