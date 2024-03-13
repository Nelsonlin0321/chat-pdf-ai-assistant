"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";

const SubscriptionButton = ({ isPro }: { isPro: boolean }) => {
  const [loading, setLoading] = useState(false);
  const handelSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="mr-3 bg-transparent border-2"
      onClick={async () => await handelSubscription()}
      disabled={loading}
    >
      {isPro ? "Manage Subscription" : "Upgrade to Pro"}
    </Button>
  );
};

export default SubscriptionButton;
