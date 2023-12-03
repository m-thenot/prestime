"use client";

import Button from "@components/Button";
import FormError from "@components/FormError";
import Input from "@components/Input";
import InputPassword from "@components/InputPassword";
import InputPhoneNumber from "@components/InputPhoneNumber";
import useRedirectToReferrer from "@hooks/useRedirectToReferrer";
import supabase from "@utils/supabase/supabase-browser";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

interface LoginInputs {
  email: string;
  password: string;
  phoneNumber: string;
}

interface ILoginProps {
  isEmbedded?: boolean;
  onClickSignUp?: () => void;
}

const Login: React.FC<ILoginProps> = ({ isEmbedded, onClickSignUp }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginInputs>();
  const [areInvalidCredentials, setAreInvalidCredentials] = useState(false);
  const redirectToReferrer = useRedirectToReferrer();
  const { mutate, isLoading } = useMutation(
    async ({ phoneNumber, password }: LoginInputs) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        phone: phoneNumber,
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

      <InputPhoneNumber errors={errors} control={control} />

      <InputPassword errors={errors} {...register("password")} />

      <Link
        href="/reset-password"
        target={isEmbedded ? "_blank" : "_self"}
        className="font-semibold mt-3 justify-start text-sm"
      >
        Mot de passe oublié ?
      </Link>

      <Button className="w-full mt-4" type="submit" isLoading={isLoading}>
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
