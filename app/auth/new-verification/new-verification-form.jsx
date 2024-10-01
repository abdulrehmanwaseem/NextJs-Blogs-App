"use client";

import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useRef, useState } from "react";
import { newVerification } from "@/actions/authActions";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { CardWrapper } from "@/components/auth/card-wrapper";

const NewVerificationForm = () => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const searchParams = useSearchParams();
  const hasSubmitedRef = useRef(false);

  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    if (!hasSubmitedRef.current) {
      onSubmit();
      hasSubmitedRef.current = true;
    }
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader color="#888888" size={16} />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};
export default NewVerificationForm;
