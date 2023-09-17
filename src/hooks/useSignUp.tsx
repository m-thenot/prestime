import { logger } from "@utils/logger";
import { useMutation } from "react-query";
import { InsertCustomer } from "types/customer";
import supabase from "@utils/supabase/supabase-browser";
import { IInsertProvider } from "types/provider";
import { UserType } from "types/user";
import { useState } from "react";
import { toast } from "react-toastify";

interface SignUpInputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phoneNumber: string;
  jobs?: { value: string; label: string }[];
}

export type UserMutation = (
  | Omit<InsertCustomer, "financial_id">
  | (Omit<IInsertProvider, "financial_id"> & {
      jobs?: string[];
    })
) & { email: string };

const useSignUp = (type: UserType, onSignUp: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useMutation({
    mutationFn: async (user: UserMutation & { email: string }) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, type }),
      };
      const response = await fetch("/api/sign-up", requestOptions);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    },
  });

  const onSignUpError = (error: any, errorMessage: string) => {
    logger.error(errorMessage, {
      error,
    });
    toast.error(
      "Une erreur inattendue s'est produite lors de la création de votre compte. Merci de réessayer ou de contacter le support client."
    );
    setIsLoading(false);
  };

  const onSubmit = async ({
    email,
    password,
    lastname,
    firstname,
    phoneNumber,
    jobs,
  }: SignUpInputs) => {
    try {
      setIsLoading(true);
      const { data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            type,
          },
        },
      });

      if (data.user) {
        mutate(
          {
            user_id: data.user.id,
            firstname,
            lastname,
            phone_number: phoneNumber,
            jobs: jobs?.map((job) => job.value),
            email,
          },
          {
            onSuccess: async () => {
              setIsLoading(false);
              await supabase.auth.refreshSession();

              onSignUp();
            },
            onError: (e) => {
              onSignUpError(e, "Failed to create customer");
            },
          }
        );
      }
    } catch (e) {
      onSignUpError(e, "Failed to register user");
    }
  };

  return { onSubmit, isLoading };
};

export default useSignUp;
