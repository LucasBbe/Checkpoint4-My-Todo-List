import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

class UserRepository {
  async create(user: Omit<User, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
      [user.name, user.email, user.password],
    );

    return result.insertId;
  }

  async findByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );

    return rows[0] as User | undefined;
  }
}

export default new UserRepository();
