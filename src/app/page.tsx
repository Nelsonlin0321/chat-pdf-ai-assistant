import { Button } from "@/app/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { LogIn } from "lucide-react";
import FileUpload from "@/app/components/FileUpload";
import { Toaster } from "react-hot-toast";
import { hasChat } from "@/lib/hasChat";

// tailwind css bg Gradient
export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  const userHasChat = await hasChat({ userId });

  return (
    <div className="w-screen min-h-screen bg-gradient-to-tl from-yellow-100 to-pink-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center ">
          <h1 className="mr-3 text-5xl font-semibold">PDF AI Assistant</h1>

          <div className="flex mt-2">
            {isAuth && (
              <Link href={"/chat"}>
                <Button>Go to Chats</Button>
              </Link>
            )}
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Chat with Any PDF Anytime, Anywhere with AI Assistant.
          </p>

          <div className="w-full mt-4">
            {isAuth && !userHasChat ? (
              <FileUpload userId={userId} />
            ) : (
              <Link href={"/sign-in"}>
                <Button>
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
