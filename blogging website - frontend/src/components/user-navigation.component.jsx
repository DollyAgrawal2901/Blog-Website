import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../App"

export default function UserNavigationPanel() {

    const { userAuth : {username}, setUserAuth} = useContext(UserContext)

    const signOutUser = () => {
        removeFromSession("user")
        setUserAuth ({ access_token: null})
    }

  return (
    <>
    <div>
        <Link to="/editor">
        <i className="fi fi-rr-file-edit" ></i>
        <p>Write</p>
        </Link>

        <Link to={`/user/${username}`}>Profile</Link>

        <Link to="/dashboard/blogs">Dashboard</Link>

        <Link to="/settings/edit-profile">Settings</Link>

        <span className="absolute border-t">

        </span>

        <button onClick={signOutUser}>
            <h1>Sign Out</h1>
            <p>@{username}</p>
        </button>
    </div>

    </>
  )
}
