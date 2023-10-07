const cloudinary=require("cloudinary");
exports.cloudinaryConnect=()=>{
    try{

        cloudinary.config({
            // three parameter required
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET

        })
    }
    catch{

    }
}