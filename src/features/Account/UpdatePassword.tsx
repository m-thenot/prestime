"use client";
import Button from "@components/Button";
import FormError from "@components/FormError";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@contexts/user";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import InputPassword from "@components/InputPassword";
import supabase from "@utils/supabase/supabase-browser";
import { useRouter } from "next/navigation";

interface IUpdatePasswordInputs {
  password: string;
}

const UpdatePassword = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdatePasswordInputs>();
  const [error, setError] = useState(false);
  const router = useRouter();
  const { mutate, isLoading } = useMutation(async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    setError(Boolean(error));

    if (!error) {
      toast.success("Votre mot de passe a été mise à jour avec succès !");
      router.push("/");
    }
  });

  const onSubmit = async ({ password }: IUpdatePasswordInputs) => {
    mutate(password);
  };

  return (
    <form
      className="container items-center flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-4">Mettre à jour votre mot de passe</h1>

      {error && (
        <FormError errorMessage="Une erreur inattendue s'est produite, veuillez réessayer." />
      )}

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

      <Button className="w-full my-6" type="submit" isLoading={isLoading}>
        Enregistrer
      </Button>
    </form>
  );
};

export default UpdatePassword;
