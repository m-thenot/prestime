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
import InputPhoneNumber from "@components/InputPhoneNumber";
import { useMutation } from "react-query";
import { InsertCustomer } from "types/customer";
import useRedirectToReferrer from "@hooks/useRedirectToReferrer";

interface SignUpInputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface ISignUpProps {
  isEmbedded?: boolean;
  onClickLogin?: () => void;
}

const SignUp: React.FC<ISignUpProps> = ({ isEmbedded, onClickLogin }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpInputs>();
  const redirectToReferrer = useRedirectToReferrer();
  const { mutate, isLoading } = useMutation(
    async (customer: InsertCustomer) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer }),
      };
      Promise.all([
        fetch("/api/sign-up", requestOptions),
        createCustomer(customer),
      ])
        .then(() => {
          if (!isEmbedded) {
            redirectToReferrer();
          }
        })
        .catch((e) => {
          logger.error("Failed to create customer", {
            error: e,
            userId: customer.user_id,
          });
        });
    }
  );

  const onSubmit = async ({
    email,
    password,
    lastname,
    firstname,
    phoneNumber,
  }: SignUpInputs) => {
    try {
      const { data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (data.user) {
        mutate({
          user_id: data.user.id,
          firstname,
          lastname,
          phone_number: phoneNumber,
        });
      }
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <form
      className={`items-center flex flex-col ${isEmbedded ? "" : "container"} `}
      onSubmit={handleSubmit(onSubmit)}
    >
      {isEmbedded ? (
        <h2 className="mb-2">Créez votre compte</h2>
      ) : (
        <h1 className="mb-2">Créez votre compte</h1>
      )}

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

      <InputPhoneNumber errors={errors} control={control} />

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

      <Button className="w-full mt-6" type="submit" isLoading={isLoading}>
        Continuer
      </Button>

      <p className="mt-3">
        Déjà inscrit ?{" "}
        {isEmbedded ? (
          <Button
            variant="link"
            onClick={onClickLogin}
            className="font-semibold"
          >
            Se connecter
          </Button>
        ) : (
          <Link href="/login" className="font-semibold">
            Se connecter
          </Link>
        )}
      </p>
    </form>
  );
};

export default SignUp;
