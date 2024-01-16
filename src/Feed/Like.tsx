import { useEffect, useState } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { auth } from "../firebase";

interface Props {
    liked: boolean
    likes: number;
    onLike: (userId: string) => void;
}


export const Like: React.FC<Props> = ({liked, likes, onLike}) => {

    // const [like, setLike] = useState(false);
    const [isLiked, setIsLiked] = useState(liked);
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        setIsLiked(liked);
    }, [liked])

    const handleLike = () => {
        if (userId){
            onLike(userId);
            setIsLiked((prev) => !prev);
        } else {
            console.log("The like didn't work")
        }
    };

    const likesCount = typeof likes === 'object' ? Object.keys(likes).length : likes
    

  return (
    <>
        <button onClick={ handleLike } className="likeBtn">
            { isLiked ? <FaHeart color='red' /> : <FaRegHeart />}
            <span> { likesCount } </span>
        </button>
    </>
  )
}