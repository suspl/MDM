const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type DbDetail {
  _id: ID!
  dbType: String!
  connectionName: String!
  hostName: String!
  port: String!
  userName: String!
  password: String!
  active: String!
}

input DbInput {
    dbType: String!
    connectionName: String!
    hostName: String!
    port: String!
    userName: String!
    password: String!
}

type Dbs {
    Database: String!
  }

type emp {
    EmpID: String!
    FirstName: String!
}


type RootQuery {
    dbConnectionDetails: [DbDetail!]!
    getDbDetailsById(Id: ID!): DbDetail!
    getDbList:[emp]
}

type RootMutation {
    addDbDetails(dbInput: DbInput): DbDetail!
    updateDbDetailsById(Id: ID!,dbInput: DbInput): DbDetail!
    deleteByIdDbDetailsById(Id: ID!): DbDetail!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
