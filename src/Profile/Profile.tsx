import "./Profile.css"
import { useNavigate } from "react-router-dom";
import { Link } from '@mui/material';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/Emanuel.jpg"
// import { WidthWide } from "@mui/icons-material";


// interface IProfile {
//     userId: string;
//     firstName: string;
//     lastName: string;
//     FavoriteVerse: {
//         verseText: string;
//         book: string;
//         chapter: number;
//         verse: number;
//         reference: string
//     }
// }

const Profile = () => {

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

    const navigate = useNavigate()

    return (
        <>
            <div>
                <Link rel="stylesheet" href="/" >
                    <img src={logo} alt="Emanuel" id="logo" />
                </Link>
            </div>
            <div className="nav">
                <div>
                    <Link href="/search" variant="body2" id="searchBtn">
                        {' Search '}
                    </Link>

                    <Link href="/activityfeed" variant="body2" id="profile">
                        {' Activity Feed '}
                    </Link>

                    <Link href="#" variant="body2" id="logout" onClick={handleLogout}>
                        {' Logout '}
                    </Link>
                </div>
            </div>

            <h1>This Page is Still Under Construction</h1>
        </>
    )
}
export default Profile