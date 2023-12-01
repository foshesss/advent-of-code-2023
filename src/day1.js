const fs = require("fs")

const content = fs.readFileSync(
    "src/inputs/day1.txt",
    { encoding: 'utf8', flag: 'r' }
)

const lines = content.split('\n')
let p1total = 0

for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    let first, last

    for (let j = 0; j < line.length; j++) {
        // look for numbers, verifying character is a number with parseInt
        let n = parseInt(line[j])
        if (isNaN(n)) continue

        // only add first digit that is found
        if (first == undefined) first = n
        last = n
    }

    p1total += parseInt(first.toString() + last.toString())
}

console.log("Part 1: ", p1total)


const look_for = [
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    1, 2, 3, 4, 5, 6, 7, 8, 9
]

let p2total = 0

for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    let first, last
    let firstIndex = Number.MAX_VALUE // set to really high number, guaranteeing first pos
    let lastIndex = -1 // set to really low number, guaranteeing last pos

    look_for.forEach((value, index) => {
        const lowest_index = line.indexOf(value)
        const highest_index = line.lastIndexOf(value)

        // convert strings to numbers
        if (index < 9) {
            value = index + 1
        }

        // check for lowest position
        if (lowest_index != -1 && firstIndex > lowest_index) {
            first = value
            firstIndex = lowest_index
        }

        // check for highest position
        if (highest_index != -1 && lastIndex < highest_index) {
            last = value
            lastIndex = highest_index
        }
    })

    p2total += parseInt(first.toString() + last.toString())
}

console.log("Part 2: ", p2total)
