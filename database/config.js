const mongoose = require('mongoose');
//user: benito_bd
//pass: i216wHjOte52fLkj
//url:  mongodb+srv://benito_bd:i216wHjOte52fLkj@cluster0.dfhp0.mongodb.net/test

const bdConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            //useFindOneAndUpdate: true,
            //useFindOneAndDelete:true
        });        
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD revise los logs');
    }
}

module.exports = { bdConnection }
