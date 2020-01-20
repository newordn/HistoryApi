
const posts = async (parent,args,context,info)=>{
    return await context.prisma.history({id:parent.id}).posts()
}
module.exports={
    posts
}