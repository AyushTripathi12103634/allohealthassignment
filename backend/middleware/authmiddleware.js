import JWT from 'jsonwebtoken';

export const requireSignIn = async (req,res,next) => {
    try {    
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user=decode;
        next();
    } catch (error) {
        return res.status(500).send({
            success: false,
            message:"user not logged in. please log in"
        })
    }
}