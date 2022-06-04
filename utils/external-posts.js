import { supabase } from "./supabase";

export const getExternalPosts = async () => {
  try {
    let { data: external_posts, error } = await supabase
      .from("external_posts")
      .select("*");

    if (error) throw new Error(error.message);

    return external_posts;
  } catch (error) {
    alert(error.message);
  }
};

export const updateExternalPost = async (newPost) => {
  try {
    const { data, error } = await supabase
      .from("external_posts")
      .update({ ...newPost })
      .eq("id", newPost.id);

    if (error) throw new Error(error.message);
  } catch (error) {
    alert(error.message);
  }
};

export const createExternalPost = async (newPost) => {
  try {
    const { data, error } = await supabase
      .from("external_posts")
      .insert([newPost]);

    if (error) throw new Error(error.message);
  } catch (error) {
    alert(error.message);
  }
};
