import { stripe } from "@/lib/stripe";
import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { buffer } from "stream/consumers";
import Stripe from "stripe";

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SIGNING_SECRET!;

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const buf = await buffer(req);

  const sig = req.headers["stripe-signature"]!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
  } catch (error) {
    // On error, log and return the error message
    console.log(`❌ Error message: ${error}`);
    res.status(400).send(`Webhook Error: ${error}`);
    return;
    // return new NextResponse("webhook failed", { status: 400 });
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
