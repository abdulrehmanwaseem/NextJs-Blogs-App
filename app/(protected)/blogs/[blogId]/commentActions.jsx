"use client";

import { deleteComment, toggleLike } from "@/actions/blogActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaHeart, FaRegEdit } from "react-icons/fa";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";
import CommentForm from "./comment-form";
import { BiSolidMessageDetail } from "react-icons/bi";
import { MdOutlineReportProblem } from "react-icons/md";
import ReportCommentForm from "./reportComment-form";

export const LikeAction = ({
  commentId,
  initialIsLiked,
  initialLikesCount,
}) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const handleLikeWithDebouncing = useDebouncedCallback(async () => {
    try {
      // Toggle like state in the database
      await toggleLike(commentId);

      // Update local state based on the previous state
      setIsLiked((prevIsLiked) => !prevIsLiked);
      setLikesCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    } catch (error) {
      toast.error("Error toggling like, Try again later");
      console.error("Error toggling like", error);
    }
  }, 500);

  return (
    <Button
      variant="link"
      onClick={handleLikeWithDebouncing}
      className="p-0 h-4 text-muted-foreground"
    >
      <FaHeart
        className={`mr-[5px] ${isLiked ? "text-rose" : "text-gray-400"}`}
      />
      {likesCount} Likes
    </Button>
  );
};
export const ReplyAction = ({ parentId, blogId }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-4 text-muted-foreground">
          <BiSolidMessageDetail className="mr-[5px]" />
          Reply
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reply Comment</DialogTitle>
          <DialogDescription>
            Share you thoughts on this reply, Click reply when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <CommentForm parentId={parentId} blogId={blogId} isReply={true} />
      </DialogContent>
    </Dialog>
  );
};
export const DeleteAction = ({ commentId, blogId }) => {
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    startTransition(() => deleteComment(commentId, blogId));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2" disabled={isPending}>
          <AiOutlineDelete className="h-4 w-4" />
          Delete
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Comment</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this comment?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isPending} onClick={handleDelete}>
            Delete
          </Button>
          <DialogClose asChild>
            <Button disabled={isPending} variant="outline">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export const EditAction = ({ commentId, blogId }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2">
          <FaRegEdit className="h-4 w-4" />
          Edit
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Comment</DialogTitle>
          <DialogDescription>
            Make changes to your comment here, Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <CommentForm commentId={commentId} blogId={blogId} isEdit={true} />
      </DialogContent>
    </Dialog>
  );
};
export const ReportAction = ({ commentId }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2">
          <MdOutlineReportProblem className="h-4 w-4" />
          Report
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report Comment</DialogTitle>
          <DialogDescription>
            If you believe this comment violates our community guidelines, so
            don&apos;t worry about making the perfect choice. Your report will
            be reviewed by our moderation team.
          </DialogDescription>
        </DialogHeader>
        <ReportCommentForm commentId={commentId} />
      </DialogContent>
    </Dialog>
  );
};
