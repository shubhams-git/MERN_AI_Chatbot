import app from "./app.js";
import { connectDB } from "./db/connection.js";
connectDB().then(() => {
    app.listen(5000, () => { console.log("Server Open"); });
}).catch((e) => {
    console.log(e);
});
//# sourceMappingURL=index.js.map