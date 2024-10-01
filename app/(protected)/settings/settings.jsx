"use client";

import { settings } from "@/actions/authActions";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { PasswordInput } from "@/components/formElements";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UserInfo } from "@/components/user-info";
import { handleFormSubmit } from "@/lib/formUtils";
import { getBase64, startConfetti } from "@/lib/utils";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import { useEffect, useRef, useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoSettingsOutline } from "react-icons/io5";
import ConfittePoper from "./confettiPopper";
import { toast } from "sonner";

const Settings = ({ user }) => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [isPending, startTransition] = useTransition();

  const confettiPopperRef = useRef(false);

  const form = useForm({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      image: undefined,
      name: user?.name || undefined,
      bio: user.bio || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    },
  });

  const onSubmit = async (values) => {
    if (values.image) {
      try {
        values.image = await getBase64(values.image);
      } catch (error) {
        setError("Error uploading image, try again later");
        return;
      }
    }
    startTransition(() => {
      handleFormSubmit(settings, values, setError, setSuccess).then(() => {
        if (values.role === "AUTHOR" && user.role === "USER") {
          toast.success("Congratulations you have become Author!", {
            duration: 7000,
          });
          startConfetti(confettiPopperRef, 7000);
        } else {
          confettiPopperRef.current = false;
        }
      });
    });
  };
  return (
    <div className="flex flex-col-reverse items-center lg:flex-row gap-6">
      <Card className="w-full lg:w-[500px] shadow-md">
        <CardHeader>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
            🔩Settings
          </h2>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Picture</FormLabel>
                      <FormControl>
                        <Input
                          {...fieldProps}
                          disabled={isPending}
                          type="file"
                          accept=".jpg, .jpeg, .png, .webp"
                          onChange={(event) =>
                            onChange(
                              event.target.files ? event.target.files[0] : null
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="John Doe"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="I am John Doe"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!user?.isOAuth && (
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
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
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
                  </>
                )}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                          <SelectItem value={UserRole.USER}>User</SelectItem>
                          <SelectItem value={UserRole.AUTHOR}>
                            Author
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!user?.isOAuth && (
                  <FormField
                    control={form.control}
                    name="isTwoFactorEnabled"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Two Factor Authentication</FormLabel>
                          <FormDescription>
                            Enable two factor authentication for your account
                          </FormDescription>
                        </div>

                        <FormControl>
                          <Switch
                            disabled={isPending}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />

              <Button disabled={isPending} className="w-full" type="submit">
                <IoSettingsOutline className="mr-1 h-4 w-4" />
                Save Settings
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
      <UserInfo label={"💻User Information"} user={user} />
      {confettiPopperRef.current && (
        <ConfittePoper run={confettiPopperRef.current} />
      )}
    </div>
  );
};

export default Settings;
