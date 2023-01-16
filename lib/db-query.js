const config = require("./config");
const { Client } = require("pg");

const logQuery = (statement, parameters) => {
  let timeStamp = new Date();
  let formattedTimeStamp = timeStamp.toString().substring(4, 24);
  console.log(formattedTimeStamp, statement, parameters);
};

const isProduction = (config.NODE_ENV === "production");

const CONNECTION = {
  user: 'newuser',
  database: 'todo-lists',
  password: '12345',
  port: 5432,
  host:'localhost',
  ssl: false,
};

module.exports = {
  async dbQuery(statement, ...parameters) {
    let client = new Client(CONNECTION);
    client.on('error', e => {
      console.error('Database error', e);
    });
    console.log("Connecting to client");
    await client.connect();
    console.log("client connected");
    logQuery(statement, parameters);
    let result = await client.query(statement, parameters);
    console.log("received results");
    await client.end();

    return result;
  }
};