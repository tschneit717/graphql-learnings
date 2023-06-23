import { GraphQLServer } from 'graphql-yoga'


// Scalar types = string, int, float, boolean, ID
// Scalar type is a type that stores a single discreet value
// Non-scalar are things like arrays and objects

// type defs (schema)
const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
        me: User!
        post: Post!
        add(arg0: Float!, arg1: Float!): Float!
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
        greeting(parent, args, ctx, info) {
            if (args.name && args.position) {
                return `Hello ${args.name}, you are the best ${args.position}`
            }
            if (args.name) {
                return `Hello ${args.name}`
            } else {
                return "Hello stranger"
            }
        },
        add(parent, args, ctx, info) {
            return args.arg0 + args.arg1
        },
        me() {
            return {
                id: 'admin12312',
                name: 'Tom',
                email: 'tschneit717@gmail.com',
                age: 29
            }
        },
        post() {
            return {
                id: "post_123123",
                title: "How to write GQL",
                body: "I am a post",
                published: false
            }
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