import Navbar from "./Navbar.components";
import SignInForm from "./signInForm/signInForm.component";
import SignUpForm from "./signUpForm/signUpForm.component";
const SignIn = () => {
  return (
    <>
      <main className="flex justify-between items-start w-[85%] mt-[6rem] mx-auto">
        <SignInForm />
        <SignUpForm />
      </main>
    </>
  );
};

export default SignIn;
