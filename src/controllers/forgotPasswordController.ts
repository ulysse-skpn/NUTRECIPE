import { Request, Response } from "express";
import { logger } from "../lib/config/winston";
import { ApiError } from "../handlers/ApiError";
import { ForgotPasswordServiceImpl } from "../service/Impl/ForgotPasswordServiceImpl"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import crypto from 'crypto';

export class ForgotPasswordCtrl
{
    async forgotPassword(req:Request,res:Response)
    {
        const forgotPasswordServiceImpl:ForgotPasswordServiceImpl = new ForgotPasswordServiceImpl()

        try 
        {
            const login:string = req.body.login

            const exists:boolean = await forgotPasswordServiceImpl.userExists(login)

            if( exists )
            {
                const newPassword:string = await generateNewPassword()
    
                if( newPassword )
                {
                    mailer(login,newPassword)
                        .then( async () => {
                            await forgotPasswordServiceImpl.saveNewPassword(newPassword)
                        })
                        .catch( (err:any) => {
                            logger.error( `Method => FORGOTPASSWORD : ${err.message}` )
                            res.status(520).send( ApiError.unknown_error(err.message) )
                        })
                        .finally( () => {
                            res.status(200).send( "An email with your new password has be sent to you" )
                        })
                }
                else res.status(520).send( ApiError.unknown_error("An unknown error occured") )
            }
            else res.status(404).send( ApiError.not_found("User with this login doesn't exist") )
        } 
        catch (err:any) 
        {
            logger.error( `Method => FORGOTPASSWORD : ${err.message}` )
            res.status(520).send( ApiError.unknown_error(err.message) )
        }
    }

}

const generateNewPassword = async () =>
{
    const chars: string = "0123456789abcdefghijklmnopqrstuvwxyz!@#$*ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength: number = 8;
    let password: string = ""

    for ( let i = 0 ; i <= passwordLength; i++ ) 
    {
        const randomNumber:number = Math.floor( crypto.randomInt(1) * chars.length)
        password += chars.substring(randomNumber, randomNumber +1)
    }

    return password
}

async function mailer(login:string,newPassword:string)
{
    dotenv.config()

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        requireTLS: true,
        secure: true, // true for 465, false for other ports
        // auth: {
        // user: testAccount.user, // generated ethereal user
        // pass: testAccount.pass, // generated ethereal password
        // },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Nutrecipe App👻" <u.sekpon@gmail.com>', // sender address
        to: login, // list of receivers
        subject: "Forgotten Password", // Subject line
        text: "Forgotten Password", // plain text body
        html: `<p>
        Hello <b>${login}</b>,<br/>
        <b>Your new password is : ${newPassword}</b>
        <br/>
        Please , use this new password to log in the application. <br/>
        Click on this link to do so : <a href="http://${process.env.APP_HOST}:${process.env.APP_PORT}">http://${process.env.APP_HOST}:${process.env.APP_PORT}</a>
        </p>`, // html body
    });

    logger.info("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    logger.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}