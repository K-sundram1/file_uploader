// create a app
const express=require("express");

const  app=express();
// port from enc
require("dotenv").config();

const PORT=process.env.PORT||3000;
// middware
app.use(express.json());
// new middware to itreact with file uploadation
const fileUpload = require("express-fileupload");
app.use(fileUpload(

    {
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }
));

// database se connection
const db=require("./config/database")
db.connect();
// connection withcloudaniary
const cloudinary=require("./config/cloudaniary")
cloudinary.cloudinaryConnect();
// app mount
const Upload=require("./routes/fileUploads")


app.use("/api/v1/upload",Upload)

// start the server
app.listen(PORT,()=>{
    console.log(`the app connectes sucessfully at ${PORT}`);
})
