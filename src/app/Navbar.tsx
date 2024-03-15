import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import SubscriptionButton from "./components/SubscriptionButton";
import { checkSubscription } from "@/lib/checkSubscription";
import PricingButton from "./components/PricingButton";

const Navbar = async () => {
  const { userId } = await auth();
  const isAuth = !!userId;

  const isPro = await checkSubscription({ userId });

  return (
    <nav className="shadow-md sticky top-0 left-0 right-0 z-30 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 h-20 flex justify-between items-center px-2">
      <a href="/" className="text-white font-bold text-lg">
        PDF AI Assistant
      </a>
      <div className="flex items-center flex-wrap">
        <Link href="/" className="text-white mr-4 hover:text-gray-300">
          Home
        </Link>
        <Link href="/chat" className="text-white mr-4 hover:text-gray-300">
          Chat
        </Link>
        <Link href="/about" className="text-white mr-4 hover:text-gray-300">
          About
        </Link>

        <Link href="/contact" className="text-white mr-2 hover:text-gray-300">
          Contact
        </Link>

        {isAuth && <PricingButton isPro={isPro} />}

        {isAuth ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <>
            {/* <Link href={"/sign-in"}>
              <div className="bg-transparent border-2 border-white text-white px-2 py-1 rounded-md hover:bg-white hover:text-gray-800 ml-2">
                Login
              </div>
            </Link> */}
            <Link href={"/sign-up"}>
              <div className="bg-transparent border-2 border-white text-white px-2 py-1 rounded-md hover:bg-white hover:text-gray-800 ml-2">
                Sign Up
              </div>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
