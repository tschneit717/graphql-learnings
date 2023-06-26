import { GraphQLServer } from 'graphql-yoga'


// Scalar types = string, int, float, boolean, ID
// Scalar type is a type that stores a single discreet value
// Non-scalar are things like arrays and objects

const users = [
    {
        id: 1,
        name: "Tom",
        email: "tschneit717@gmail.com",
        age: 29
    }, {
        id: 2,
        name: "Anna",
        email: "anna@example.com",
        age: 27
    }, {
        id: 3,
        name: "Jeff",
        email: "jeff.probst@cbs.com",
        age: 62
    },
]

const posts = [
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
    },
    {
        id: "post_3i22323",
        title: "How Jeff lives on Survivor",
        body: "Jeff is inhuman and loves to be on survivor",
        published: true
    }
]

// type defs (schema)
const typeDefs = `
    type Query {
        me: User!
        posts(query: String, isPublished: Boolean): [Post!]!
        users(query: String): [User!]!
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
        me(parent, args, ctx, info) {
            return {
                id: 'admin12312',
                name: 'Tom',
                email: 'tschneit717@gmail.com',
                age: 29
            }
        },
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }
            return users.filter(user => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })

        },
        posts(parent, args, ctx, info) {
            const { query, isPublished } = args
            if (!args.query && isPublished === null) {
                return posts
            }
            return posts.filter(post => {
                const titleMatch = post.title.toLowerCase().includes(query.toLowerCase())
                const bodyMatch = post.body.toLowerCase().includes(query.toLowerCase())

                if (isPublished === null) {
                    return titleMatch || bodyMatch
                }
                return (titleMatch || bodyMatch) && post.published === isPublished
            })

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