import request from "supertest";
import app from "../app";

test("should return server landing page", async () => {
  const response = await request(app).get("/");
  expect(response.status).toEqual(200);
  expect(response.body.send).toEqual("✨Hello Server!");
});
