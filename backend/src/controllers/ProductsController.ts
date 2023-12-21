import { Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { AppError } from "../errors/AppError";
import Zod from "zod";

export class ProductsController {
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new AppError("Error - Product not found!", 404);

    return response.status(200).json(product);
  }

  async listByName(request: Request, response: Response) {
    const { name } = request.params;

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    if (!products) throw new AppError("Error - Products not found!", 404);

    return response.status(200).json(products);
  }

  async index(_: Request, response: Response) {
    const products = await prisma.product.findMany();

    return response.status(200).json(products);
  }

  async createProduct(request: Request, response: Response) {
    const bodySchema = Zod.object({
      name: Zod.string().min(3),
      price: Zod.number(),
      amount: Zod.number(),
    }).strict();

    const { name, price, amount } = bodySchema.parse(request.body);

    const nameExists = await prisma.product.findFirst({
      where: { name },
    });
    if (nameExists) throw new AppError(`Conflit - Name already exists! `, 409);

    const product = await prisma.product.create({
      data: {
        name,
        price,
        amount,
      },
    });

    return response.status(200).json(product);
  }
}
