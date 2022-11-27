"use client";

import Button from "@components/Button";
import Input from "@components/Input";
import InputPassword from "@components/InputPassword";
import supabase from "@utils/supabase/supabase-browser";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface LoginInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit = async ({ email, password }: LoginInputs) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log(data, error);
  };

  return (
    <form
      className="items-center flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-2">Se connecter</h1>
      <Input
        label="Email"
        autoComplete="email"
        type="email"
        {...register("email")}
        errors={errors}
      />

      <InputPassword errors={errors} {...register("password")} />

      <Button className="w-full mt-6" type="submit">
        Continuer
      </Button>

      <p className="mt-3">
        Vous n&lsquo;avez pas encore de compte ?{" "}
        <Link href="/sign-up">S&lsquo;inscrire</Link>
      </p>
    </form>
  );
};

export default Login;
