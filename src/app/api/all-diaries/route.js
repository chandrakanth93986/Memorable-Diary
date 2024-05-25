import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import diaryModel from "@/models/Diary";

export async function GET() {
    await dbConnect();
    try {
        const data = await getServerSession(authOptions)
        const diaries = await diaryModel.find({ email: data.user?.email })
        console.log(diaries)

        console.log(data)
        if (!data) {
            return Response.json(
                {
                    success: false,
                    message: 'User Data not found!'
                },
                {
                    status: 404
                }
            )
        }
        return Response.json(
            {
                success: true,
                message: 'Data Fetched Successfully!',
                diaries: diaries
            },
            {
                status: 200
            }
        )
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Unable to Get the data!'
            },
            {
                status: 500
            }
        )
    }
}