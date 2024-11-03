import httpStatus from "http-status";
import { User } from "../models/user.model";
import bcrypt,{ hash } from "bcrypt";


const login = async(req,res) =>{

    const {username, password } = req.body;

    if(!username || !password){
        return res.status(400).json({message: "Please Provide"})
    }

    try{
           const user = await User.find({username});
           if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message: "User Not Found"})
           }

           if(bcrypt.compare(password, user.password)){
             let token = crypto.randomBytes
           }
    }catch (e){

    }
}

const register = async (req,res) =>{
    const {name, username, password} = req.body;


    try{
        const exsistingUser = await User.findOne({username});
        if (exsistingUser){
            return res.status(httpStatus.FOUND).json({message: "User already exisrs"})
        }
           
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(httpStatus.CREATED).json({message: "User Registered"})
    }
    catch (e){
         res.json({message: `Something went wrong ${e}`})
    }
}