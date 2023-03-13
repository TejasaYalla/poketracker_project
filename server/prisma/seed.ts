import { PrismaClient } from "@prisma/client";
import { pokemonData } from "../data/pokemon";
const prisma = new PrismaClient();

async function main() {
  for (let index = 0; index < pokemonData.length; index++) {
    const pokemon = pokemonData[index];

    await prisma.pokemon.upsert({
      where: {
        dex_number: pokemon.dex_number,
      },
      create: {
        dex_number: pokemon.dex_number,
        name: pokemon.name,
        type_1: pokemon.type_1,
        type_2: pokemon.type_2,
        image_url: pokemon.image_url,
        caught: false
      },
      update: {
        dex_number: pokemon.dex_number,
        name: pokemon.name,
        type_1: pokemon.type_1,
        type_2: pokemon.type_2,
        image_url: pokemon.image_url,
        caught: false
      },
    });
  }

  await prisma.user.upsert({
    where: {
      email: "samuelOak@pallettownlab.com",
    },
    create: {
      email: "samuelOak@pallettownlab.com",
      first_name: "Samuel",
      last_name: "Oak",
      password: "pokemon4eva1996!",
      is_admin: true

    },
    update: {
      email: "samuelOak@pallettownlab.com",
      first_name: "Samuel",
      last_name: "Oak",
      password: "pokemon4eva1996!",
      is_admin: true
    },
  });

  await prisma.user.upsert({
    where: {
      email: "tejasa@pallettownlab.com",
    },
    create: {
      email: "tejasa@pallettownlab.com",
      first_name: "tejasa",
      last_name: "yalla",
      password: "pokemon4eva1996!",
      is_admin: false
      
    },
    update: {
      email: "tejasa@pallettownlab.com",
      first_name: "tejasa",
      last_name: "yalla",
      password: "pokemon4eva1996!",
      is_admin: false
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
