import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

const AuthEmbedded: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <Login isEmbedded onClickSignUp={() => setIsLogin(false)} />
  ) : (
    <SignUp isEmbedded onClickLogin={() => setIsLogin(true)} />
  );
};

export default AuthEmbedded;
