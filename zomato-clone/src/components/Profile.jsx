import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./Profile.css";

const Profile = () => {
  const user = auth.currentUser;

  return (
    <div className="profile-section">
      <div className="profile-card">
        <div className="profile-avatar">
          {user?.email?.charAt(0).toUpperCase()}
        </div>

        <h3>{user?.displayName || "User"}</h3>
        <p>{user?.email}</p>

        <button onClick={() => signOut(auth)} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
