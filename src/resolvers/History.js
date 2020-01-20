
const posts = async (parent,context,args,info)=>{
    return await context.prisma.history({id:parent.id}).posts()
}
module.exports={
    posts
}