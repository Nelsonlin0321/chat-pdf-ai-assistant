import React from "react";
import Link from "next/link";

type Props = { isPro: boolean };

const PricingButton = ({ isPro }: Props) => {
  return (
    <Link
      href="/pricing"
      className="text-white mr-2 hover:text-gray-300  font-semibold"
    >
      {isPro ? "Your Plan" : "Upgrade to Pro"}
    </Link>
  );
};

export default PricingButton;
