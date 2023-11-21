import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import ShowImages from '@/components/ShowImages';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.API_SECRET
});


async function Home() {
    const { sneakers } = await cloudinary.api.resources_by_tag('random');
    console.log(sneakers)

    async function create(formData) {
        'use server'
        const file = formData.get('image');
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                tags: ['random']
            }, function (error, result) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            })
                .end(buffer);
        });
        revalidatePath('/')
    }
    return (
        <>
            <div>
                <h2 className="text-xl font-bold mb-4">Add a New Image</h2>
                <form action={create} className="bg-white border border-slate-200 dark:border-slate-500 rounded p-6 mb-6">
                    <p className="mb-6">
                        <label htmlFor="image" className="block font-semibold text-sm mb-2">
                            Select an Image to Upload
                        </label>
                        <input
                            id="image"
                            className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            type="file"
                            name="image"
                            required
                        />
                    </p>
                    <button className='bg-red-900' >Submit</button>
                </form>
                <h2 className="text-xl font-bold mb-4">Images</h2>
            </div>
            <ShowImages ></ShowImages>
        </>


    )
}

export default Home;