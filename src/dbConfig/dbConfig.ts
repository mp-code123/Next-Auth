import mongoose from "mongoose"

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection
        connection.on("connected", () => {
            console.log('Connected Successfully')
        })
        connection.on("error", (err) => {
            console.log('Connection Error!' + err)
            process.exit()
        })

    } catch (error) {
        console.log("something went wrong connecting to db!");
        console.log(error)
    }
}

