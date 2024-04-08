import { Router } from "express";
import { CourseController } from "./controllers/course-controller";
import { CourseUserController } from "./controllers/course-user-controller";
import { CourseAssignmentController } from "./controllers/course-assignment-controller";

const router = Router();

router.get("/courses", CourseUserController.getCoursesByUserId);

router.get("/course", CourseController.getCourse);
router.post("/course", CourseController.postCourse);
router.delete("/course", CourseController.deleteCourse);
router.put("/course", CourseController.updateCourse);

router.get("/course/users", CourseUserController.getUsersByCourseId);
router.post("/course/users", CourseUserController.postCourseUser);
router.delete("/course/users", CourseUserController.deleteCourseUser);

router.get(
  "/course/assingments",
  CourseAssignmentController.getAssignmentsByCourseId
);
router.post(
  "/course/assingments",
  CourseAssignmentController.postCourseAssignment
);

export default router;
