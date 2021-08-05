const Process = require("process");
const { EntitySchema } = require("typeorm");
const typeorm = require("typeorm");
const entities = require("./entity/user.js");

const config = {
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  entities: entities,
};
