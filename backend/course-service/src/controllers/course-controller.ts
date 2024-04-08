import { Request, Response } from "express";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { CourseHandler } from "../services/course-handler";

const getCourse = async (request: Request, response: Response) => {
  try {
    const { courseId } = request.query;
    const course = await CourseHandler.getCourseById(courseId as string);

    if (!course) {
      response.status(404).json({
        error: "NOT FOUND",
        message: "No courses found",
      });

      return;
    }

    response.status(200).json(course);
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      response.status(400).json({
        error: "Bad Requests",
        message: "Given fields are invalid syntax",
      });
      return;
    }
    console.log(error)
    response.status(501).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has occurred. Please try again later",
    });
  }
};

const postCourse = async (request: Request, response: Response) => {
  try {
    const { name, description } = request.body;

    const course = await CourseHandler.createCourse(name, description);

    response.status(200).json(course);
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      response.status(400).json({
        error: "Bad Requests",
        message: "Given fields are invalid syntax",
      });
      return;
    }
    console.log(error)
    response.status(501).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has occurred. Please try again later",
    });
  }
};

const updateCourse = async (request: Request, response: Response) => {
  try {
    const { name, description, id } = request.body;

    const data = { name: name, description: description };

    const course = await CourseHandler.updateCourse(data, id);

    response.status(200).json(course);
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      response.status(400).json({
        error: "Bad Requests",
        message: "Given fields are invalid syntax",
      });
      return;
    }
    console.log(error)
    response.status(501).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has occurred. Please try again later",
    });
  }
};

const deleteCourse = async (request: Request, response: Response) => {
  try {
    const { id } = request.query;

    const course = await CourseHandler.deleteCourse(id as string);

    response.status(200).json(course);
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      response.status(400).json({
        error: "Bad Requests",
        message: "Given fields are invalid syntax",
      });
      return;
    }
    console.log(error)
    response.status(501).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has occurred. Please try again later",
    });
  }
};

export const CourseController = {
  getCourse,
  postCourse,
  updateCourse,
  deleteCourse,
};
