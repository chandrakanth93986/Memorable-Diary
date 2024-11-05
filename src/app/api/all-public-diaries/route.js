import dbConnect from "@/lib/dbConnect";
import diaryModel from "@/models/Diary";

export async function GET() {
    await dbConnect();
    try {
        const publicDiaries = await diaryModel.find({ publicMode: true })
        console.log(publicDiaries);
        return Response.json(
            {
                success: true,
                message: 'Public Diaries Fetched Successfully!',
                publicDiaries: publicDiaries
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