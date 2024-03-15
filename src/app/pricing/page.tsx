// pages/pricing.tsx
import React from "react";
import SubscriptionButton from "../components/SubscriptionButton";
import { auth } from "@clerk/nextjs";
import { checkSubscription } from "@/lib/checkSubscription";
import Link from "next/link";

const PricingPage = async () => {
  const { userId } = auth();
  const isPro = await checkSubscription({ userId });

  return (
    <div className="min-h-screen bg-gradient-to-tl from-yellow-100 to-pink-100 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-8 py-20">
          Find the best plan for reading PDF
        </h1>

        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-md p-8 mx-4 mb-8 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">Free Plan</h2>
              <p className="text-gray-600 mb-4">For Trial</p>
              <hr />
              <p className="text-4xl font-bold mb-8 mt-5">$ 0.0 / Month</p>

              <ul className="mb-8">
                <li className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  5 Documents
                </li>
                <li className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  100 Chat Messages
                </li>
              </ul>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                <Link href={"/"}>Get Started</Link>
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-lg shadow-md p-8 mx-4">
              <h2 className="text-2xl font-bold mb-4">Pro Plan</h2>
              <p className="text-gray-600 mb-4">For Professional</p>
              <hr />
              <p className="text-4xl font-bold mb-8 mt-5">$ 1.9 / Month</p>
              <ul className="mb-8">
                <li className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Unlimited Documents
                </li>
                <li className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Unlimited Chat Messages
                </li>
              </ul>
              <SubscriptionButton isPro={isPro} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

// import React from "react";

// const AboutPage: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-tl from-yellow-100 to-pink-100">
//       <header className="pt-20">
//         <div className="container mx-auto px-4">
//           <h1 className=" text-5xl text-center font-extrabold text-gray-800">
//             PDF AI Assistant to Boost Your Productivity
//           </h1>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         <section className="mb-12">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                 Free Plan
//               </h3>

//               <hr />
//               <div className="flex">
//                 <div>$0/Month</div>
//                 <div>3 Documents /Month</div>
//                 <div>50 Chat Messages /Month</div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                 Pro Plan
//               </h3>
//               <hr />
//             </div>
//           </div>
//         </section>

//         <section className="mb-12">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Our Mission
//           </h2>
//           <p className="text-gray-600 leading-relaxed">
//             My mission is to harness the power of artificial intelligence to
//             solve complex problems and create transformative solutions that
//             drive innovation and growth for our clients. We strive to be at the
//             forefront of AI technology, constantly exploring new frontiers and
//             pushing the boundaries of what is possible.
//           </p>
//         </section>
//       </main>

//       <footer className="bg-gray-800 py-6 fixed w-full bottom-0">
//         <div className="container mx-auto px-4 text-center">
//           <p className="text-white">
//             &copy; {new Date().getFullYear()} PDF-AI-Assistant. All rights
//             reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default AboutPage;
