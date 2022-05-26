import Image from "next/image";
import { getImageURL } from "./images";

export const ReactMarkdownConfig = {
  a: (a) => (
    <a
      target="_blank"
      rel="noreferrer"
      style={{ color: "#0093AB" }}
      href={a.href}
    >
      <abbr title={a.title}>{a.children}</abbr>
    </a>
  ),
  // p: "div",
  img: (image) => {
    return (
      <picture
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "50px 0px",
        }}
      >
        <Image
          height="400"
          width="600"
          src={getImageURL(image.src)}
          alt={image.src}
        />
      </picture>
    );
  },
};
