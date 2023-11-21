const request = require("supertest");
const app = require("../../../app"); // Replace with the actual path to your Express app file
const coursesController = require("../../../controllers/courses");
jest.mock("../../../controllers/courses", () => ({
  getCourses: jest.fn(),
}));

describe("GET /courses", () => {
  it("should respond with a 200 status and JSON data when getCourses succeeds", async () => {
    const mockCourses = [{ id: 1, name: "Course 1" }];

    coursesController.getCourses.mockResolvedValue(mockCourses);

    const response = await request(app).get("/courses");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockCourses);
  });

  it("should respond with a 500 status when getCourses fails", async () => {
    const mockError = "An error occurred";

    coursesController.getCourses.mockRejectedValue(mockError);

    const response = await request(app).get("/courses");

    expect(response.statusCode).toBe(500);
  });
});