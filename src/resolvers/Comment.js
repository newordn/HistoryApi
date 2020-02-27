const author = async (parent,args,context,info)=>{
    const author = await context.prisma.comment({id:parent.id}).author()
    return author
}

const onPost = async (parent,args,context,info)=>{
    const post = await context.prisma.comment({id:parent.id}).onPost()
    return post
}

module.exports={
    author,
    onPost
}