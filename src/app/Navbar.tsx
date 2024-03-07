import { UserButton, auth } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Link from "next/link";

const Navbar = async () => {
  const { userId } = await auth();
  const isAuth = !!userId;

  return (
    <nav className="shadow-md fixed top-0 left-0 right-0 z-30 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 h-16 flex justify-between items-center px-8">
      <a href="/" className="text-white font-bold text-xl">
        PDF AI Assistant
      </a>
      <div className="flex items-center">
        <a href="/" className="text-white mr-4 hover:text-gray-300">
          Home
        </a>
        <a href="/chat" className="text-white mr-4 hover:text-gray-300">
          Chat
        </a>
        <a href="/about" className="text-white mr-4 hover:text-gray-300">
          About
        </a>

        <a href="/contact" className="text-white mr-4 hover:text-gray-300">
          Contact
        </a>
        {isAuth ? (
          <div className="flex items-center">
            <UserButton afterSignOutUrl="" />
          </div>
        ) : (
          <>
            <Link href={"/sign-in"}>
              <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 ml-4">
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
