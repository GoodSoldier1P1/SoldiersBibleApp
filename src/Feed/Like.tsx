// import { useState } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Props {
    liked: boolean;
    likes: number;
    onLike: () => void;
}

export const Like: React.FC<Props> = ({liked, likes, onLike}) => {

    const handleLike = () => {
        onLike();
    }
    

  return (
    <>
        <button onClick={ handleLike } className="likeBtn">
            { liked ? <FaHeart color='red' /> : <FaRegHeart />}
            <span> { likes } </span>
        </button>
    </>
  )
}