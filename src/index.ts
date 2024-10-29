import app from "./app"
import databaseConnect from "./db/dbconnect";

const PORT = process.env.PORT || 5001;
databaseConnect().then( () => {
    app.listen(PORT, () => console.log(`App is starting at PORT ${PORT}`));
}). catch(
    (err)=> console.log(err))

