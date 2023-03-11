import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient({
  log: [
    { emit: "event", level: "error" },
    { emit: "event", level: "warn" },
  ],
});

db.$on("error", (prismaError) => {
  console.error(prismaError);
});

db.$on("warn", (prismaWarn) => {
  console.warn(prismaWarn);
});
