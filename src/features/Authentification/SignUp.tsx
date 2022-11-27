"use client";

import Button from "@components/Button";
import Input from "@components/Input";
import InputPassword from "@components/InputPassword";
import { createCustomer } from "@services/customer";
import { logger } from "@utils/logger";
import supabase from "@utils/supabase/supabase-browser";
import { EMAIL_REGEX } from "constants/form";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface SignUpInputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>();

  const onSubmit = async ({
    email,
    password,
    lastname,
    firstname,
  }: SignUpInputs) => {
    try {
      const { data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (data.user) {
        await createCustomer({
          user_id: data.user.id,
          firstname,
          lastname,
        });
      }
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <form
      className="items-center flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-2">Créez votre compte</h1>

      <Input
        label="Prénom"
        autoComplete="given-name"
        errors={errors}
        {...register("firstname", { required: true })}
      />

      <Input
        label="Nom"
        errors={errors}
        autoComplete="family-name"
        {...register("lastname", { required: true })}
      />

      <Input
        label="Email"
        errors={errors}
        autoComplete="email"
        type="email"
        {...register("email", {
          required: true,
          pattern: {
            value: EMAIL_REGEX,
            message: "Le format de l'email est incorrect.",
          },
        })}
      />

      <InputPassword
        errors={errors}
        {...register("password", {
          required: true,
          minLength: {
            value: 8,
            message: "Votre mot de passe doit contenir au moins 8 caractères.",
          },
        })}
      />

      <Button className="w-full mt-6" type="submit">
        Continuer
      </Button>

      <p className="mt-3">
        Déjà inscrit ? <Link href="/login">Se connecter</Link>
      </p>
    </form>
  );
};

export default SignUp;
