const fs = require("fs")
const path = require("path")
const modelsPath = path.resolve(__dirname)
fs.readdirSync(modelsPath).forEach(file => {
    file = file.replace(/\.[^/.]+$/, "")

    exports[file] = require(modelsPath + '/' + file);
    console.log(file)
})