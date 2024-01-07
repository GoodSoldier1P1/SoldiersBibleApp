import React, { useEffect, useState } from 'react'
import { collection, orderBy, query, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import "./Feed.css"
import { Link } from '@mui/material';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import MaterialUIModal from '../Modals/MuiModal';

interface FeedEntry {
    user: {
        userId: string;
        firstName: string;
        lastName: string;
    };
    verseData: {
        verseText: string;
        book: string;
        chapter: number;
        verse: number;
        reference: string;
    };
    comment: string;
    timestamp: {
        toDate: () => Date;
    };
}


const Feed = () => {
    const [feedData, setFeedData] = useState<FeedEntry[]>([]);
    const [visiblePosts, setVisiblePosts] = useState(5); // number of initially shown posts
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFeedData = async () => {
            const q = query(collection(db, 'activityFeed'), orderBy('timestamp', 'desc'));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const data: FeedEntry[] = [];
                querySnapshot.forEach((doc) => {
                    data.push(doc.data() as FeedEntry);
                });
                setFeedData(data);
                setLoading(false);
            });

            return unsubscribe;
        };

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            console.log("Auth state changed: ", user);
        });

        fetchFeedData();

        return () => unsubscribeAuth();
    }, []);

    const loadMore = () => {
        setLoading(true);
        setVisiblePosts((prev) => prev + 5); // increase number of visible posts
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const navigate = useNavigate()

    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
        signOut(auth)
            .then(() => {
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`${errorCode}: ${errorMessage}`)
            })
    }

    const [openModal, setOpenModal] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<FeedEntry | null>(null);

    const handleUpdate = (entry: FeedEntry) => {
        console.log("Update clicked for entry: ", entry)
        setSelectedEntry(entry);
        setOpenModal(true);
    }

    const handleDelete = async (entry: FeedEntry) => {
        try {
            if (auth.currentUser && auth.currentUser.uid === entry.user.userId) {
                await deleteDoc(doc(db, 'activityFeed', entry.comment));
                console.log("Comment Deleted")
            } else {
                console.log("Unauthorized to delete this entry.");
            }
        } catch (error) {
            console.error("Error deleting entry: ", error)
        }
    }

    return (
        <>

            <div>
                <Link rel="stylesheet" href="/" >
                    <img src="./src/assets/Emanuel.jpg" alt="Emanuel" id="logo" />
                </Link>
            </div>
            <div className="nav">
                <div>
                    <Link href="/search" variant="body2" id="searchBtn">
                        {' Search '}
                    </Link>

                    <Link href="#" variant="body2" id="profile">
                        {' Profile '}
                    </Link>

                    <Link href="#" variant="body2" id="logout" onClick={handleLogout}>
                        {' Logout '}
                    </Link>
                </div>
            </div>
            <div className="feedMargin">
                <h2 className="feedInfo">Activity Feed</h2>
                <ul>
                    {feedData.slice(0, visiblePosts).map((entry, index) => (
                        <li key={index} className="feedItem">
                            <p className="feedComment">{entry.user.firstName}: {entry.comment}</p>
                            <p className="verseInfo">{entry.verseData.verseText}</p>
                            <p className="verseInfo">{entry.verseData.reference}</p>
                            <p className="timestamp">{entry.timestamp.toDate().toLocaleString()}</p>

                            {auth.currentUser && auth.currentUser.uid === entry.user.userId && (
                                <>
                                    <button onClick={() => handleUpdate(entry)} className='updateBtn'>Update</button>
                                    <button onClick={() => handleDelete(entry)} className='deleteBtn'>Delete</button>
                                </>
                            )}

                            <hr />
                        </li>
                    ))}
                </ul>
                {loading && <button className='loading' onClick={scrollToTop}>
                    Back to Top
                </button>}
                {visiblePosts < feedData.length && (
                    <button onClick={loadMore} disabled={loading} className='loadBtn'>
                        Show More
                    </button>
                )}
            </div>

            {openModal && (
                <MaterialUIModal
                    open={openModal}
                    handleClose={() => setOpenModal(false)}
                    handlePostComment={async (comment) => {
                        if (selectedEntry) {
                            // insert update logic
                            const userId = selectedEntry.comment
                            const userComment = doc(db, 'activityFeed', userId)
                            await updateDoc(userComment, {
                                comment: comment // fix to update var
                            })

                            const updatedEntry = { ...selectedEntry, comment }
                            handleUpdate(updatedEntry)
                        }
                        setOpenModal(false)
                    }}
                    initialComment={selectedEntry?.comment || ''}
                />
            )}
        </>
    )
}
export default Feed