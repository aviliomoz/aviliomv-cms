import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Utils
import { getImageURL } from "../utils/images";
import { getPostData } from "../utils/posts";

// Components
import LoadingSpinner from "./ui/LoadingSpinner";

const PostCard = ({ post }) => {
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({ content: null, metadata: null });

  useEffect(() => {
    getPostData(post.name).then((data) => {
      setPostData(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <></>;

  return (
    <Link href={`/posts/${post.id}`}>
      <a className="relative flex group shadow-md rounded-md p-4 border-[1px] border-black w-full cursor-pointer mb-4 h-[180px]">
        <div className="h-full w-1/5 bg-slate-200 flex justify-center items-center rounded-md overflow-hidden">
          <picture className="relative h-full w-full">
            <LoadingSpinner />
            <Image src={getImageURL(postData.metadata.cover)} layout="fill" />
          </picture>
        </div>
        <div className="h-full w-full px-4">
          <h3 className="font-semibold text-2xl truncate">
            {postData.metadata.title}
          </h3>
          <p>{postData.metadata.description}</p>
          <p>{postData.metadata.slug}</p>
          <p>{postData.metadata.date}</p>
          <p>{postData.metadata.tag}</p>
          {postData.metadata.status ? (
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
