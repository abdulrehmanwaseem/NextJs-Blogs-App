"use client";

import { reportComment } from "@/actions/blogActions";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { handleFormSubmit } from "@/lib/formUtils";
import { ReportCommentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdOutlineReportProblem } from "react-icons/md";

const ReportCommentForm = ({ commentId }) => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(ReportCommentSchema),
    defaultValues: {
      reason: "Spam",
      other: "",
    },
  });
  const onSubmit = (values) => {
    values.commentId = commentId;
    startTransition(() => {
      handleFormSubmit(reportComment, values, setError, setSuccess);
    });
  };

  return (
    <FormProvider {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    className="flex flex-wrap gap-x-3 gap-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Spam" id="spam" />
                      <Label htmlFor="spam">Spam</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Harassment" id="harassment" />
                      <Label htmlFor="harassment">Harassment</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Misinformation"
                        id="misinformation"
                      />
                      <Label htmlFor="misinformation">Misinformation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Inappropriate"
                        id="inappropriate"
                      />
                      <Label htmlFor="inappropriate">Inappropriate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="OffensiveLanguage"
                        id="offensiveLanguage"
                      />
                      <Label htmlFor="offensiveLanguage">
                        Offensive Language
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="HateSpeech" id="hateSpeech" />
                      <Label htmlFor="hateSpeech">Hate Speech</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Violence" id="violence" />
                      <Label htmlFor="violence">Violence</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("reason") === "Other" && (
            <FormField
              control={form.control}
              name="other"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Reason</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      placeholder="Please specify the reason for reporting."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} className="w-full" type="submit">
          <MdOutlineReportProblem className="mr-1 h-4 w-4" />
          Report
        </Button>
      </form>
    </FormProvider>
  );
};

export default ReportCommentForm;
