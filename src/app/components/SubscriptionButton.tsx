"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";

const SubscriptionButton = () => {
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
      className="mr-3"
      onClick={async () => await handelSubscription()}
      disabled={loading}
    >
      Upgrade to Pro
    </Button>
  );
};

export default SubscriptionButton;
