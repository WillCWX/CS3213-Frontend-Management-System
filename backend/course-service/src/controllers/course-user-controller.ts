import { Request, Response } from "express";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { CourseUserHandler } from "../services/course-user-handler";

const toNum = (courseId: string) => {
  if (isNaN(parseInt(courseId))) {
    throw new Error("Bad request");
  }
  return parseInt(courseId);
};

const getCoursesByUserId = async (request: Request, response: Response) => {
  try {
    const { courseId: userId } = request.query;
    const course = await CourseUserHandler.getCoursesByUserId(
      toNum(userId as string)
    );

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
    console.log(error);
    response.status(501).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has occurred. Please try again later",
    });
  }
};

const postCourseUser = async (request: Request, response: Response) => {
  try {
    const { userId, courseId } = request.body;

    const course = await CourseUserHandler.createCourseUser(
      toNum(userId),
      courseId
    );

    response.status(200).json(course);
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      response.status(400).json({
        error: "Bad Requests",
        message: "Given fields are invalid syntax",
      });
      return;
    }
    console.log(error);
    response.status(501).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has occurred. Please try again later",
    });
  }
};

const deleteCourseUser = async (request: Request, response: Response) => {
  try {
    const { userId, courseId } = request.body;

    const course = await CourseUserHandler.deleteCourseUser(
      toNum(userId),
      courseId
    );

    response.status(200).json(course);
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      response.status(400).json({
        error: "Bad Requests",
        message: "Given fields are invalid syntax",
      });
      return;
    }
    console.log(error);
    response.status(501).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has occurred. Please try again later",
    });
  }
};

const getUsersByCourseId = async (request: Request, response: Response) => {
  try {
    const { courseId } = request.query;
    const course = await CourseUserHandler.getCourseUsersbyId(
      courseId as string
    );

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
    console.log(error);
    response.status(501).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has occurred. Please try again later",
    });
  }
};

export const CourseUserController = {
  getCoursesByUserId,
  postCourseUser,
  deleteCourseUser,
  getUsersByCourseId,
};
