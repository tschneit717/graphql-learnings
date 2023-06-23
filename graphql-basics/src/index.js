import { GraphQLServer } from 'graphql-yoga'


// Scalar types = string, int, float, boolean, ID
// Scalar type is a type that stores a single discreet value
// Non-scalar are things like arrays and objects

// type defs (schema)
const typeDefs = `
    type Query {
        me: User!
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

`

// resolvers
const resolvers = {
    Query: {
        me() {
            return {
                id: 'admin12312',
                name: 'Tom',
                email: 'tschneit717@gmail.com',
                age: 29
            }
        },
        posts() {
            return [
                {
                    id: "post_123123",
                    title: "How to write GQL",
                    body: "I am a post",
                    published: false
                }, {
                    id: "post_123121",
                    title: "How to write GQL Pt2",
                    body: "I am a post",
                    published: false
                }
            ]
        },
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("Server is up, running on port 4000")
})