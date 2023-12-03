"use client";

import Button from "@components/Button";
import Input from "@components/Input";
import InputPassword from "@components/InputPassword";
import Link from "next/link";
import { useForm } from "react-hook-form";
import InputPhoneNumber from "@components/InputPhoneNumber";
import useSignUp from "@hooks/useSignUp";
import { UserType } from "types/user";
import useRedirectToReferrer from "@hooks/useRedirectToReferrer";
import { trackEvent } from "@utils/tracking";

interface SignUpInputs {
  firstname: string;
  lastname: string;
  password: string;
  phoneNumber: string;
}

interface ISignUpProps {
  isEmbedded?: boolean;
  onClickLogin?: () => void;
}

const SignUp: React.FC<ISignUpProps> = ({
  isEmbedded = false,
  onClickLogin,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpInputs>();
  const redirectToReferrer = useRedirectToReferrer();

  const onSignUp = () => {
    if (!isEmbedded) {
      redirectToReferrer();
    }
    trackEvent("sign_up", { method: "email" });
  };

  const { onSubmit, isLoading } = useSignUp(UserType.CUSTOMER, onSignUp);

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
