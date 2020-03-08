
const info = ()=>{
      return  `Welcome on HistoryApi`}
const posts = async (parent,args,context,info)=>
{
    console.log('posts query')
 const posts = await context.prisma.posts({orderBy:'id_DESC'})
 return posts
}
const post = async (parent,args,context,info)=>{
    console.log('post query')
 const post = await context.prisma.post({id:args.id})
 return post
}
const histories = async (parent,args,context,info)=>{
    console.log('histories query')
    const histories = await context.prisma.histories({orderBy:'id_DESC'})
    return histories
}
const history = async (parent,args,context,info)=>{
    console.log('history query')
    const history = await context.prisma.history({id:args.id})
    return history
}
const commentsByPost = async (parent,args,context,info)=>{
    console.log('comments by post query')
    const comments = await context.prisma.post({id:args.postId}).comments({orderBy:'id_DESC'})
    return comments
}
const commentsByHistory = async (parent,args,context,info)=>{
    console.log('comments by history query')
    const comments = await context.prisma.history({id:args.historyId}).comments({orderBy:'id_DESC'})
    return comments
}
module.exports={
    info,
    posts,
    post,
    histories,
    history,
    commentsByPost,
    commentsByHistory
}