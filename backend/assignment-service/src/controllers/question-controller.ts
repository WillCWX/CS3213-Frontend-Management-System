import { Request, Response } from "express";
import HttpStatusCode from "../libs/enums/HttpStatusCode";
import { GetHandler } from "../services/questions/get-handler";
import { PostHandler } from "../services/questions/post-handler";
import { createReferenceSolutionValidator } from "../libs/validators/questions/create-reference-solution-validator";
import db from "../models/db";
import { ZodError } from "zod";
import { CreateTestCasesValidator } from "../libs/validators/questions/create-test-cases-validator";
import { PutHandler } from "../services/questions/put-handler";
import { DeleteHandler } from "../services/questions/delete-handler";
import { UpdateQuestionValidator } from "../libs/validators/questions/update-question-validator";
import { UpdateReferenceSolutionValidator } from "../libs/validators/questions/update-reference-solution-validator";
import { DeleteTestCaseValidator } from "../libs/validators/questions/delete-test-case-validator";
import { CreateQuestionValidator } from "../libs/validators/questions/create-question-validator";

const getQuestionById = async (request: Request, response: Response) => {
  try {
    const questionId = request.params.questionId;

    const question = await GetHandler.getQuestionById(questionId);

    if (!question) {
      response.status(HttpStatusCode.NOT_FOUND).json({
        error: "NOT FOUND",
        message: "Question not found",
      });
      return;
    }

    response.status(HttpStatusCode.OK).json(question);
  } catch (_error) {
    response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has ocurred. Please try again later",
    });
  }
};

const getQuestionTestCasesById = async (
  request: Request,
  response: Response
) => {
  try {
    const questionId = request.params.questionId;

    const testCases = await GetHandler.getQuestionTestCases(questionId);

    if (!testCases) {
      response.status(HttpStatusCode.NOT_FOUND).json({
        error: "NOT FOUND",
        message: "Test cases or question not found",
      });
      return;
    }

    response.status(HttpStatusCode.OK).json(testCases);
  } catch (_error) {
    response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has ocurred. Please try again later",
    });
  }
};

const getQuestionReferenceSolutionById = async (
  request: Request,
  response: Response
) => {
  try {
    const questionId = request.params.questionId;

    const referenceSolution =
      await GetHandler.getQuestionReferenceSolution(questionId);

    if (!referenceSolution) {
      response.status(HttpStatusCode.NOT_FOUND).json({
        error: "NOT FOUND",
        message: "Solution or question not found",
      });
      return;
    }

    response.status(HttpStatusCode.OK).json(referenceSolution);
  } catch (_error) {
    response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has ocurred. Please try again later",
    });
  }
};

const createQuestion = async (request: Request, response: Response) => {
  try {
    if (!request.body || Object.keys(request.body).length === 0) {
      response.status(HttpStatusCode.BAD_REQUEST).json({
        error: "BAD REQUEST",
        message: "Request body is empty",
      });
      return;
    }

    const assignmentId = request.params.id;
    const createQuestionBody = CreateQuestionValidator.parse({
      ...request.body,
      assignmentId,
    });

    if (
      Object.keys(createQuestionBody).length !==
      Object.keys(request.body).length
    ) {
      response.status(HttpStatusCode.BAD_REQUEST).json({
        error: "BAD REQUEST",
        message: "Request body must contain only the required fields",
      });
      return;
    }

    const question = await PostHandler.createQuestion(createQuestionBody);

    if (!question) {
      response.status(HttpStatusCode.NOT_FOUND).json({
        error: "NOT FOUND",
        message: "Assignment not found",
      });
    }

    response.status(HttpStatusCode.CREATED).json(question);
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      response.status(HttpStatusCode.BAD_REQUEST).json({
        error: "BAD REQUEST",
        message: error.message,
      });
      return;
    }
    response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has ocurred. Please try again later",
    });
  }
};

const createQuestionReferenceSolution = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body || Object.keys(request.body).length === 0) {
      response.status(HttpStatusCode.BAD_REQUEST).json({
        error: "BAD REQUEST",
        message: "Request body is empty",
      });
      return;
    }

    const questionId = request.params.questionId;

    const createQuestionReferenceSolutionBody =
      createReferenceSolutionValidator.parse({
        ...request.body,
        id: questionId,
      });

    if (
      Object.keys(createQuestionReferenceSolutionBody).length !==
      Object.keys(request.body).length
    ) {
      response.status(HttpStatusCode.BAD_REQUEST).json({
        error: "BAD REQUEST",
        message: "Request body must contain only the required fields",
      });
      return;
    }

    const isQuestionExists = await db.question.findUnique({
      where: {
        id: questionId,
      },
    });

    if (!isQuestionExists) {
      response.status(HttpStatusCode.NOT_FOUND).json({
        error: "NOT FOUND",
        message: "Question not found",
      });
      return;
    }

    const referenceSolution = await PostHandler.createQuestionReferenceSolution(
      createQuestionReferenceSolutionBody
    );

    response.status(HttpStatusCode.CREATED).json(referenceSolution);
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      response.status(HttpStatusCode.BAD_REQUEST).json({
        error: "BAD REQUEST",
        message: error.message,
      });
      return;
    }
    response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has ocurred. Please try again later",
    });
  }
};

