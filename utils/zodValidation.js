const zod=require('zod')

const userFormat=zod.object({
    email:zod.string().email(),
    password:zod.string().min(8),
    firstName:zod.string(),
    lastName:zod.string()
})

const adminFormat=zod.object({
    email:zod.string().email(),
    password:zod.string().min(8),
    firstName:zod.string(),
    lastName:zod.string()
})
const courseFormat=zod.object({
    title:zod.string(),
    url:zod.string(),
    price:zod.number()
})

module.exports={userFormat,adminFormat,courseFormat};