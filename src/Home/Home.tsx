import { useEffect, useState, useRef } from "react";
import './Home.css'
import Link from '@mui/material/Link';
// import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";


interface Bible {
    verseText: string;
    book: string;
    chapter: number;
    verse: number;
    reference: string;
}

const Home = () => {
    const [verse, setVerse] = useState<Bible>({
        verseText: '',
        book: '',
        chapter: 0,
        verse: 0,
        reference: ''
    });

    // const navigate = useNavigate()

    const isMounted = useRef(true);

    useEffect(() => {
        if (isMounted.current) {
            const getVerse = async () => {
                try {
                    const response = await fetch(`https://bap-backend.onrender.com`);
                    if (response.ok) {
                        const data = await response.json();
                        setVerse({
                            verseText: data.randomVerseText,
                            book: data.RandomBook,
                            chapter: data.RandomChapter,
                            verse: data.randomVerse,
                            reference: data.reference
                        });
                        await setDoc(doc(db, 'verses', data.reference), {
                            text: data.randomVerseText,
                            book: data.RandomBook,
                            chapter: data.RandomChapter,
                            verse: data.randomVerse
                        });
                    }
                } catch (error) {
                    console.error("An error occurred during the fetch:", error);
                }
            };

            getVerse();
            isMounted.current = false; // Set isMounted to false after the initial run.
        }
    }, []); // Empty dependency array means the effect runs only once.


    return (
        <>
            <div>
                <Link rel="stylesheet" href="/" >
                    <img src="./src/assets/Emanuel.jpg" alt="Emanuel" id="logo" />
                </Link>
            </div>

            <div className="nav">
                <div>
                    <Link href="/login" id="login">
                        {" Login "}
                    </Link>

                    <Link href="/signup" id="signup">
                        {" Signup"}
                    </Link>
                </div>
            </div>

            {verse.verseText &&
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body mx-auto">
                        <h1 className="card-text">{verse.verseText}</h1>
                        <h3 className="card-title">{verse.reference}</h3>
                    </div>
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
export default Home