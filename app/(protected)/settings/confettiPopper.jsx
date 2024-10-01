import { useWindowSize } from "@/hooks/use-window-size";
import Confetti from "react-confetti";

const ConfettiPopper = ({ run }) => {
  const { width, height } = useWindowSize();
  const adjustedWidth = width - 20;
  return (
    <Confetti
      run={run}
      numberOfPieces={500}
      width={adjustedWidth}
      height={height}
    />
  );
};

export default ConfettiPopper;
