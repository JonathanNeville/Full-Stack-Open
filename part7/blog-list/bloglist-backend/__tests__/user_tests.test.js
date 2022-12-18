const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const userInDb = require("../utils/test_helper");

const initialUsers = [
  {
    username: "root",
    name: "superuser",
    password: "safe",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  let userObject = new User(initialUsers[0]);
  await userObject.save();
});

describe("tests for adding new user", () => {
  test("creating user with already taken username results in error", async () => {
    const usersAtStart = await userInDb();

    const user = {
      username: "root",
      name: "superuser",
      password: "safe",
    };
    const result = await api.post("/api/users").send(user).expect(400);

    expect(result.body.error).toContain("Username already taken");

    const usersAtEnd = await userInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("creating user with to short username or password results in error", async () => {
    const usersAtStart = await userInDb();

    const user = {
      username: "io",
      name: "superuser",
      password: "df",
    };

    const result = await api.post("/api/users").send(user).expect(400);

    expect(result.body.error).toContain(
      "Username and password must be at least 3 characters long"
    );

    const usersAtEnd = await userInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("trying to add user without providing username or password results in error", async () => {
    const usersAtStart = await userInDb();

    const user = {
      name: "superuser",
    };

    const result = await api.post("/api/users").send(user).expect(400);

    expect(result.body.error).toContain(
      "Username and password must be provided"
    );

    const usersAtEnd = await userInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
