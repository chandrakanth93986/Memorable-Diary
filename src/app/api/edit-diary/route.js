import dbConnect from "@/lib/dbConnect";
import diaryModel from "@/models/Diary";

export async function PUT(req) {
    await dbConnect();
    try {
        const body = await req.json()
        const _id = body._id
        await diaryModel.findByIdAndUpdate(_id, { title: body.title, content: body.content, favourite: body.favourite, publicMode: body.publicMode })
        
        return Response.json(
            {
                success: true,
                message: "Diary Saved Successful!"
            },
            {
                status: 201
            }
        )
    } catch (error) {
        console.log(error)
        return Response.json(
            {
                success: false,
                message: "Editing Diary failed!"
            },
            {
                status: 500
            }
        )
    }
}