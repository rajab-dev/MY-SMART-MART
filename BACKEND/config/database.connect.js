const mongoose = require("mongoose");

const connectToDB = () => {

  mongoose.connect(process.env.MONGO_DB_URI).then((data)=>{

    console.log(`MONGO_DB connected to server ${data.connection.host}`)

}).catch((err)=>{

    console.log(err)
})

}

module.exports = connectToDB;

