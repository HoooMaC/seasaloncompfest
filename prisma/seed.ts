import { User, PrismaClient, Service } from '@prisma/client';
// import { UUID } from 'uuidjs';

const prisma = new PrismaClient();

const userSeed: User[] = [
  {
    id: 'fdsfjsfj43',
    image: null,
    emailVerified: null,
    email: 'thomas.n@compfest.id',
    name: 'Thomas N',
    password: 'Admin123',
    role: 'ADMIN',
  },
  {
    id: 'fdsfjsfj43213',
    image: null,
    emailVerified: null,
    email: 'example@example.com',
    name: 'example',
    password: 'example123',
    role: 'USER',
  },
  {
    id: 'fdsfjsfj4231',
    image: null,
    emailVerified: null,
    email: 'user1@example.com',
    name: 'user1',
    password: 'user1234',
    role: 'USER',
  },
];
/*
  id               String        @id @default(uuid())
  name             String
  durationInMinute Int
  image            String
  description      String?
  priceInRupiah    Int
*/

interface ServiceSeed {
  name: string;
  durationInMinute: number;
  image: string;
  description: string;
  priceInRupiah: number;
}
const serviceSeed: ServiceSeed[] = [
  {
    name: 'FACE',
    durationInMinute: 80,
    image: '',
    description: 'The best choice if you want to look younger in a minute',
    priceInRupiah: 100000,
  },
  {
    name: 'NAIL',
    durationInMinute: 90,
    image: '',
    description: 'The best nail service that you can find in the world',
    priceInRupiah: 75000,
  },
  {
    name: 'HAIR',
    durationInMinute: 50,
    image: '',
    description: 'Have problem with you hair. This is the solution for you.',
    priceInRupiah: 150000,
  },
];

async function main() {
  await prisma.user.createMany({
    data: userSeed,
  });
  await prisma.branch.create({
    data: {
      address: 'Sigura-gura',
      city: 'Malang',
    },
  });
  await prisma.service.createMany({
    data: serviceSeed,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async e => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
