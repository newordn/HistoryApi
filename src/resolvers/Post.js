const comments = async (parent,args,context,info)=>{
    const comments = await context.prisma.post({id:parent.id}).comments({orderBy:'id_DESC'})
    return comments
}

module.exports = {
    comments
}