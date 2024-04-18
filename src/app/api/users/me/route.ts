import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from '@/helpers/getDataFromToken'

connect()

export async function POST(req: NextRequest) {
    // extract data from token 
    const userId = await getDataFromToken(req)
    const user = await User.findOne({_id:userId}).select("-password -username")
    // check if no user 
    return NextResponse.json({
        message: "User Found",
        data: user
    })
}