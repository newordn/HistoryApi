
const post = async (parent,args,context,info)=>{
    const image = await context.storeUpload(args.image)
    const post = context.prisma.createPost({...args,image})
    return post
}

module.exports={
    post
}