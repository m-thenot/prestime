"use client";

import Button from "@components/Button";
import Input from "@components/Input";
import supabase from "@utils/supabase/supabase-browser";
import Link from "next/link";

const SignUp: React.FC = () => {
  const onSubmit = async () => {
    const data = await supabase.auth.signUp({
      email: "example@email.com",
      password: "example-password",
    });

    console.log(data);
  };

  return (
    <div className="items-center flex flex-col">
      <h1 className="mb-2">Créez votre compte</h1>
      <Input label="Prénom" name="firstName" autoComplete="given-name" />
      <Input label="Nom" name="name" autoComplete="family-name" />
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
        Déjà inscrit ? <Link href="/login">Se connecter</Link>
      </p>
    </div>
  );
};

export default SignUp;
