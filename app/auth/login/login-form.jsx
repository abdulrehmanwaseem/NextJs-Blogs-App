"use client";

import React, { useState } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/formElements";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/authActions";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data?.error);
          }
          if (data?.success) {
            setSuccess(data?.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      headerTitle={"Login"}
      backButtonLabel={"Don't have an account?"}
      backButtonHref={"/auth/register"}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl disabled={isPending}>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="flex-grow w-full">
                          <InputOTPSlot className="w-full" index={0} />
                          <InputOTPSlot className="w-full" index={1} />
                          <InputOTPSlot className="w-full" index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup className="flex-grow w-full">
                          <InputOTPSlot className="w-full" index={3} />
                          <InputOTPSlot className="w-full" index={4} />
                          <InputOTPSlot className="w-full" index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
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
                      <Button asChild size="sm" variant="link" className="px-0">
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full" disabled={isPending}>
              {!showTwoFactor ? "Login" : "Confirm"}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
