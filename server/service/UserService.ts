import Knex from "knex";
import { IUser } from './models';

// interface IUser {
//   id: number;
//   username: string;
//   password: string;
//   role_id: number;
// }

export class UserService {
  constructor(private knex: Knex) {}

  async getUserByName(username: string) {
    const user = await this.knex<IUser>("users").where({ username }).first();
    return user;
  }


  async getUserById(id: number) {
    return (await this.knex.raw(`SELECT * FROM users WHERE id = ?`, [id])).rows[0];
}
// getUserById, for guard.ts

}


