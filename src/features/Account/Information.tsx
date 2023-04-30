"use client";
import Button from "@components/Button";
import FormError from "@components/FormError";
import Input from "@components/Input";
import InputPhoneNumber from "@components/InputPhoneNumber";
import { updateCustomer } from "@services/customer";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@contexts/user";
import { useMutation } from "react-query";
import { UpdateCustomer } from "types/customer";
import { toast } from "react-toastify";

interface InformationInputs {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
}

const Information = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InformationInputs>({
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      phoneNumber: user?.phone_number,
    },
  });
  const [error, setError] = useState(false);
  const { mutate, isLoading } = useMutation(
    async (user: UpdateCustomer & { currentEmail: string }) => {
      const { error } = await updateCustomer(user, user.currentEmail);
      setError(Boolean(error));

      if (!error) {
        toast.success("Vos informations ont été mise à jour avec succès !");
      }
    }
  );

  const onSubmit = async (values: InformationInputs) => {
    const { email, firstname, lastname, phoneNumber } = values;
    mutate({
      email,
      firstname,
      lastname,
      phone_number: phoneNumber,
      user_id: user!.user_id,
      currentEmail: user!.email,
    });
  };

  return (
    <form
      className="items-center flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-2">Mes informations</h1>

      {error && (
        <FormError errorMessage="Une erreur inattendue s'est produite, veuillez réessayer." />
      )}

      <Input
        label="Prénom"
        autoComplete="given-name"
        defaultValue={user?.firstname}
        errors={errors}
        {...register("firstname", { required: true })}
      />

      <Input
        label="Nom"
        defaultValue={user?.lastname}
        errors={errors}
        autoComplete="family-name"
        {...register("lastname", { required: true })}
      />

      <Input
        label="Email"
        autoComplete="email"
        defaultValue={user?.email}
        type="email"
        {...register("email")}
        errors={errors}
      />

      <InputPhoneNumber errors={errors} control={control} />

      <Button className="w-full mt-6" type="submit" isLoading={isLoading}>
        Enregistrer
      </Button>
    </form>
  );
};

export default Information;
