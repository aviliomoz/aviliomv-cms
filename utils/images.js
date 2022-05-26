import { supabase } from "./supabase";
import { filenameValidator } from "./validators";

export const getImages = async () => {
  const { data: images, error } = await supabase.storage.from("images").list();

  return images;
};

export const getImageURL = (image) => {
  const { publicURL, error } = supabase.storage
    .from("images")
    .getPublicUrl(image);

  return publicURL;
};

export const updateImageName = async (image) => {
  try {
    if (!filenameValidator(image.newName).validated)
      throw new Error(filenameValidator(image.newName).message);

    const { data, error } = await supabase.storage
      .from("images")
      .move(image.name, image.newName);
  } catch (error) {
    alert(error);
  }
};

export const uploadImage = async (image) => {
  try {
    if (!filenameValidator(image.name).validated)
      throw new Error(filenameValidator(image.name).message);

    const { data, error } = await supabase.storage
      .from("images")
      .upload(image.name, image);

    if (error) throw new Error(error.message);
  } catch (error) {
    alert(error.message);
  }
};

export const deleteImage = async (image) => {
  try {
    const { data, error } = await supabase.storage
      .from("images")
      .remove([image.name]);

    if (error) throw new Error(error.message);
  } catch (error) {
    alert(error.message);
  }
};
