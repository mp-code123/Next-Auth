import User from "@/models/userModel";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            const updatedUser = await User.findByIdAndUpdate(userId, {
                    $set: { verifyToken: hashToken, verifyTokenExpiry: Date.now() + 3600000 }
                }
            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,{
                $set:
                { forgotPasswordToken: hashToken, forgotPasswordTokenExpiry: Date.now() + 3600000 }
            }
            )
        }

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "4561880fae100e",
                pass: "3460e7625a861e"
            }
        });
        const mailOptions = {
            from: 'ana@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? " Verify Your Mail" : "Reset Your Password",
            html: "<b>Hello world?</b>",
            text: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a>`
        }
        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }


}