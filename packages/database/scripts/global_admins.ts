//just create  a global admin using seed method in the prisma client
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "global@gmail.com",
      emailVerified: new Date(),
      role: "ADMIN",
      isVerified: true,
      password: "global@gmail.com",
      Profile: {
        create: {
          name: "Global bro",
          phone: "1234567890",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s",
        },
      },
      Admin: {
        create: {
          role: "MASTER_ADMIN",
        },
      },
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
