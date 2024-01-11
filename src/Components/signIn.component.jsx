import SignInForm from "../Components";
import SignUpForm from "../Components";
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
