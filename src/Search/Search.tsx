import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Search.css'
import Link from '@mui/material/Link';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { addToActivityFeed } from "../FirestoreHelper/FirestoreHelper";
import MaterialUIModal from "../Modals/MuiModal";

interface Bible {
    verseText: string;
    book: string;
    chapter: number;
    verse: number;
    reference: string
}
const Search = (props: any) => {

    console.log(props)

    const [searchQuery, setSearchQuery] = useState("");
    const [verse, setVerse] = useState<Bible>({
        verseText: '',
        book: '',
        chapter: 0,
        verse: 0,
        reference: ''
    });

    const navigate = useNavigate()
    const isMounted = useRef(true)

    const getVerse = async () => {
        try {
            const response = await fetch(`https://bap-backend.onrender.com/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bible_search: searchQuery }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setVerse({
                    verseText: data.text,
                    book: data.book,
                    chapter: data.chapter,
                    verse: data.verse,
                    reference: data.reference
                });

                await setDoc(doc(db, 'verses', data.reference), {
                    text: data.text,
                    book: data.book,
                    chapter: data.chapter,
                    verse: data.verse
                });

                setVerseLoading(false);
            }
        } catch (error) {
            console.error("An error occurred during the fetch:", error);
            setVerseLoading(false);
        }
    };

    useEffect(() => {
        if (isMounted.current) {
            getVerse();
            isMounted.current = false;
        } else {
            setVerseLoading(false);
        }
    }, []);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        getVerse(); // Now getVerse is accessible within handleFormSubmit
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
    }

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

    const [showModal, setShowModal] = useState(false);
    const [verseLoading, setVerseLoading] = useState(true);

    console.log(verseLoading)

    const handleShare = () => {
        if (verse && Object.keys(verse).length > 0) {
            setShowModal(true);
        } else {
            setVerseLoading(true);
            getVerse();
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    interface AppUser {
        userId: string;
        firstName: string;
        lastName: string;
    }

    const handlePostComment = async (comment: string, commentId?: string) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            const userId = user?.uid
            console.log(userId)
            console.log("userId: ", userId)

            if (userId) {
                console.log(userId)
                try {
                    const userDoc = await getDoc(doc(db, 'newUser', userId));
                    const user = userDoc.data() as AppUser;

                    if (user) {
                        if (verse && Object.keys(verse).length > 0) {
                            addToActivityFeed(verse, user, comment);
                        } else {
                            console.error("Verse Data is not available");
                        }

                        if (commentId) {
                            try {
                                const commentDoc = doc(db, 'activityFeed', commentId);
                                const commentSnapshot = await getDoc(commentDoc);
                                const existingComment = commentSnapshot.data();

                                if (existingComment && user && user.userId === existingComment.user.userId) {

                                    console.log("Comment Updated")
                                } else {
                                    console.log("Unauthorized to update this comment.")
                                }
                            } catch (error) {
                                console.error("error updating comment: ", error)
                            }
                        } else {
                            addToActivityFeed(verse, user, comment)
                        }



                    } else {
                        console.error("User not found");
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            } else {
                console.error("UserId is missing");
            }
        });

        return () => unsubscribe();
    };

    return (
        <>

            <div>
                <Link rel="stylesheet" href="/" >
                    <img src="./src/assets/Emanuel.jpg" alt="Emanuel" id="logo" />
                </Link>
            </div>

            <div className="nav">
                <div>
                    <Link href="/activityFeed" variant="body2" id="feed">
                        {" Activity Feed "}
                    </Link>

                    <Link href="#" variant="body2" id="profile">
                        {" Profile "}
                    </Link>

                    <Link href="#" variant="body2" id="logout" onClick={handleLogout}>
                        {" Logout "}
                    </Link>

                </div>
            </div>

            <div>
                <form onSubmit={handleSubmit} className="searchBar">
                    <label htmlFor="text" className="searchLabel">What verse would you like to search? </label>
                    <input type="text"
                        value={searchQuery}
                        onChange={handleChange}
                        className="searchInput"
                        placeholder="2 timothy 2:3"
                    />
                    <button type="submit" className="searchBtn">Search</button>
                </form>
            </div>

            {verse.verseText &&
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body mx-auto">
                        <h1 className="card-text">{verse.verseText}</h1>
                        <h3 className="card-title">{verse.reference}</h3>
                    </div>

                    <Link href="#" id="shareBtn" onClick={handleShare}>
                        {" Share "}
                    </Link>

                    <MaterialUIModal
                        open={showModal}
                        handleClose={handleCloseModal}
                        handlePostComment={handlePostComment}
                    />

                    <Link href="#" id="saveBtn" onClick={handleClick}>
                        {" Save "}
                    </Link>

                    <Link href="#" id="favoriteBtn" onClick={handleClick}>
                        {" Favorite "}
                    </Link>

                </div>
            }
            <div className="footer">
                <p className="Copy">
                    © GoodSoldier1P1_7, 2023 | Verse Credit: <a href="https://bible-api.com" target="_blank">https://bible-api.com</a>
                </p>
            </div>
        </>
    )
}
export default Search