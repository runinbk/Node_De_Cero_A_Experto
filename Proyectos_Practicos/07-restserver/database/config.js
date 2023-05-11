const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            /*
            mongoose ya no soporta el :  
            useCreateIndex: true,  
            useFindAndModify: false. 
            Hay que quitarlo para que se conecte a la DB
            */

        });
        console.log('Connected to MongoDB');
    } catch (error) {
        throw new Error('Error a la hora de iniciar la Base de Datos')
    }
}

module.exports = {
    dbConnection
}