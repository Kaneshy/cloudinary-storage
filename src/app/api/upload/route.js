import { NextResponse } from "next/server"
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";
// import { writeFile } from "fs/promises";
// import path, { resolve } from 'path'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.API_SECRET
});

export async function GET() {
    const { resources: sneakers } = await cloudinary.api.resources_by_tag('random');
    return NextResponse.json(sneakers)
}


export async function POST(request) {

    const data = await request.formData()
    const image = data.get('file')

    if (!image) {
        return NextResponse.json('no se ha subido')
    }
    const bytes = await image.arrayBuffer()
    const buffer = new Uint8Array(bytes)

    // guardarlo en memoria interna
    // const filePath = path.join(process.cwd(), 'assets', image.name)
    // await writeFile(filePath, buffer)

    const response = await new Promise((resolve, reject)=>{
        cloudinary.uploader.upload_stream({
            tags: ['random']
        }, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result)
        }).end(buffer)
    })
    revalidatePath('/')
   
    return NextResponse.json({
        message: 'img subida',
        url: response.secure_url
    })
}