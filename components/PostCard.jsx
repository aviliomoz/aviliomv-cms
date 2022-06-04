import Image from "next/image";
import Link from "next/link";

// Utils
import { getImageURL } from "../utils/images";

// Components
import LoadingSpinner from "./ui/LoadingSpinner";

const PostCard = ({ post }) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <a className="relative flex group shadow-md rounded-md p-4 border-[1px] border-black w-full cursor-pointer mb-4 h-[180px]">
        <div className="h-full w-1/5 bg-slate-200 flex justify-center items-center rounded-md overflow-hidden">
          <picture className="relative h-full w-full">
            <LoadingSpinner />
            <Image
              src={getImageURL(post.cover)}
              layout="fill"
              alt={post.cover}
            />
          </picture>
        </div>
        <div className="h-full w-full px-4">
          <h3 className="font-semibold text-2xl truncate">{post.title}</h3>
          <p>{post.description}</p>
          <p>{post.slug}</p>
          <p>{post.date}</p>
          {post.status ? (
            <span className="bg-green-300 text-green-900 px-2 py-[2px] text-sm font-medium rounded-md absolute bottom-4 right-4">
              Activo
            </span>
          ) : (
            <span className="bg-red-300 text-red-900 px-2 py-[2px] text-sm font-medium rounded-md absolute bottom-4 right-4">
              Oculto
            </span>
          )}
        </div>
      </a>
    </Link>
  );
};

export default PostCard;
