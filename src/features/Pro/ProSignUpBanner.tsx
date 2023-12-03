"use client";

import Button from "@components/Button";
import Input from "@components/Input";
import InputPassword from "@components/InputPassword";
import InputPhoneNumber from "@components/InputPhoneNumber";
import RichText from "@components/RichText";
import CustomSelect from "@components/Select";
import { BLOCKS, Document } from "@contentful/rich-text-types";
import useSignUp from "@hooks/useSignUp";
import { Check } from "@icons";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useController, useForm } from "react-hook-form";
import { UserType } from "types/user";

const options = [
  { value: "baby-sitter", label: "Baby-sitter" },
  { value: "private-driver", label: "Chauffeur privé" },
  { value: "cook", label: "Chef cuisinier" },
  { value: "sport coach", label: "Coach sportif" },
  { value: "hairdresser", label: "Coiffeur" },
  { value: "electrician", label: "Électricien" },
  { value: "housekeeper", label: "Femme de ménage" },
  { value: "gardener", label: "Jardinier" },
  { value: "bricklayer", label: "Maçon" },
  { value: "massage-therapist", label: "Masseur" },
  { value: "make-up-artist", label: "Maquilleuse" },
  { value: "carpenter", label: "Menuisier" },
  { value: "painter", label: "Peintre" },
  { value: "photographer", label: "Photographe" },
  { value: "plumber", label: "Plombier" },
  { value: "teacher", label: "Professeur particulier" },
  { value: "locksmith", label: "Serrurier" },
  { value: "air-conditioning-repair", label: "Technicien climatisation" },
  { value: "other", label: "Autre" },
];

interface SignUpInputs {
  firstname: string;
  lastname: string;
  password: string;
  phoneNumber: string;
  jobs: any;
}

interface IProSignUpBannerProps {
  title: string;
  claims: Document;
}

const ProSignUpBanner: React.FC<IProSignUpBannerProps> = ({
  title,
  claims,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpInputs>();
  const router = useRouter();

  const onSignUp = () => {
    router.push("/pro/confirmation");
  };

  const { onSubmit, isLoading } = useSignUp(UserType.PROVIDER, onSignUp);
  const {
    field: { value: jobsValue, onChange: jobsOnChange },
  } = useController({ name: "jobs", control });

  useEffect(() => {
    router.prefetch("/pro/confirmation");
  }, []);

  return (
    <section className="container mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl m-auto">
        <div className="md:w-1/2 max-w-md md:mr-3">
          <h1 className="text-center md:text-left mb-8">{title}</h1>
          <RichText
            document={claims}
            customOptions={{
              renderNode: {
                [BLOCKS.PARAGRAPH]: (_node: any, children: ReactNode) => (
                  <p className="mb-0">{children}</p>
                ),
                [BLOCKS.LIST_ITEM]: (_node: any, children: ReactNode) => (
                  <li className="flex items-center mb-5">
                    <span className="mr-4">
                      <Check />
                    </span>
                    {children}
                  </li>
                ),
              },
            }}
          />
        </div>
        <div className="md:w-1/2 w-full max-w-sm bg-white px-6 py-8 shadow-lg">
          <form
            className="items-center flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
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

            <CustomSelect
              label="Profession"
              onChange={jobsOnChange}
              value={jobsValue}
              required
              options={options}
            />

            <InputPhoneNumber errors={errors} control={control} />

            <InputPassword
              errors={errors}
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message:
                    "Votre mot de passe doit contenir au moins 8 caractères.",
                },
              })}
            />

            <Button className="w-full mt-6" type="submit" isLoading={isLoading}>
              S&lsquo;inscrire gratuitement
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProSignUpBanner;
