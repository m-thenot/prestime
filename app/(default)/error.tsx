"use client";

import Button from "@components/Button";
import { logger } from "@utils/logger";
import React from "react";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  return (
    <div className="max-w-sm p-4 mx-auto">
      <p className="mb-3">
        Une erreur innattendue s&lsquo;est produite, veuillez réssayer. Si
        l&lsquo;erreur persiste, merci de contacter notre service client.
      </p>
      <Button onClick={() => reset()}>Réessayer</Button>
    </div>
  );
}
