"use client";

import Button from "@components/Button";
import Input from "@components/Input";
import InputPassword from "@components/InputPassword";
import InputPhoneNumber from "@components/InputPhoneNumber";
import RichText from "@components/RichText";
import CustomSelect from "@components/Select";
import { Document } from "@contentful/rich-text-types";
import useSignUp from "@hooks/useSignUp";
import { Check } from "@icons";
import { EMAIL_REGEX } from "constants/form";
import { useController, useForm } from "react-hook-form";
import { UserType } from "types/user";

interface SignUpInputs {
  firstname: string;
  lastname: string;
  email: string;
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
  const { onSubmit, isLoading } = useSignUp(UserType.PROVIDER);
  const {
    field: { value: jobsValue, onChange: jobsOnChange },
  } = useController({ name: "jobs", control });

  return (
    <section className="container mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl m-auto">
        <div className="md:w-1/2 max-w-md md:mr-3">
          <h1 className="text-center md:text-left mb-8">{title}</h1>
          <RichText
            document={claims}
            textClassName="mb-0"
            iconList={<Check />}
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
