import jwt from 'jsonwebtoken';

//Token generateToken and verify
const generateToken=async(data:any)=>{
    const token= jwt.sign({id:data,time:Date()},
    process.env.JWT_SECRET,{expiresIn:"30d"})
    return token;
};

const verifyToken =async(token:any)=>{
    try{
const verified= jwt.verify(token,process.env.JWT_SECRET);
return verified ?verified:false;
    }catch(e){
        return false;
    }
};

export{generateToken,verifyToken};