// take out route from 
const File=require("../modles/fille");

exports.localFileUpload=async(req,res)=>{
    try{

        // try to fetch the file
        const file=req.files.file;
        console.log(file)
        const path=__dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`;
        // move krwama
        file.mv(path,(error)=>{
            console.log(error);

        });
        // res ki body me parsw
        res.json({
            sucess:true,
            message:"local file uploaded  sucesssfully"
        })

    }
    catch(error){
        console.log(error);
    }
}
const cloudinary = require('cloudinary').v2; // Make sure to import cloudinary

async function uploadimagetocloudinary(file, folder) {
    const options = { folder };
    // this line because we this help in auto didaction
    options.resource_type="auto";
    
    return await cloudinary.uploader.upload(file.tempFilePath, options); // Use tempFilePath instead of TempFilespath
}

function issupported(type, supportedtype) {
    return supportedtype.includes(type);
}

exports.imageUpload = async (req, res) => {
    try {
        const { image, tags, email } = req.body;
        const file = req.files.imagefile;
        console.log(file);

        const supportedtype = ["jpg", "png", "jpeg"];
        const filetype = file.name.split('.')[1].toLowerCase();

        if (!issupported(filetype, supportedtype)) {
            return res.status(400).json({
                success: false,
                message: "File format does not match supported types"
            });
        }

        const response = await uploadimagetocloudinary(file, "sundram");
        console.log(response);

        // Assuming you have a "File" model defined elsewhere
        const filedata = await File.create({
            name: image, // You may want to use the 'image' variable here instead of 'name'
            tags,
            email,
            imageurl: response.secure_url
        });

        res.json({
            success: true,
            message: "Added successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
}
// video upload 
exports.videoupload=async(req,res)=>{
    try{
        // fetch the data
        const { image, tags, email } = req.body;
        const file = req.files.videofile;
        console.log(file);
        const supportedtype = ["mp4", "mov"];
        const filetype = file.name.split('.')[1].toLowerCase();
        if (!issupported(filetype, supportedtype)) {
            return res.status(400).json({
                success: false,
                message: "File format does not match supported types"
            });
        }

        const response = await uploadimagetocloudinary(file, "sundram");
        const filedata = await File.create({
            name: image, // You may want to use the 'image' variable here instead of 'name'
            tags,
            email,
            imageurl: response.secure_url
        });

        console.log(response);
        res.json({
            success: true,
            message: "video added  successfully"
        });


    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
}
