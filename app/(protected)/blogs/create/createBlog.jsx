"use client";

import { createBlog } from "@/actions/blogActions";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleFormSubmit } from "@/lib/formUtils";
import { getBase64 } from "@/lib/utils";
import { BlogSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import DOMPurify from "dompurify";
import dynamic from "next/dynamic";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoCreateOutline } from "react-icons/io5";
import "react-quill/dist/quill.snow.css";
import { BarLoader } from "react-spinners";

import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // You can choose a different theme from highlight.js if you prefer

const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <BarLoader className="min-w-full" color="#888888" />,
});

const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: [
    [{ size: ["small", false, "large", "huge"] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [("bold", "italic", "underline", "strike")],
    ["code-block", "blockquote"],
    ["link", "video"],
    ["clean"],
  ],
};
const formats = [
  "size",
  "color",
  "background",
  "font",
  "align",
  "list",
  "indent",
  "direction",
  "bold",
  "italic",
  "underline",
  "strike",
  "code-block",
  "blockquote",
  "link",
  "video",
];

const CreateBlog = () => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      image: undefined,
    },
  });

  const onSubmit = async (values) => {
    try {
      values.image = await getBase64(values.image);
    } catch (error) {
      setError("Error uploading image, try again later");
      return;
    }
    values.content = DOMPurify.sanitize(values.content, {
      USE_PROFILES: { html: true },
    });

    startTransition(() => {
      handleFormSubmit(createBlog, values, setError, setSuccess);
    });
  };

  return (
    <Card className="w-lg">
      <CardHeader>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
          Create Blog
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
                    <FormLabel>Banner</FormLabel>
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Title of the blog"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Description of the blog"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <QuillEditor
                        theme="snow"
                        placeholder="Write your blog content here..."
                        modules={modules}
                        className={
                          isPending ? "opacity-10 cursor-not-allowed" : ""
                        }
                        value={field.value}
                        readOnly={isPending}
                        onChange={field.onChange}
                        formats={formats}
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
              <IoCreateOutline className="mr-1 h-4 w-4" />
              Create Blog
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default CreateBlog;
