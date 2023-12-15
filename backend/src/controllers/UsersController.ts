import { Request, Response } from "express";

import { prisma } from "../libs/prisma";

export class UsersController {
  async index(_: Request, response: Response) {
    const users = await prisma.user.findMany();

    return response.status(200).json(users);
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      cpf,
      phone,
      cep,
      state,
      city,
      district,
      street,
      number,
      complement,
    } = request.body;

    const userId = await prisma.$transaction(async (tx) => {
      let txUser = await tx.user.create({
        data: {
          email,
          pass_hash: "",
        },
      });

      await tx.userInformations.create({
        data: {
          name,
          cpf,
          phone,
          userId: txUser.id,
        },
      });

      await tx.userAddress.create({
        data: {
          cep,
          state,
          city,
          district,
          street,
          number,
          complement,
          userId: txUser.id,
        },
      });

      return txUser.id;
    });

    return response
      .status(200)
      .json({ message: `User created - Id: ${userId}` });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user)
      return response.status(400).json({ message: `User ${id} not found! ` });

    return response.status(200).json(user);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      email,
      name,
      cpf,
      phone,
      cep,
      state,
      city,
      district,
      street,
      number,
      complement,
    } = request.body;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user)
      return response.status(400).json({ message: `User ${id} not found! ` });

    await prisma.user.update({
      where: { id },
      data: {
        email,
        information: {
          update: {
            name,
            cpf,
            phone,
          },
        },
        address: {
          update: {
            cep,
            state,
            city,
            district,
            street,
            number,
            complement,
          },
        },
      },
    });

    return response.status(200).json(user);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await prisma.user.delete({
      where: { id },
    });

    return response.status(204).json();
  }
}
