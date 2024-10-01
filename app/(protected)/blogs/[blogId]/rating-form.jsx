"use client";

import { createComment, createRating } from "@/actions/blogActions";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { handleFormSubmit } from "@/lib/formUtils";
import { RatingSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdReviews } from "react-icons/md";
import { Rating, Star } from "@smastrom/react-rating";

// Define your styles
const ratingStyle = {
  activeFillColor: "#f59e0b",
  inactiveFillColor: "#ffddb1",
};

const RatingForm = ({ blogId, rating }) => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(RatingSchema),
    defaultValues: {
      rating: rating,
    },
  });

  const onSubmit = (values) => {
    values.blogId = blogId;
    values.previousRating = rating;
    startTransition(() => {
      handleFormSubmit(createRating, values, setError, setSuccess);
    });
  };

  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center space-x-4">
          <p className="font-medium">
            Would you like to rate this blog?{" "}
            <span className="text-xs text-muted-foreground">
              Don&apos;t be shy—give it a try!
            </span>
          </p>
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Rating
                    isDisabled={isPending}
                    className="lg:max-w-[180px] max-w-[230px]"
                    value={field.value}
                    onChange={field.onChange}
                    itemShapes={Star} // Apply the first shape
                    itemStyles={{
                      ...ratingStyle,
                      itemShapes: Star, // Apply the shape along with styles
                    }}
                    transition="zoom"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} className="w-full" type="submit">
            <MdReviews className="mr-1 h-4 w-4" />
            Submit Review
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default RatingForm;
