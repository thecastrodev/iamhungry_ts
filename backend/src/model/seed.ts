import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const correios = await prisma.user.upsert({
    where: { email: "cecddsbl@correios.com.br" },
    update: {},
    create: {
      email: "cecddsbl@correios.com.br",
      pass_hash: await hash("123456", 6),
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

  const products = await prisma.product.createMany({
    data: [
      {
        name: "Empada Doce de Leite",
        price: 7.5,
        amount: 8,
      },
      {
        name: "Empada Chocolate",
        price: 9.5,
        amount: 10,
      },
    ],
  });

  const productTest = await prisma.product.create({
    data: {
      name: "Empada Leite Condensado",
      price: 7.5,
      amount: 7,
    },
  });

  const sale = await prisma.sale.create({
    data: {
      user_id: correios.id,
    },
  });

  const saleTest = await prisma.productsInSales.create({
    data: {
      product_id: productTest.id,
      sale_id: sale.id,
    },
  });

  console.log({ correios, products, productTest, sale, saleTest });
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
