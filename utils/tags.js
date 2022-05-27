import { supabase } from "./supabase";

export const getTags = async () => {
  try {
    let { data: tags, error } = await supabase
      .from("tags")
      .select("*")
      .order("title", { ascending: true });

    if (error) throw new Error(error.message);

    return tags;
  } catch (error) {
    alert(error.message);
  }
};

export const getTagNameById = async (id) => {
  try {
    let { data: tag, error } = await supabase
      .from("tags")
      .select("title")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

    return tag;
  } catch (error) {
    alert(error.message);
  }
};

export const updateTag = async (tag) => {
  try {
    const { data, error } = await supabase
      .from("tags")
      .update({ title: tag.title })
      .eq("id", tag.id);

    if (error) throw new Error(error.message);
  } catch (error) {
    alert(error.message);
  }
};

export const toggleTag = async (tag) => {
  try {
    const { data, error } = await supabase
      .from("tags")
      .update({ status: !tag.status })
      .eq("id", tag.id);

    if (error) throw new Error(error.message);
  } catch (error) {
    alert(error.message);
  }
};

export const createTag = async (name) => {
  try {
    const { data, error } = await supabase
      .from("tags")
      .insert([{ title: name }]);

    if (error) throw new Error(error.message);
  } catch (error) {
    alert(error.message);
  }
};
