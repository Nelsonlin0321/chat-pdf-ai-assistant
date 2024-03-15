import React from "react";
import { Button } from "./ui/button";

type Props = { isPro: boolean };

const PricingButton = ({ isPro }: Props) => {
  return <Button className="mr-3 bg-transparent border-2 p-1">Pricing</Button>;
};

export default PricingButton;
