const moment = require('moment')
const author = async (parent,args,context,info)=>{
    const author = await context.prisma.comment({id:parent.id}).author()
    return author
}

const onPost = async (parent,args,context,info)=>{
    const post = await context.prisma.comment({id:parent.id}).onPost()
    return post
}
const createdAt = async (parent,args,context,info)=>{
    const createdAt = await context.prisma.comment({id:parent.id}).createdAt()
    return moment(createdAt).fromNow()
}
module.exports={
    author,
    onPost,
    createdAt
}