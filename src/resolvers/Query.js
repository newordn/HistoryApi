const info = ()=> `Welcome on HistoryApi`
const posts = async (parent,args,context,info)=>
{
 const posts = await context.prisma.posts({orderBy:'id_DESC'})
 return posts
}
const post = async (parent,args,context,info)=>{
 const post = await context.prisma.post({id:args.id})
 return post
}

module.exports={
    info,
    posts,
    post
}