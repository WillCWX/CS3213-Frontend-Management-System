export const getCreateUserRequestBody: () => RegisterBody = () => {
  return {
    email: "test@example.com",
    password: "password12345",
    name: "Test",
    major: "Computer Science",
    role: "student",
  };
};
