import { SignInButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import React from "react";

const SignIn = () => {
  return (
    <SignInButton>
      <button>
        <User className="w-5 h-5 hover:text-accent-pink hoverEffect hover:cursor-pointer" />
      </button>
    </SignInButton>
  );
};

export default SignIn;
