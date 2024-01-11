import { googleSignInPopUp, createEcommerceDb } from "../../utils/firebase";
import { useState } from "react";
import { signInUserWithEmailAndPassword } from "../../utils/firebase";
const googleSignIn = async () => {
  const { user } = await googleSignInPopUp();
  const userRef = await createEcommerceDb(user);
  console.log(userRef);
  return;
};
const defaultFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [signInFields, setSignInFields] = useState({ defaultFields });
  const { email, password } = signInFields;
  const handlerChange = (e) => {
    const { name, value } = e.target;
    setSignInFields({ ...signInFields, [name]: value });
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert(`email is mandatory`);
    }
    if (!password) {
      alert(`password is mandatory`);
    }
    try {
      const { user } = await signInUserWithEmailAndPassword(email, password);
      console.log(user);
      setSignInFields(defaultFields);
    } catch (err) {
      console.log(`error occurred`, err.message);
      console.log(err.code);
      if (err.code === `auth/invalid-credential`) {
        alert(`Invalid Authentication`);
      }
    }
  };

  return (
    <>
      <main className="flex flex-col justify-center ">
        <h2 className="text-[22px] font-[800] ">Don't have an account?</h2>
        <span className="text-[16px] font-[500]">
          Sign up with your email and password
        </span>
        <form className="flex flex-col gap-8 my-8" onSubmit={handlerSubmit}>
          <div>
            <label htmlFor="mail" className="font-[500]">
              Email
            </label>
            <br />
            <input
              type="email"
              id="mail"
              name="email"
              value={email}
              onChange={handlerChange}
              className="border-b-2 border-black pr-32 outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-[500]">
              Password
            </label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlerChange}
              className="border-b-2 border-black pr-32 outline-none"
            />
          </div>
          <div className="flex gap-4 text-[14px]">
            <button
              type="submit"
              className="border-2 border-black px-4 py-1 bg-black text-white"
            >
              SIGN IN
            </button>
            <button
              type="submit"
              className="border-2 border-blue-600 px-4 py-1 bg-blue-600 text-white"
              onClick={googleSignIn}
            >
              GOOGLE SIGN IN
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default SignInForm;
