import { useState } from "react";
import supabase from "./supabaseClient.js"; // Corrected import path
import toast from "react-hot-toast";

function SignUp({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      setUser(data.user);
      toast.success(
        "Signed up successfully! Please check your email to confirm your account."
      );
      // Reset the input fields
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form id="sign-up-form" onSubmit={handleSignUp}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
