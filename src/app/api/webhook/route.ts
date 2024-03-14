import { stripe } from "@/lib/stripe";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SIGNING_SECRET!;

export async function POST(req: Request, res: Response) {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    // On error, log and return the error message
    console.log(`❌ Error message: ${error}`);
    return new NextResponse("webhook failed", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type == "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.userId) {
      return new NextResponse("no user id", { status: 400 });
    }

    const userId = session.metadata.userId;

    await prisma.userSubscription.create({
      data: {
        userId: userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await prisma.userSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
