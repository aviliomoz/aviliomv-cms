import { supabase } from "./supabase";
import matter from "gray-matter";
import { filenameValidator } from "./validators";

export const getPosts = async () => {
  try {
    const { data: posts, error } = await supabase.storage.from("posts").list();

    return posts;
  } catch (error) {
    alert(error);
  }
};

export const getPostURL = (post) => {
  const { publicURL, error } = supabase.storage
    .from("posts")
    .getPublicUrl(post);

  return publicURL;
};

export const getPostData = async (postName) => {
  try {
    const { data, error } = await supabase.storage
      .from("posts")
      .download(postName);

    if (error) throw new Error(error.message);

    const markdown = await data.text();

    const { content, data: metadata } = matter(markdown);

    return { content, metadata };
  } catch (error) {
    alert(error.message);
  }
};

export const createPost = async (content, metadata) => {
  try {
    if (!filenameValidator(metadata.slug).validated)
      throw new Error(filenameValidator(metadata.slug).message);

    const { data, error } = await supabase.storage
      .from("posts")
      .upload(metadata.slug + ".md", matter.stringify(content, metadata));

    if (error) throw new Error(error);

    return data;
  } catch (error) {
    alert(error);
  }
};

export const togglePostStatus = async (post, newData) => {
  try {
    const { data, error } = await supabase.storage
      .from("posts")
      .update(post.name, newData);

    if (error) throw new Error(error.message);
  } catch (error) {
    alert(error.message);
  }
};

export const updatePost = async (post) => {
  // {name: String, data: {}, content: String}

  try {
    if (!post.name) return;

    const { data, error } = await supabase.storage
      .from("posts")
      .update(post.name, matter.stringify(post.content, post.data));

    if (error) throw new Error(error.message);
  } catch (error) {
    alert(error.message);
  }
};
