"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export function LoginButton() {
  const { data: session } = useSession();

  const handleLogin = () => {
    session ? signOut() : signIn();
  };

  return (
    <button
    className={`border border-transparent rounded px-4 py-2 transition transform duration-500 ease-in-out ${
      session
        ? "bg-gradient-to-r from-purple-500 to-pink-500 animate-gradient-y hover:scale-105 hover:shadow-2xl shadow-purple-500/50 shadow-lg text-white"
        : "bg-blue-500 hover:bg-blue-700 text-white"
    }`}
    
      onClick={handleLogin}
    >
      {session ? session.user?.name : "Log In"}
    </button>
  );
}