const createQuestionTestCases = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body || Object.keys(request.body).length === 0) {
      response.status(HttpStatusCode.BAD_REQUEST).json({
        error: "BAD REQUEST",
        message: "Request body is empty",
      });
      return;
    }

    const questionId = request.params.id;

    const createQuestionTestCasesBody = CreateTestCasesValidator.parse({
      ...request.body,
      questionId,
    });

    if (
      Object.keys(createQuestionTestCasesBody).length !==
      Object.keys(request.body).length
    ) {
      response.status(HttpStatusCode.BAD_REQUEST).json({
        error: "BAD REQUEST",
        message: "Request body must contain only the required fields",
      });
      return;
    }

    const testCasesCreationResponse = await PostHandler.createQuestionTestCases(
      createQuestionTestCasesBody
    );

    response.status(HttpStatusCode.CREATED).json(testCasesCreationResponse);
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      response.status(HttpStatusCode.BAD_REQUEST).json({
        error: "BAD REQUEST",
        message: error.message,
      });
      return;
    }
    response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has ocurred. Please try again later",
    });
  }
};

const updateQuestionById = async (request: Request, response: Response) => {
  try {
    if (!request.body || Object.keys(request.body).length === 0) {
      response.status(HttpStatusCode.BAD_REQUEST).json({
        error: "BAD REQUEST",
        message: "Request body is empty",
      });
      return;
    }

    const questionId = request.params.questionId;
    const updateQuestionBody = UpdateQuestionValidator.parse({
      ...request.body,
      questionId,
    });

    if (
      Object.keys(updateQuestionBody).length !==
      Object.keys(request.body).length
    ) {
      response.status(HttpStatusCode.BAD_REQUEST).json({
        error: "BAD REQUEST",
        message: "Request body must contain only the required fields",
      });
      return;
    }

    const updatedQuestion =
      await PutHandler.updateQuestionById(updateQuestionBody);

    if (!updatedQuestion) {
      response.status(HttpStatusCode.NOT_FOUND).json({
        error: "NOT FOUND",
        message: "Question not found",
      });
      return;
    }

    response.status(HttpStatusCode.OK).json(updatedQuestion);
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      response.status(HttpStatusCode.BAD_REQUEST).json({
        error: "BAD REQUEST",
        message: error.message,
      });
      return;
    }

    response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has ocurred. Please try again later",
    });
  }
};

const updateQuestionReferenceSolution = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body || Object.keys(request.body).length === 0) {
      response.status(HttpStatusCode.BAD_REQUEST).json({
        error: "BAD REQUEST",
        message: "Request body is empty",
      });
      return;
    }

    const updateQuestionReferenceSolutionBody =
      UpdateReferenceSolutionValidator.parse(request.body);

    if (
      Object.keys(updateQuestionReferenceSolutionBody).length !==
      Object.keys(request.body).length
    ) {
      response.status(HttpStatusCode.BAD_REQUEST).json({
        error: "BAD REQUEST",
        message: "Request body must contain only the required fields",
      });
      return;
    }

    const updatedReferenceSolution =
      await PutHandler.updateQuestionReferenceSolution(
        updateQuestionReferenceSolutionBody
      );

    response.status(HttpStatusCode.OK).json(updatedReferenceSolution);
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      response.status(HttpStatusCode.BAD_REQUEST).json({
        error: "BAD REQUEST",
        message: error.message,
      });
      return;
    }

    response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has ocurred. Please try again later",
    });
  }
};

const deleteQuestionById = async (request: Request, response: Response) => {
  try {
    const questionId = request.params.id;

    const question = await DeleteHandler.deleteQuestion(questionId);

    if (!question) {
      response.status(HttpStatusCode.NOT_FOUND).json({
        error: "NOT FOUND",
        message: "Question not found",
      });
      return;
    }

    response.status(HttpStatusCode.NO_CONTENT).send();
  } catch (_error) {
    response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has ocurred. Please try again later",
    });
  }
};

const deleteQuestionReferenceSolutionById = async (
  request: Request,
  response: Response
) => {
  try {
    const questionId = request.params.id;

    const referenceSolution =
      await DeleteHandler.deleteQuestionReferenceSolution(questionId);

    if (!referenceSolution) {
      response.status(HttpStatusCode.NOT_FOUND).json({
        error: "NOT FOUND",
        message: "Reference solution not found",
      });
      return;
    }

    response.status(HttpStatusCode.NO_CONTENT).send();
  } catch (_error) {
    response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has ocurred. Please try again later",
    });
  }
};

const deleteQuestionTestCasesById = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body || Object.keys(request.body).length === 0) {
      response.status(HttpStatusCode.BAD_REQUEST).json({
        error: "BAD REQUEST",
        message: "Request body is empty",
      });
      return;
    }
    const questionId = request.params.questionId;

    const testCaseIds = DeleteTestCaseValidator.parse(request.body).testCaseIds;

    if (Object.keys(testCaseIds).length !== Object.keys(request.body).length) {
      response.status(HttpStatusCode.BAD_REQUEST).json({
        error: "BAD REQUEST",
        message: "Request body must contain only the required fields",
      });
      return;
    }

    const testCases = await DeleteHandler.deleteQuestionTestCases(
      questionId,
      testCaseIds
    );

    if (!testCases) {
      response.status(HttpStatusCode.NOT_FOUND).json({
        error: "NOT FOUND",
        message: "Test cases or question not found",
      });
      return;
    }

    response.status(HttpStatusCode.NO_CONTENT).send();
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      response.status(HttpStatusCode.BAD_REQUEST).json({
        error: "BAD REQUEST",
        message: error.message,
      });
      return;
    }

    response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL SERVER ERROR",
      message: "An unexpected error has ocurred. Please try again later",
    });
  }
};

export const QuestionController = {
  // GET
  getQuestionById,
  getQuestionTestCasesById,
  getReferenceSolutionByQuestionId: getQuestionReferenceSolutionById,
  // POST
  createQuestion,
  createQuestionReferenceSolution,
  createQuestionTestCases,
  // PUT
  updateQuestionById,
  updateQuestionReferenceSolution,
  // DELETE
  deleteQuestionById,
  deleteQuestionReferenceSolutionById,
  deleteQuestionTestCasesById,
};
