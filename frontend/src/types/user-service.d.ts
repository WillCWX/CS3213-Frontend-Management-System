interface User {
  uid: number;
  role: string;
}

interface UserInfo {
  name: string;
  email: string;
  bio: string;
  avatarUrl?: string;
}

interface StudentInfo {
  uid: number;
  name: string;
}

interface ErrorResponse {
  data: ErrorData;
}

interface ErrorData {
  message: string;
}
