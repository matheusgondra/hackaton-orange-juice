import app from "./config/app";
import env from "./config/env";

app.listen(env.port, () => console.log(`Server is running: http://localhost:${env.port}`));
