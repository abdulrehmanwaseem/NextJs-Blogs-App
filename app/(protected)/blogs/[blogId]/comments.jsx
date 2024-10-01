import { Card } from "@/components/ui/card";
import {
  CustomDropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/user-avatar";
import moment from "moment";
import {
  DeleteAction,
  EditAction,
  LikeAction,
  ReplyAction,
  ReportAction,
} from "./commentActions";
import { MdOutlineReportProblem } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";

const CommentsList = ({ blogId, comments }) => {
  return (
    <>
      {comments?.length > 0 ? (
        comments.map((comment) => {
          if (comment.parentId) return;
          return (
            <Card key={comment.id} className="p-4 space-y-3 bg-secondary">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 font-semibold text-sm">
                    <UserAvatar
                      src={comment?.commentBy?.image}
                      width={28}
                      quality={85}
                      className="mr-2"
                      height={28}
                      fallBackSize={14}
                      sizes="28px"
                    />
                    {comment.commentBy?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {moment(comment?.createdAt).format("DD-MMM-YYYY")}
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger className="p-2 -m-2 rounded-lg hover:bg-neutral-200 hover:dark:bg-neutral-600">
                    <FiMoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="p-2 min-w-[7rem] -mt-2"
                    align="center"
                  >
                    {comment?.actionsAccess ? (
                      <>
                        <CustomDropdownMenuItem>
                          <EditAction commentId={comment.id} blogId={blogId} />
                        </CustomDropdownMenuItem>

                        <CustomDropdownMenuItem>
                          <DeleteAction
                            commentId={comment.id}
                            blogId={blogId}
                          />
                        </CustomDropdownMenuItem>
                      </>
                    ) : (
                      <CustomDropdownMenuItem>
                        <ReportAction commentId={comment.id} />
                      </CustomDropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p>{comment.text}</p>
              <div className="flex gap-4">
                <LikeAction
                  commentId={comment.id}
                  initialIsLiked={comment.isLikedByUser}
                  initialLikesCount={comment.likesCount}
                />
                {!comment?.actionsAccess && (
                  <ReplyAction parentId={comment.id} blogId={blogId} />
                )}
              </div>

              {/* Render replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-1 lg:ml-5 mt-2 space-y-1 border-l-2 border-gray-300 pl-4">
                  {comment.replies.map((reply) => (
                    <Card key={reply.id} className="p-3 space-y-2">
                      <div className="flex items-center">
                        <UserAvatar
                          src={reply.commentBy?.image}
                          width={24}
                          height={24}
                          quality={85}
                          className="mr-2"
                        />
                        <p className="font-semibold text-sm">
                          {reply.commentBy?.name}
                        </p>
                        <p className="text-sm text-muted-foreground ml-2">
                          {moment(reply.createdAt).format("DD-MMM-YYYY")}
                        </p>
                      </div>

                      <p>{reply.text}</p>
                      <div className="flex gap-2">
                        <LikeAction
                          commentId={reply.id}
                          initialIsLiked={reply.isLikedByUser}
                          initialLikesCount={reply.likesCount}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          );
        })
      ) : (
        <p className="text-gray-600">No comments yet.</p>
      )}
    </>
  );
};

export default CommentsList;
