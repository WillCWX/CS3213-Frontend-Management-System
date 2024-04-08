import db from "../models/db";
import { CourseUser } from "../models/types/course-user";

const output = ({
  type,
  Course,
}: {
  type: string;
  Course: {
    uuid: string;
    name: string;
    description: string | null;
    createdOn: Date;
  };
}) => {
  return {
    type: type,
    id: Course.uuid,
    name: Course.name,
    description: Course.description ?? "",
    createdOn: Course.createdOn,
  } as CourseUser;
};

const createCourseUser = async (userId: number, courseId: string) => {
  const course = await db.course_User.create({
    data: {
      userId: userId,
      courseId: courseId,
    },
    include: {
      Course: true,
    },
  });
  return output(course);
};

const getCoursesByUserId = async (id: number) => {
  const courses = await db.course_User.findMany({
    where: {
      userId: id,
    },
    include: {
      Course: true,
    },
  });

  if (!courses) {
    return null;
  }

  return courses.map((course) => output(course));
};

const deleteCourseUser = async (userId: number, courseId: string) => {
  const course = await db.course_User.delete({
    where: {
      courseId_userId: {
        userId: userId,
        courseId: courseId,
      },
    },
    include: {
      Course: true,
    },
  });
  return output(course);
};

const getCourseUsersbyId = async (id: string) => {
  const courses = await db.course_User.findMany({
    where: {
      courseId: id,
    },
    include: {
      Course: true,
    },
  });

  if (!courses) {
    return null;
  }

  return courses.map((course) => output(course));
};

export const CourseUserHandler = {
  createCourseUser,
  getCoursesByUserId,
  deleteCourseUser,
  getCourseUsersbyId,
};
