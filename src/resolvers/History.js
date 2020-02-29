const comments = async (parent,args,context,info)=>{
    const comments = await context.prisma.history({id:parent.id}).comments({orderBy:'id_DESC',first:1})
    return comments
}
const posts = async (parent,args,context,info)=>{
    return await context.prisma.history({id:parent.id}).posts()
}
module.exports={
    posts,
    comments
}