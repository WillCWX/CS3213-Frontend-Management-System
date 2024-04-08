import { Request, Response } from "express";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { CourseAssignmentHandler } from "../services/course-assignment-handler";

const getAssignmentsByCourseId = async (
  request: Request,
  response: Response
) => {
  try {
    const { courseId } = request.query;
    const assignments = await CourseAssignmentHandler.getAssignmentsByCourseId(
      courseId as string
    );

    if (!assignments) {
      response.status(404).json({
        error: "NOT FOUND",
        message: "No courses found",
      });

      return;
    }

    response.status(200).json(assignments);
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

const postCourseAssignment = async (request: Request, response: Response) => {
  try {
    const { assignmentId, courseId } = request.body;

    const course = await CourseAssignmentHandler.createCourseAssignment(
      assignmentId,
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

export const CourseAssignmentController = {
  getAssignmentsByCourseId,
  postCourseAssignment,
};
