"use client";

import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const SubscriptionButton = ({ isPro }: { isPro: boolean }) => {
  const [loading, setLoading] = useState(false);
  const handelSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const label = isPro ? "Manage Subscription" : "Get Started";

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full bottom-0"
      onClick={async () => await handelSubscription()}
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : label}
    </button>
  );
};

export default SubscriptionButton;
