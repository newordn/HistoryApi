const author = async (parent,args,context,info)=>{
    const author = await context.prisma.like({id:parent.id}).author()
    return author
}
const onPost = async (parent,args,context,info)=>{
    const onPost = await context.prisma.like({id:parent.id}).onPost()
    return onPost
}
module.exports = {
    author,
    onPost
}