import { GraphQLServer } from "graphql-yoga";

// Type definitions (schema)
const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        title() {
            return "Cheese"
        },
        price() {
            return 4.99
        },
        releaseYear() {
            return 2023
        },
        rating() {
            return null
        },
        inStock() {
            return true
        }
    }
}

const server = new GraphQLServer({
    typeDefs, resolvers
})

server.start(() => {
    console.log("I am a dif server running on port 4000")
})