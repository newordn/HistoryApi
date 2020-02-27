const comments = async (parent,args,context,info)=>{
    const comments = await context.prisma.post({id:parent.id}).comments({orderBy:'id_DESC'})
    return comments
}
const likes= async (parent,args,context,info)=>{
    const likes = await context.prisma.post({id:parent.id}).likes()
    return likes
}

module.exports = {
    comments,
    likes
}