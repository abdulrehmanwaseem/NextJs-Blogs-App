"use client";

import { contact } from "@/actions/contactAction";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleFormSubmit } from "@/lib/formUtils";
import { ContactSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { Textarea } from "@/components/ui/textarea";
import { BiSolidMessageDetail } from "react-icons/bi";

const Contact = () => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });
  const onSubmit = (values) => {
    startTransition(() => {
      handleFormSubmit(contact, values, setError, setSuccess);
    });
  };

  return (
    <Card className="w-lg">
      <CardHeader>
        <h1 className="scroll-m-20 text-3xl text-center font-semibold tracking-tight">
          Contact Us
        </h1>
        <CardDescription className="text-center leading-6">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details <br /> about our Business plan? Let us know.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FormProvider {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="john.doe@gmail.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Let us know how we can help you"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        placeholder="Type your message here."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} className="w-full" type="submit">
              <BiSolidMessageDetail className="mr-1 h-4 w-4" />
              Send message
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default Contact;
