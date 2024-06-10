import dbConnect from "@/lib/dbConnect";
import diaryModel from "@/models/Diary";

export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();
        const _id = body._id;
        const publicDiary = await diaryModel.findOne({ _id })

        if (!publicDiary) {
            return Response.json(
                {
                    success: true,
                    message: 'Diary not found'
                },
                {
                    status: 404
                }
            )
        }

        return Response.json(
            {
                success: true,
                message: 'Public Diaries Fetched Successfully!',
                publicDiary: publicDiary
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