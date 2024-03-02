import React from "react";
import { Button } from "./ui/button";
import { StopCircle } from "lucide-react";

type Props = {
  onStop: () => void;
};

const StopButton = ({ onStop }: Props) => {
  return (
    <Button className="w-full" onClick={() => onStop()}>
      <StopCircle />
    </Button>
  );
};

export default StopButton;
