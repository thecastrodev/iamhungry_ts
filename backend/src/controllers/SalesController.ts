import { Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { AppError } from "../errors/AppError";

interface Product {
  id: string;
  name: string;
  price: number;
  amount: number;
}

export class SalesController {
  async index(_: Request, response: Response) {
    const sales = await prisma.productsInSales.findMany({
      include: {
        sale: true,
        product: true,
      },
    });

    return response.status(200).json(sales);
  }

  async create(request: Request, response: Response) {
    const { product, user_id } = request.body;

    const productVerifed = await prisma.product.findUnique({
      where: { id: product.id },
    });

    if (!productVerifed) throw new AppError("Error - Product not found!", 404);

    const doneSale = await prisma.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: {
          user_id,
        },
      });

      const productsInSale = await tx.productsInSales.create({
        data: {
          product_id: productVerifed.id,
          sale_id: sale.id,
        },
      });

      return productsInSale;
    });

    return response.status(200).json(doneSale);
  }
}
