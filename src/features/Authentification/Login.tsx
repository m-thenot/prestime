"use client";

import Button from "@components/Button";
import Input from "@components/Input";
import supabase from "@utils/supabase/supabase-browser";
import Link from "next/link";
import { useEffect } from "react";

const Login: React.FC = () => {
  const onSubmit = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "example@email.com",
      password: "example-password",
    });

    console.log(data, error);
  };

  return (
    <div className="items-center flex flex-col">
      <h1 className="mb-2">Se connecter</h1>
      <Input label="Email" name="email" autoComplete="email" type="email" />
      <Input
        label="Mot de passe"
        name="password"
        autoComplete="password"
        type="password"
      />

      <Button className="w-full mt-6" onClick={onSubmit}>
        Continuer
      </Button>

      <p className="mt-3">
        Vous n&lsquo;avez pas encore de compte ?{" "}
        <Link href="/sign-up">S&lsquo;inscrire</Link>
      </p>
    </div>
  );
};

export default Login;
