import jwt from "jsonwebtoken";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

dotenv.config();

export function register(req, res){
    const data = req.body;

    data.password = bcrypt.hashSync(data.password, 10); //encription with hashSync function 

    const user = new User(data);

    user.save().then(
        ()=>{
            res.json({
                massage : "Register Successfully...!"
            })
        }
    ).catch(
        (error)=>{
            res.status(500).json({
                massage : "Register Unsuccessfull...!",
                error : error
            })
        }
    )
}

export function loginUser(req, res){
    const data = req.body;

    User.findOne({
        email : data.email
    }).then(
        (user)=>{
            if (user === null){
                
                res.json({
                    massage : "User not Found.",
                })
            }
            else{
                const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

                if(isPasswordCorrect){
                    const token = jwt.sign({
                    firstName : user.firstName,
                    lastName : user.lastName,
                    role : user.role,
                    email : user.email
                }, process.env.SECRET_PW);
                res.json({
                        massage : "Login Successfull...!",
                        token : token
                    })
                }
                else{
                    res.json({
                        massage : "Login failed...!"
                    })
                }
            }
        }
    )
}

