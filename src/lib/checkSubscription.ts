import prisma from "@/prisma/client";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export async function checkSubscription({ userId }: { userId: string | null }) {
  let isPro = false;

  if (!userId) {
    return isPro;
  }

  const subscription = await prisma.userSubscription.findUnique({
    where: { userId: userId ? userId : undefined },
  });

  if (subscription) {
    isPro =
      subscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();
  }

  return isPro;
}
