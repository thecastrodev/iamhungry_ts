import { Request, Response } from "express";

export class StartController {
  public async show(_: Request, response: Response) {
    return response.status(200).json({
      message: "Start Server",
    });
  }
}
