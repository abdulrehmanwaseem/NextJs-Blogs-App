import { cn } from "@/lib/utils";

const AuthLayout = ({ children }) => {
  const bgSkyGradient = `bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800`;

  return (
    <div
      className={cn("h-full flex items-center justify-center", bgSkyGradient)}
    >
      {children}
    </div>
  );
};

export default AuthLayout;
