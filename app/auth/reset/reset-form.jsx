"use client";

import { login, resetPassword } from "@/actions/authActions";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ResetForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(ResetSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resetPassword(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel={"Back to login"}
      backButtonHref={"/auth/login"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            {success && <FormSuccess message={success} />}
            <Button type="submit" className="w-full" disabled={isPending}>
              Send reset email
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
