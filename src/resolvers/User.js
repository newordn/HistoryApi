const comments = async (parent,args,context,info)=>{
const comments = await context.prisma.user({id:parent.id}).comments()
return comments
}

module.exports={
    comments
}