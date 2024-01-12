import { setDoc, serverTimestamp, doc } from "firebase/firestore"
import { db } from "../firebase";

interface VerseData {
    verseText: string;
    book: string;
    chapter: number;
    verse: number;
    reference: string;
}

interface AppUser {
    userId: string;
    firstName: string;
    lastName: string;
}

interface ILiked {
    liked?: number;
}

export const addToActivityFeed = async (verseData: VerseData, user: AppUser, comment: string, likes?:ILiked) => {
    try {

        const defaultLikes = likes?.liked !== undefined ? likes.liked : 0;

        await setDoc(doc(db, 'activityFeed', comment), {
            user: {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            verseData: verseData,
            comment: comment,
            timestamp: serverTimestamp(),
            likes: defaultLikes,
        });
    } catch (error) {
        console.error('Error adding to activity feed: ', error)
    }
}