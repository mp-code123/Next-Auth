import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { request } from 'http'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(req:NextRequest){
    try{
        const reqBody = await req.json()
        const {token} = reqBody
        console.log(reqBody)

        const user = await User.findOne({verifyToken:token, verifyTokenExpiry:{$gt:Date.now()}})
        if(!user){
            return NextResponse.json({error: "Invalid token"},{status:400})
        }
        console.log(user)
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()
        return NextResponse.json({error: "Email verified successfully",success:true},{status:200})

    }catch(error:any){
        return NextResponse.json({error: error.message},{status:500})
    }
}