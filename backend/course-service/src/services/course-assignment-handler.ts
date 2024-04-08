import db from "../models/db";
import { CourseAssignment } from "../models/types/course-assignment";

const output = ({
  assignmentId,
  Course,
}: {
  assignmentId: string;
  Course: {
    uuid: string;
    name: string;
    description: string | null;
    createdOn: Date;
  };
}) => {
  return {
    assignmentId: assignmentId,
    id: Course.uuid,
    name: Course.name,
    description: Course.description ?? "",
    createdOn: Course.createdOn,
  } as CourseAssignment;
};

const createCourseAssignment = async (
  assignmentId: string,
  courseId: string
) => {
  const assignment = await db.course_Assignment.create({
    data: {
      assignmentId: assignmentId,
      courseId: courseId,
    },
    include: {
      Course: true,
    },
  });
  return output(assignment);
};

const getAssignmentsByCourseId = async (id: string) => {
  const assignments = await db.course_Assignment.findMany({
    where: {
      assignmentId: id,
    },
    include: {
      Course: true,
    },
  });

  if (!assignments) {
    return null;
  }

  return assignments.map((course) => output(course));
};

export const CourseAssignmentHandler = {
  createCourseAssignment,
  getAssignmentsByCourseId,
};
