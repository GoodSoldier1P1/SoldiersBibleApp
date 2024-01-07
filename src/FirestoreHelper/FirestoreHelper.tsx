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

export const addToActivityFeed = async (verseData: VerseData, user: AppUser, comment: string) => {
    try {
        await setDoc(doc(db, 'activityFeed', comment), {
            user: {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            verseData: verseData,
            comment: comment,
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error adding to activity feed: ', error)
    }
}