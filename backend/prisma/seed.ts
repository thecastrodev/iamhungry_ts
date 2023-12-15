import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const correios = await prisma.user.upsert({
    where: { email: "cecddsbl@correios.com.br" },
    update: {},
    create: {
      email: "cecddsbl@correios.com.br",
      pass_hash: "",
      information: {
        create: {
          name: "Correios",
          cpf: "999.888.777-14",
          phone: "(88) 99999-9999",
        },
      },
      address: {
        create: {
          cep: "62010-970",
          state: "CE",
          city: "Sobral",
          district: "Centro",
          street: "Rua Tabelião Ildefonso Cavalcante",
          number: "318",
          complement: "AC Sobral",
        },
      },
    },
  });
  console.log({ correios });
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
