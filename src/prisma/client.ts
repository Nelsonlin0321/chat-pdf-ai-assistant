// as the best practice, we should make sure that there
// is only a single instance of this running our application.
// So the reason we are doing this in this file is because the first time
// this client file is imported somewhere in out application, we get a new instance of this Prisma
// but the second time this file is imported, this code is not re-executed, it's cached, so the result will be reused.
// Not, in Next.js because we have fast refresh, anytime we change our source codes,Next.js
// refreshes some of our modules. In that case, we will end up in a situation where we have too many Prisma clients.
// This only happens in development mode.

// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaClientSingleton = () => {
  return new PrismaClient({ log: ["info"] }).$extends(withAccelerate());
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
