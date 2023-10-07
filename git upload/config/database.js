const mongoose=require('mongoose');
require("dotenv").config();
// connect with db
exports.connect=()=>{
   mongoose.connect(process.env.MONGOOSE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
   })
.then(console.log("connection with db sucessfullly"))
.catch((error)=>{
    console.log("connection can not be competleted sucessfuly");
    console.log(error);
})
}