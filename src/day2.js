const fs = require("fs")

const content = fs.readFileSync(
    "src/inputs/day2.txt",
    { encoding: 'utf8', flag: 'r' }
)

const lines = content.split('\n')
let p1sum = 0

for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // chop off the string "Game (#): "
    const first_colon = line.indexOf(':')
    line = line.substring(first_colon + 2)

    const matches = line.split("; ")
    let valid = true

    matches.forEach(match => {
        if (valid === false) return // if over limit, no need to continue searching

        let total_red = 0
        let total_blue = 0
        let total_green = 0;

        match.split(", ").forEach(round => {
            const round_length = round.length


            // check if string contains a color
            // if so, add it to the total
            if (round.indexOf("red") != -1) {
                total_red += parseInt(round.substring(0, round_length - 4))
            } else if (round.indexOf("blue") != -1) {
                total_blue += parseInt(round.substring(0, round_length - 5))
            } else if (round.indexOf("green") != -1) {
                total_green += parseInt(round.substring(0, round_length - 6))
            }
        })

        // check if this match pushed us opver the limit
        valid = total_red <= 12 && total_blue <= 14 && total_green <= 13
    })

    // add to sum p1sum if the match is valid (i + 1) == game id
    if (valid) {
        p1sum += (i + 1)
    }
}


console.log("Part 1: ", p1sum)

let p2sum = 0

for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // chop off the string "Game (#): "
    const first_colon = line.indexOf(':')
    line = line.substring(first_colon + 2)

    // get all matches
    const matches = line.split("; ")

    let smallest_red = -1
    let smallest_blue = -1
    let smallest_green = -1

    // determine smallest possible of each color
    matches.forEach(match => {
        (match.split(", ")).forEach(round => {
            const round_length = round.length


            if (round.indexOf("red") != -1) {
                smallest_red = Math.max(parseInt(round.substring(0, round_length - 4)), smallest_red)
            } else if (round.indexOf("blue") != -1) {
                smallest_blue = Math.max(parseInt(round.substring(0, round_length - 5)), smallest_blue)
            } else if (round.indexOf("green") != -1) {
                smallest_green = Math.max(parseInt(round.substring(0, round_length - 6)), smallest_green)
            }
        })
    })

    // add the smallest of each multiplied together
    p2sum += (smallest_red * smallest_blue * smallest_green)
}

console.log("Part 2: ", p2sum)
