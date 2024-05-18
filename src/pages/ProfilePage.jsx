import { useContext, useState } from "react";
import Header from "../Header";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState();
  let { subpage } = useParams();
  const { ready, user, setUser } = useContext(UserContext);

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }
  if (!ready) {
    return "Loading...";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }
  if (redirect) {
    Navigate("/");
  }

  return (
    <>
      <Header />
      <AccountNav />

      {subpage === "profile" && <div>Na</div>}
      
      <div className="m-4 p-4">
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
