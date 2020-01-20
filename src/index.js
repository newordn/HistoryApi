const {GraphQLServer} = require('graphql-yoga')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const History = require('./resolvers/History')
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
    Upload: GraphQLUpload   
}
const schema = makeExecutableSchema({typeDefs,resolvers})
const server = new GraphQLServer({
    schema,
    context: request=>({...request,prisma,storeUpload})
})
server.start(()=>console.log("History Api is running on port http://localhost:4000"))