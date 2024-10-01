import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { auth } from "@/auth";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const fallbackSkeletion = ({ Skeleton, count = 1 }) => {
  return Array(count)
    .fill(0)
    .map((_, index) => <Skeleton key={index} />);
};

export async function Await({ promise, children }) {
  let data = await promise;

  return children(data);
}

export const startConfetti = (confettiPopperRef, duration = 5000) => {
  confettiPopperRef.current = true;
  setTimeout(() => {
    confettiPopperRef.current = false;
  }, duration);
};
