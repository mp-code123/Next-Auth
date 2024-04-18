import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { request } from 'http'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { username, email, password } = reqBody
        // validation 
        console.log(reqBody)
        const user = await User.findOne({ email })
        if (!user) return NextResponse.json({ error: 'User does not exists' }, { status: 400 })
        console.log("user exists")

        const validPassword = bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({ error: "check your credentials"}, { status: 400 })

        }
        const payload = {
            id:user._id,
            username:user.username,
            email:user.email,
        }
        const token = await jwt.sign(payload,process.env.TOKEN_SECRET!,{expiresIn: '1h'})

        const response = NextResponse.json({
            message: "Logged in success",
            success: true
        })
        response.cookies.set('token',token,{
            httpOnly:true
        })
        return response
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}