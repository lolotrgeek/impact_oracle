const path = require("path")
const express = require("express")
const cors = require('cors')
const { calc_impact } = require("./main")
const app = express()
app.use(cors())

const allowedParams = ["before", "after", "action"]

function Server(HTTP_PORT = 8002) {
    app.get("/", (req, res) => res.send("hi, this is an impact oracle."))
    app.get("/impact", (req, res) => {
        const urlParams = req.url.split('?')[1]; // Get the part of the URL after the "?"
        const queryParams = new URLSearchParams(urlParams); // Create a new URLSearchParams object
        const paramsObj = Object.fromEntries(queryParams.entries()); // Convert the URLSearchParams object to a plain object
        console.log(paramsObj)
        let values = Object.values(paramsObj)
        if (paramsObj.initial) res.json({ Hello: "Waiting for data Entry" })
        else if (values.length === 0 || values.some(value => value === '')) res.status(400).json({ error: "Please check query, missing values." })
        else if (allowedParams.some(param => param in paramsObj)) {
            let impact = calc_impact({before: paramsObj.before, after: paramsObj.after}, paramsObj.action)
            res.json(impact)

        }
        else res.status(400).json({ error: "Please Send valid params." })
    })
    app.listen(HTTP_PORT, () => console.log(`[Server] HTTP listening at http://localhost:${HTTP_PORT}`))
}

Server()