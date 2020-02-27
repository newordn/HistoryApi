const comments = async (parent,args,context,info)=>{
const comments = await context.prisma.user({id:parent.id}).comments()
return comments
}
const likes = async (parent,args,context,info)=>{
    const likes = await context.prisma.user({id:parent.id}).likes()
    return likes
    }

module.exports={
    comments,
    likes
}