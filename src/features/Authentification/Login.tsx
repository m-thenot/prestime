"use client";

import Button from "@components/Button";
import FormError from "@components/FormError";
import Input from "@components/Input";
import InputPassword from "@components/InputPassword";
import useRedirectToReferrer from "@hooks/useRedirectToReferrer";
import supabase from "@utils/supabase/supabase-browser";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

interface LoginInputs {
  email: string;
  password: string;
}

interface ILoginProps {
  isEmbedded?: boolean;
  onClickSignUp?: () => void;
}

const Login: React.FC<ILoginProps> = ({ isEmbedded, onClickSignUp }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const [areInvalidCredentials, setAreInvalidCredentials] = useState(false);
  const redirectToReferrer = useRedirectToReferrer();
  const { mutate, isLoading } = useMutation(
    async ({ email, password }: LoginInputs) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setAreInvalidCredentials(Boolean(error));

      if (data && !isEmbedded && !error) {
        redirectToReferrer();
      }
    }
  );

  const onSubmit = (inputs: LoginInputs) => {
    mutate(inputs);
  };

  return (
    <form
      className={`items-center flex flex-col ${isEmbedded ? "" : "container"} `}
      onSubmit={handleSubmit(onSubmit)}
    >
      {isEmbedded ? (
        <h2 className="mb-2">Se connecter</h2>
      ) : (
        <h1 className="mb-2">Se connecter</h1>
      )}

      {areInvalidCredentials && (
        <FormError errorMessage="Email ou mot de passe incorrect" />
      )}

      <Input
        label="Email"
        autoComplete="email"
        type="email"
        {...register("email")}
        errors={errors}
      />

      <InputPassword errors={errors} {...register("password")} />

      <Button className="w-full mt-6" type="submit" isLoading={isLoading}>
        Continuer
      </Button>

      <p className="mt-3">
        Vous n&lsquo;avez pas encore de compte ?{" "}
        {isEmbedded ? (
          <Button
            variant="link"
            onClick={onClickSignUp}
            className="font-semibold"
          >
            S&lsquo;inscrire
          </Button>
        ) : (
          <Link href="/sign-up" className="font-semibold">
            S&lsquo;inscrire
          </Link>
        )}
      </p>
    </form>
  );
};

export default Login;
