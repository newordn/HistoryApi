const post = async (parent,args,context,info)=>{
    const image = await context.storeUpload(args.image)
    const post = await context.prisma.createPost({...args,image:image.path})
    return post
}
const history = async (parent,args,context,info)=>{
    let history
    let images =  await Promise.all(args.posts.map(async v=>await context.storeUpload(v.image)))
    images = images.map(v=>v.path)
    let posts = args.posts.map((v,i)=>({...v,image:images[i]}))
    if(posts.length>0)
     history = await context.prisma.createHistory({...args,posts:{
        create:posts
    }})
    else
     history = await context.prisma.createHistory({...args})
    return history
}

module.exports={
    post,
    history
}