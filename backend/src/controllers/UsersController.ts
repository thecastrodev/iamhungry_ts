import { Request, Response } from "express";
import Zod from "zod";
import { hash } from "bcrypt";

import { prisma } from "../libs/prisma";
import { AppError } from "../errors/AppError";
import { excludeFields } from "../utils/excludeFields";

export class UsersController {
  async index(_: Request, response: Response) {
    const users = await prisma.user.findMany();

    const usersWithoutPasshash = users.map((user) =>
      excludeFields(user, ["pass_hash"])
    );

    return response.status(200).json(usersWithoutPasshash);
  }

  async create(request: Request, response: Response) {
    const bodySchema = Zod.object({
      name: Zod.string().min(3),
      email: Zod.string().email(),
      password: Zod.string().min(6),
      cpf: Zod.string().length(14),
      phone: Zod.string().min(11),
      cep: Zod.string().min(5),
      state: Zod.string().min(2),
      city: Zod.string().min(3),
      district: Zod.string().min(3),
      street: Zod.string().min(3),
      number: Zod.string(),
      complement: Zod.string().min(3),
    }).strict();

    const {
      name,
      email,
      password,
      cpf,
      phone,
      cep,
      state,
      city,
      district,
      street,
      number,
      complement,
    } = bodySchema.parse(request.body);

    const emailExists = await prisma.user.findUnique({
      where: { email },
    });
    if (emailExists)
      throw new AppError(`Conflit - Email already exists! `, 409);

    const cpfExists = await prisma.userInformations.findFirst({
      where: { cpf },
    });
    if (cpfExists) throw new AppError(`Conflit - CPF already exists! `, 409);

    const user = await prisma.$transaction(async (tx) => {
      let txUser = await tx.user.create({
        data: {
          email,
          pass_hash: await hash(password, 6),
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

      return txUser;
    });

    const usersWithoutPasshash = excludeFields(user, ["pass_hash"]);

    return response.status(200).json(usersWithoutPasshash);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        information: true,
        address: true,
      },
    });

    if (!user) throw new AppError(`User ${id} not found! `, 404);

    const usersWithoutPasshash = excludeFields(user, ["pass_hash"]);

    return response.status(200).json(usersWithoutPasshash);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const bodySchema = Zod.object({
      name: Zod.string().nullish(),
      email: Zod.string().email().nullish(),
      cpf: Zod.string().length(14).nullish(),
      phone: Zod.string().min(11).nullish(),
      cep: Zod.string().min(5).nullish(),
      state: Zod.string().min(2).nullish(),
      city: Zod.string().min(3).nullish(),
      district: Zod.string().min(3).nullish(),
      street: Zod.string().min(3).nullish(),
      number: Zod.string().nullish(),
      complement: Zod.string().min(3).nullish(),
    }).strict();
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
    } = bodySchema.parse(request.body);

    const userExists = await prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) throw new AppError("User not found!", 404);

    let data_email;
    if (email) data_email = email;

    let data_info = {};
    if (name) data_info = { name };
    if (cpf) data_info = { ...data_info, cpf };
    if (phone) data_info = { ...data_info, phone };

    let data_address = {};

    if (cep) data_address = { cep };
    if (state) data_address = { ...data_address, state };
    if (city) data_address = { ...data_address, city };
    if (district) data_address = { ...data_address, district };
    if (street) data_address = { ...data_address, street };
    if (number) data_address = { ...data_address, number };
    if (complement) data_address = { ...data_address, complement };

    const user = await prisma.user.update({
      where: { id },
      data: {
        email: data_email,
        information: {
          update: data_info,
        },
        address: {
          update: data_address,
        },
      },
    });

    const usersWithoutPasshash = excludeFields(user, ["pass_hash"]);

    return response.status(200).json(usersWithoutPasshash);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new AppError("User not found!", 404);

    await prisma.user.delete({
      where: { id },
    });

    return response.status(204).json();
  }
}
