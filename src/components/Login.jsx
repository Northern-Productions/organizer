import { useState } from "react";
import supabase from "./supabaseClient.js";
import toast from "react-hot-toast";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error(error.message);
    } else {
      setUser(data.user);
      toast.success("Logged in successfully!");
      // Reset the input fields
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form id="login-form" onSubmit={handleLogin}>
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
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
