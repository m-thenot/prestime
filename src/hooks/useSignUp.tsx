import { logger } from "@utils/logger";
import { useMutation } from "react-query";
import { InsertCustomer } from "types/customer";
import useRedirectToReferrer from "./useRedirectToReferrer";
import supabase from "@utils/supabase/supabase-browser";
import { createCustomer } from "@services/customer";
import { createProvider } from "@services/provider";
import { IInsertProvider } from "types/provider";
import { UserType } from "types/user";
import { useState } from "react";

interface SignUpInputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phoneNumber: string;
  jobs?: { value: string; label: string }[];
}

export type UserMutation =
  | InsertCustomer
  | (IInsertProvider & {
      jobs: string[];
    });

const useSignUp = (type: UserType, isEmbedded?: boolean) => {
  const redirectToReferrer = useRedirectToReferrer();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useMutation(async (user: UserMutation) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, type }),
    };
    Promise.all([
      fetch("/api/sign-up", requestOptions),
      type === UserType.CUSTOMER
        ? createCustomer(user)
        : createProvider({
            firstname: user.firstname,
            lastname: user.lastname,
            phone_number: user.phone_number,
            user_id: user.user_id,
          }),
    ])
      .then(() => {
        setIsLoading(false);
        if (!isEmbedded) {
          redirectToReferrer();
        }
      })
      .catch((e) => {
        logger.error("Failed to create customer", {
          error: e,
          userId: user.user_id,
        });
        setIsLoading(false);
      });
  });

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
        mutate({
          user_id: data.user.id,
          firstname,
          lastname,
          phone_number: phoneNumber,
          jobs: jobs?.map((job) => job.value),
        });
      }
    } catch (error) {
      logger.error(error);
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
};

export default useSignUp;
