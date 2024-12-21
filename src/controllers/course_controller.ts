import { AppDataSource } from "config/conectiondb";
import { Request, Response } from "express";

export const create_Course = (req: Request, res: Response) => {
  const { course_name, course_duration, course_picture, description } =
    req.body;
  res.status(200).json({ message: "done" });
};
