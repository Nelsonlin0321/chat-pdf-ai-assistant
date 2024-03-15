"use client";

import { useState } from "react";
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
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full bottom-0"
      onClick={async () => await handelSubscription()}
      disabled={loading}
    >
      {isPro ? "Manage Subscription" : "Get Started"}
    </button>
  );
};

export default SubscriptionButton;
