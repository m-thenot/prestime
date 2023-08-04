"use client";
import Button, { LinkButton } from "@components/Button";
import Input from "@components/Input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import supabase from "@utils/supabase/supabase-browser";
import { useState } from "react";
import { toast } from "react-toastify";

interface IResetPasswordInputs {
  email: string;
}

const ResetPasssword: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IResetPasswordInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const onSubmit = async ({ email }: IResetPasswordInputs) => {
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/account/update-password`,
    });

    if (!error) {
      setEmailSent(true);
    } else {
      toast.error(
        "Une erreur inattendue s'est produite. Merci de réessayer ou de contacter le support client."
      );
    }
    setIsLoading(false);
  };

  return (
    <form
      className={`items-center flex flex-col container`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-2">Changer mon mot de passe</h1>

      {emailSent ? (
        <>
          <p>
            Un email a été envoyé à {getValues("email")} pour réinitialiser
            votre mot de passe.
          </p>
          <LinkButton
            href="/login"
            className="font-semibold mt-3 justify-start text-sm"
          >
            Continuer
          </LinkButton>
        </>
      ) : (
        <>
          <p>Un email vous sera envoyé pour changer votre mot de passe</p>

          <Input
            label="Email"
            autoComplete="email"
            type="email"
            {...register("email")}
            errors={errors}
          />

          <Link
            href="/login"
            className="font-semibold mt-3 justify-start text-sm"
          >
            Retour à la page connexion
          </Link>

          <Button className="w-full mt-4" type="submit" isLoading={isLoading}>
            Soumettre
          </Button>
        </>
      )}

      <p className="mt-3">
        Vous n&lsquo;avez pas encore de compte ?{" "}
        <Link href="/sign-up" className="font-semibold">
          S&lsquo;inscrire
        </Link>
      </p>
    </form>
  );
};

export default ResetPasssword;
