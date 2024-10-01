"use client";

import { newPassword } from "@/actions/authActions";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/formElements";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = (values) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel={"Back to login"}
      backButtonHref={"/auth/login"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            {success && <FormSuccess message={success} />}
            <Button type="submit" className="w-full" disabled={isPending}>
              Reset password
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
