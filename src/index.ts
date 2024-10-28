import app from "./app"
import databaseConnect from "./db/dbconnect";

const port = process.env.PORT || 5001;
databaseConnect().then( () => {
    app.listen(port, () => console.log(`App is starting at PORT ${port}`));
}). catch(
    (err)=> console.log(err))

