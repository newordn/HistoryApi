const {GraphQLServer} = require('graphql-yoga')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const History = require('./resolvers/History')
const User = require('./resolvers/User')
const Comment = require('./resolvers/Comment')
const Post = require('./resolvers/Post')
const Like = require('./resolvers/Like')
const {prisma} = require('./generated/prisma-client')
const {storeUpload} = require('./helpers/upload')
const {GraphQLUpload}= require('graphql-upload')
const {makeExecutableSchema} = require('graphql-tools')
const {typeDefs} = require('./schema.graphql')

const resolvers = {
    Query,
    Mutation,
    Subscription,
    History,
    User,
    Comment,
    Post,
    Like,
    Upload: GraphQLUpload   
}
const schema = makeExecutableSchema({typeDefs,resolvers})
const server = new GraphQLServer({
    schema,
    context: request=>({...request,prisma,storeUpload})
})
server.start(()=>console.log("History Api is running on port http://localhost:4000"))