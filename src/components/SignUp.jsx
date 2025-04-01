import { useState } from "react";
import supabase from "./supabaseClient.js";
import toast from "react-hot-toast";

function SignUp({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      toast.error(authError.message);
      return;
    }

    if (authData?.user) {
      // Insert user data into the profiles table
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: authData.user.id, // Match with auth.uid
          role: "user", // Default role
          email, // Store the user's email
        },
      ]);

      if (profileError) {
        console.error("Error inserting profile:", profileError);
        toast.error("Failed to create user profile.");
      } else {
        toast.success("Signed up successfully!");
        setUser(authData.user); // Set the user in the app state
      }
    }

    // Reset the input fields
    setEmail("");
    setPassword("");
  };

  return (
    <form id="signup-form" onSubmit={handleSignUp}>
      <label htmlFor="email">Email:</label>
      <input
        id="signup-email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        id="signup-password"
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
