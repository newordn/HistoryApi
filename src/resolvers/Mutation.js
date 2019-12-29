
const post = async (parent,args,context,info)=>{
    const image = await context.storeUpload(args.image)
    const post = context.prisma.createPost({...args,image:image.path})
    return post
}

module.exports={
    post
}