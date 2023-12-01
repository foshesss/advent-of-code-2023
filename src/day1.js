const fs = require("fs")

const content = fs.readFileSync(
    "src/inputs/day1.txt",
    { encoding: 'utf8', flag: 'r' }
)

console.log(content.split('\n'))