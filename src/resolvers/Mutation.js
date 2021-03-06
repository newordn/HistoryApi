const {APP_SECRET} = require('../helpers/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {getUserId} = require('../helpers/user')
const {notify} = require('../helpers/notification')
const post = async (parent,args,context,info)=>{
    const image = await context.storeUpload(args.image)
    const post = await context.prisma.createPost({...args,image:image.path})
    notify({title:post.title,bigText:post.description,message:post.description,subText:"history"})
    return post
}
const history = async (parent,args,context,info)=>{
    console.log("History Mutation")
    let history
    if(args.posts!==null)
    {
        
     let images =  await Promise.all(args.posts.map(async v=>await context.storeUpload(v.image)))
        images = images.map(v=>v.path)
        let posts = args.posts.map((v,i)=>({...v,image:images[i]}))
        history = await context.prisma.createHistory({...args,posts:{
        create:posts
        }})
    }
    else
     history = await context.prisma.createHistory({...args})
     notify({title:history.title,bigText:history.description,message:history.description,subText:"history"})
  
    return history
}
const signUp = async (parent,args,context,info)=>{
    console.log('signUp mutation')
    const password = await bcrypt.hash(args.password,10)
    const user = await context.prisma.createUser({...args,password})
    const token = jwt.sign({userId:user.id},APP_SECRET)
    return {
        token,user
    }
}
const signIn = async (parent,args,context,info)=>{
    console.log('signIN mutation')
    const user =  await context.prisma.user({phone:args.phone})
    if(!user){
        throw new Error("L'utilisateur n'existe pas. Inscrivez-vous")
    }
    const valid = await bcrypt.compare(args.password,user.password)
    if(!valid){
        throw new Error('Mot de passe incorrect')
    }
   
    const token = jwt.sign({userId: user.id},APP_SECRET)
    return {
        token,
        user
    }
}
const comment = async (parent,args,context,info)=>{
    console.log('comment mutation')
    const userId = getUserId(context)
    const postId = args.onPost
 const comment = await context.prisma.createComment({...args,onPost:{connect:{id:postId}},author:{connect:{id:userId}}})
 notify({title:comment.author.name,bigText:comment.content,message:comment.content,subText:"history"})
 return comment
}
const commentOnHistory = async (parent,args,context,info)=>{
    console.log('comment on history mutation')
    const userId = getUserId(context)
    const historyId = args.onHistory
 const comment = await context.prisma.createComment({...args,onHistory:{connect:{id:historyId}},author:{connect:{id:userId}}})
 return comment
}

const like = async (parent,args,context,info)=>{
    console.log('like mutation')
    const userId = getUserId(context)
    const postId = args.onPost
 const like = await context.prisma.createLike({...args,onPost:{connect:{id:postId}},author:{connect:{id:userId}}})
 return like
}
const likeOnHistory = async (parent,args,context,info)=>{
    console.log('like a history mutation')
    const userId = getUserId(context)
    const historyId = args.onHistory
 const like = await context.prisma.createLike({...args,onHistory:{connect:{id:historyId}},author:{connect:{id:userId}}})
 return like
}

module.exports={
    post,
    history,
    signUp,
    signIn,
    comment,
    like,
    commentOnHistory,
    likeOnHistory
}