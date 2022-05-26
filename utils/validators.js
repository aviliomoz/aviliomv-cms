export const filenameValidator = (name) => {
  const analysis = name.slice(0, name.lastIndexOf(".")).match(/[^a-z_-]/g);

  if (analysis) {
    return {
      validated: false,
      errors: analysis,
      message:
        "El nombre del archivo no puede contener caracteres especiales ni mayúsculas ni números",
    };
  } else {
    return { validated: true, errors: [], message: "Nombre válido" };
  }
};
