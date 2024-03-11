import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import SubscriptionButton from "./components/SubscriptionButton";
import { checkSubscription } from "@/lib/checkSubscription";

const Navbar = async () => {
  const { userId } = await auth();
  const isAuth = !!userId;

  const isPro = await checkSubscription({ userId });

  return (
    <nav className="shadow-md top-0 left-0 right-0 z-30 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 h-18 flex justify-between items-center px-8">
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
        {/* <Link href="/about" className="text-white mr-4 hover:text-gray-300">
          About
        </Link> */}

        <Link href="/contact" className="text-white mr-4 hover:text-gray-300">
          Contact
        </Link>

        {isAuth && <SubscriptionButton isPro={isPro} />}

        {isAuth ? (
          <UserButton afterSignOutUrl="" />
        ) : (
          <>
            <Link href={"/sign-in"}>
              <button className=" border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-gray-800 ml-2">
                Login
              </button>
            </Link>
            <Link href={"/sign-up"}>
              <button className="border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-gray-800 ml-2">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
