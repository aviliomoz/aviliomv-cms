import { supabase } from "./supabase";
import { filenameValidator } from "./validators";

export const getPosts = async () => {
  try {
    const { data: posts, error } = await supabase.from("posts").select();

    return posts;
  } catch (error) {
    alert(error);
  }
};

export const getPostByID = async (id) => {
  try {
    const { data: post, error } = await supabase
      .from("posts")
      .select()
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

    return post;
  } catch (error) {
    alert(error.message);
  }
};

export const createPost = async (post) => {
  try {
    if (!filenameValidator(post.slug).validated)
      throw new Error(filenameValidator(post.slug).message);

    const { data, error } = await supabase.from("posts").insert([post]);

    if (error) throw new Error(error);

    return data;
  } catch (error) {
    alert(error);
  }
};

export const togglePostStatus = async (id, newStatus) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .update({ status: newStatus })
      .match({ id: id });

    if (error) throw new Error(error.message);
  } catch (error) {
    alert(error.message);
  }
};

export const updatePost = async (newPost) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .update({ ...newPost })
      .match({ id: newPost.id });

    if (error) throw new Error(error.message);
  } catch (error) {
    alert(error.message);
  }
};
