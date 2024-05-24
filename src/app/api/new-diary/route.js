import dbConnect from "@/lib/dbConnect";
import diaryModel from "@/models/Diary";

export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();
        console.log(body);
        const diary = await diaryModel.create(body)
        console.log(diary);
        if (!diary) {
            return Response.json(
                {
                    success: false,
                    message: "Creating diary content failed!"
                },
                {
                    status: 400
                }
            )
        }

        return Response.json(
            {
                success: true,
                message: "Diary saved successfully!"
            },
            {
                status: 200
            }
        )
    } catch (error) {
        console.log(error)
        return Response.json(
            {
                success: false,
                message: "Storing Diary content failed!"
            },
            {
                status: 500
            }
        )
    }

}