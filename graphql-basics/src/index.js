import { GraphQLServer } from 'graphql-yoga'
import { v4 as uuidv4 } from 'uuid';

// Scalar types = string, int, float, boolean, ID
// Scalar type is a type that stores a single discreet value
// Non-scalar are things like arrays and objects

const users = [
    {
        id: "1",
        name: "Tom",
        email: "tschneit717@gmail.com",
        age: 29,
    }, {
        id: "2",
        name: "Anna",
        email: "anna@example.com",
        age: 27
    }, {
        id: "3",
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
        published: false,
        author: "1",
        comments: ['comment_1231230123']
    }, {
        id: "post_123121",
        title: "How to write GQL Pt2",
        body: "I am a post",
        published: false,
        author: "1",
        comments: ['comment_3231234123232']
    },
    {
        id: "post_3i22323",
        title: "How Jeff lives on Survivor",
        body: "Jeff is inhuman and loves to be on survivor",
        published: true,
        author: "3",
        comments: ['comment_123092134324', 'comment_092348324234']
    }
]

const comments = [
    {
        id: 'comment_1231230123',
        text: 'Good article',
        author: '3',
        post: 'post_123123'
    },
    {
        id: 'comment_123092134324',
        text: 'Amazing stuff',
        author: '3',
        post: 'post_3i22323'
    },
    {
        id: 'comment_092348324234',
        text: 'gee willikers',
        author: '3',
        post: 'post_3i22323'
    },
    {
        id: 'comment_3231234123232',
        text: 'You are a legend',
        author: '3',
        post: 'post_123121'
    }
]

// type defs (schema)
const typeDefs = `
    type Query {
        me: User!
        posts(query: String, isPublished: Boolean): [Post!]!
        users(query: String): [User!]!
        comment(query: String): [Comment!]!
    }


    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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
            console.log(query, isPublished)
            if (query === undefined && isPublished === undefined) {
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
        comment(parent, args, ctx, info) {
            const { query } = args
            if (query) {
                return comments.filter(comment => comment.text.toLowerCase().includes(query.toLowerCase()))
            } else {
                return comments
            }
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some(user => user.email === args.email)
            if (emailTaken) {
                throw new Error('User email is taken')
            }

            const user = {
                id: uuidv4(),
                name: args.name,
                email: args.email,
                age: args.age
            }

            users.push(user)
            return user
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author)
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => {
                return !!parent.comments.find(parentComment => parentComment === comment.id)
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter(post => post.author === parent.id)
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.author === parent.id)
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author)
        },
        post(parent, args, ctx, info) {
            return posts.find(post => post.id === parent.post)
        }
    },
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("Server is up, running on port 4000")
})