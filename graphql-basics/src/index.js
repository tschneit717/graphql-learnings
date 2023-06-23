import { GraphQLServer } from 'graphql-yoga'


// Scalar types = string, int, float, boolean, ID
// Scalar type is a type that stores a single discreet value
// Non-scalar are things like arrays and objects

// type defs (schema)
const typeDefs = `
    type Query {
       id: ID!
       name: String!
       age: Int!
       employed: Boolean!
       gpa: Float
    }
`

// resolvers
const resolvers = {
    Query: {
        id() {
            return 'abc123'
        },
        name() {
            return 'Tom'
        },
        age() {
            return 29
        },
        employed() {
            return true
        },
        gpa() {
            return null
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("Server is up, running on port 4000")
})