// now make a schema of rouetr
const mongoose=require("mongoose")
const nodemailer=require("nodemailer")
const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    imageUrl:{
        type:String,

    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
})
// export the modles fileve to create a node mailer

// we have use post hook method
fileSchema.post("save",async function(doc){

    // we have to create a transpoter
    try{

        console.log("docs-->>>" ,doc)
        let transpoter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port: 465, // Port for SSL/TLS
            secure: true,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS

            },
        });
        // now we have to send the mail
        let info=await transpoter.sendMail({
            from:`sundram`,
            to:doc.email,
            subject:"new file uploaded",
            html:'<h2>hello jee mail aa gya</h2><p>sb thik chal rha hai</p>'
        })
        console.log(info);
    }
    catch(error){
        console.log(error);
        return resizeBy.status(400).json({
            sucess:false,
            message:"error in sending the mail"
        })
    }
}

)

const File=mongoose.model("File", fileSchema);
module.exports=File;
