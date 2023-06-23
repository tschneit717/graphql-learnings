import { GraphQLServer } from "graphql-yoga";

// Type definitions (schema)
const typeDefs = `
    type Query {
       post: Post
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
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
    typeDefs, resolvers
})

server.start(() => {
    console.log("I am a dif server running on port 4000")
})