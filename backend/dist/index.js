import express from "express";
const app = express();
app.use(express.json());
app.get("/hello", (req, res) => {
    return res.send("Response from /hello endpoint");
});
app.post("/:id", (req, res) => {
    console.log(req.params.id);
    return res.send("Success");
});
app.listen(5000, () => { console.log("Server Open"); });
//# sourceMappingURL=index.js.map