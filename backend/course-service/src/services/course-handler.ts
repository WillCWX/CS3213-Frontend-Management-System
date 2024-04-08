import db from "../models/db";
import { Course } from "../models/types/course";

const output = (course: {
  uuid: string;
  name: string;
  description: string | null;
  createdOn: Date;
}) => {
  return {
    id: course.uuid,
    name: course.name,
    description: course.description ?? "",
    createdOn: course.createdOn,
  } as Course;
};

const createCourse = async (name: string, description = "") => {
  const course = await db.course.create({
    data: {
      name: name,
      description: description,
    },
  });
  return output(course);
};

const getCourseById = async (id: string) => {
  const course = await db.course.findUnique({
    where: {
      uuid: id,
    },
  });

  if (!course) {
    return null;
  }

  return output(course);
};

const updateCourse = async (
  data: { name?: string; description?: string },
  id: string
) => {
  const course = await db.course.update({
    data: data,
    where: {
      uuid: id,
    },
  });
  return output(course);
};

const deleteCourse = async (id: string) => {
  const course = await db.course.delete({
    where: {
      uuid: id,
    },
  });
  return output(course);
};

export const CourseHandler = {
  getCourseById,
  createCourse,
  deleteCourse,
  updateCourse,
};
