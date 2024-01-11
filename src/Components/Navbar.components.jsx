import { useUserGlobalContext } from "../context/user.context";
import { userSignOut } from "../utils/firebase";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const { currentUser } = useUserGlobalContext();
  const signOutHandler = async () => {
    const res = await userSignOut();
  };
  return (
    <main>
      <div className="flex justify-between items-center mx-[2rem] my-[1rem]">
        <h1 className="text-[26px] font-[700]">QUIZ APP</h1>
        {currentUser ? (
          <span onClick={signOutHandler} className="cursor-pointer ">
            Sign Out
          </span>
        ) : (
          <div className="flex items-center gap-2 cursor-pointer hover:border-2 hover:border-blue-400 px-[10px] py-[0.25rem] rounded-lg  hover:text-white hover:bg-blue-400">
            <NavLink
              to="/signIn"
              className={({ isActive }) =>
                isActive ? "text-red-600" : "text-blue-600  hover:text-white"
              }
            >
              Sign In
            </NavLink>
          </div>
         )} 
      </div>
      <div className="flex justify-center items-center h-screen w-[100%]">
        <button
          type="button"
          className="border-2 px-[1.5rem] py-[0.25rem] rounded-lg border-green-700 bg-green-700 text-white text-[18px] font-[700] font-serif hover:bg-green-500 hover:border-green-500"
        >
          START
        </button>
      </div>
    </main>
  );
};

export default Navbar;
