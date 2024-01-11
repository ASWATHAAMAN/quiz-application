import { Navbar,SignIn } from "./Components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "",
    element: <Navbar />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
};

export default App;
