import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel={"Oops! Something went wrong!"}
      backButtonLabel={"Back to login"}
      backButtonHref={"/auth/login"}
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive w-8 h-8 -my-2" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
