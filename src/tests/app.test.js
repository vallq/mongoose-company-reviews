const request = require("supertest");
const app = require("../app");

describe("app.js", () => {
  describe("/", () => {
    it("GET / should return the API endpoints", async () => {
      const apiEndpoints = {
        "0": "GET /",
        "1": "GET /companies",
        "2": "GET /companies/:id",
        "3": "POST /companies/:id/reviews",
        "4": "GET /user"
      };
      const { body: response } = await request(app)
        .get("/")
        .expect(200);
      expect(response).toMatchObject(apiEndpoints);
    });
  });
});
