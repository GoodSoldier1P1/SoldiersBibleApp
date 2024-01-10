import { useEffect, useState, useRef } from "react";
import './Home.css'
import Link from '@mui/material/Link';
// import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import logo from '../assets/Emanuel.jpg'


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
                    <img src={logo} alt="Emanuel" id="logo" />
                </Link>
            </div>

            <div className="soldiersBible">
                <h1>Soldier's Bible App</h1>
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

            <div className="siteInfo">
                <h2>
                    Step into Soldier's Bible App, your haven for discovering, sharing, and preserving Bible verses. Tailored for followers of Christ, this community is a judgment-free space where you can explore, share, and discuss verses with others. <br /><br />

                    Embrace the spirit of sharing! This platform thrives on community engagement, helping individuals reconnect with God through His Word. Ready to get started? Sign up, log in, and kick off your exploration! <br /><br />

                    Uncertain where to begin? Look no further than the random verse at the top of the page. Let it guide you, and if it's not precisely what you're seeking, a quick page refresh will present a new verse.
                </h2>
            </div>

            <div className="footer">
                <p className="Copy">
                    © GoodSoldier1P1_7, 2023 | Verse Credit: <a href="https://bible-api.com" target="_blank">https://bible-api.com</a>
                </p>
            </div>

        </>
    )
}
export default Home