import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { stripe } from "@/lib/stripe";

const return_url = process.env.NEXT_BASE_URL + "/";

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const _userSubscription = await prisma.userSubscription.findUnique({
      where: { userId: userId },
    });

    if (_userSubscription && _userSubscription.stripeCustomerId) {
      // try to cancel at the billing portal

      const stripSession = await stripe.billingPortal.sessions.create({
        customer: _userSubscription.stripeCustomerId,
        return_url,
      });

      return NextResponse.json({ url: stripSession.url });
    }

    // user first try to subscribe
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: return_url,
      cancel_url: return_url,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user?.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "AI PDF Assistant Pro Plan",
              description: "Unlimited Documents and Chats",
            },
            unit_amount: 190,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      // whenever we finish this transaction, Stripe is going to send a webhook back to our API endpoint.
      // Within the endpoint, we need to be able to access who actually did the transaction.
      metadata: { userId },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log("Stripe error: ", error);
    return new NextResponse("internal server error: ", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
