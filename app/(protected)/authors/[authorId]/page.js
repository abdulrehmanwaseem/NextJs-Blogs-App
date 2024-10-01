import { AuthorInfo } from "@/components/author/author-info";
import { getAuthorById } from "@/services/author";

const AuthorDetails = async ({ params }) => {
  const author = await getAuthorById(params.authorId);

  return <AuthorInfo label={true} author={author} />;
};

export default AuthorDetails;
