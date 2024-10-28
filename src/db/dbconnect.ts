import { connect } from "mongoose"; 

export default async function databaseConnect() {
    try {
        await connect(process.env.MONGODB_URL);
        console.log(`App is connected to Database`)
    } catch (error) {

        console.log("error");
        throw new Error("Error connecting to mongodb");
        
    }
}