import "dotenv/config"

import app from "./app";


import { connectdb } from "./config/db";

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    await connectdb();

    app.listen(PORT, () => {
        console.log(`app is running to port ${PORT}`);
    });
};

startServer();