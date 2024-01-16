import "./Profile.css"
import { useNavigate } from "react-router-dom";
import { Link } from '@mui/material';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/Emanuel.jpg"


interface AppUser {
    userId: string;
    firstName: string;
    lastName: string;
}

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
        </>
    )
}
export default Profile