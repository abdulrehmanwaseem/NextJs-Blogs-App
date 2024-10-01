"use client";

import {
  createComment,
  editComment,
  replyComment,
} from "@/actions/blogActions";
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
import { CommentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BiSolidMessageDetail } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";
import { PulseLoader } from "react-spinners";
import { useTheme } from "next-themes";

const EmojiPicker = dynamic(
  () => import("emoji-picker-react"),

  { ssr: false, loading: () => <PulseLoader /> }
);

const CommentForm = ({
  commentId,
  blogId,
  parentId,
  isEdit = false,
  isReply = false,
}) => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { theme, systemTheme } = useTheme();

  const form = useForm({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      text: "",
    },
  });

  const getActionFunction = () => {
    if (isEdit) return editComment;
    else if (isReply) return replyComment;
    else return createComment;
  };

  const onSubmit = (values) => {
    values.blogId = blogId;
    values.commentId = commentId;
    values.parentId = parentId;

    startTransition(() => {
      const action = getActionFunction();
      handleFormSubmit(action, values, setError, setSuccess, form);
    });
  };

  const handleEmojiClick = (emojiData) => {
    const { emoji } = emojiData;
    form.setValue("text", form.getValues("text") + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <FormProvider {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Textarea
                    className="h-32 pr-10"
                    {...field}
                    disabled={isPending}
                    placeholder="Write a comment..."
                  />
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="absolute right-3 top-3"
                  >
                    <BsEmojiSmile className="text-2xl" />
                  </button>
                  {showEmojiPicker && (
                    <div className="absolute bottom-14 right-0 z-10">
                      <EmojiPicker
                        lazyLoadEmojis={true}
                        theme={theme === "system" ? systemTheme : theme}
                        onEmojiClick={handleEmojiClick}
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} className="w-full" type="submit">
          <BiSolidMessageDetail className="mr-1 h-4 w-4" />
          {(isReply && "Reply") || (isEdit && "Save Changes") || "Post Comment"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default CommentForm;
