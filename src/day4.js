const fs = require("fs")

const content = fs.readFileSync(
    "src/inputs/day4.txt",
    { encoding: 'utf8', flag: 'r' }
)

const lines = content.split('\n')
let p1sum = 0

let num_matches = {}

for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    line = line.substring(line.indexOf(':') + 1, line.length)
    let [winning, possible] = line.split(" | ")
    winning = winning.split(" ")

    let seen = new Set()
    possible.split(" ").forEach(value => {
        if (value == '') return
        if (winning.indexOf(value) == -1) return
        if (seen.has(value)) return

        seen.add(value)
    })

    num_matches[i] = seen.size

    if (seen.size == 0) continue
    p1sum += 2**(seen.size - 1)
}

console.log("Part 1: ", p1sum)

let occurrences = []

for (let curr_card = 0; curr_card < lines.length; curr_card++) {
    occurrences[curr_card] = (occurrences[curr_card] || 0) + 1

    for (let j = 1; j < num_matches[curr_card] + 1; j++) {
        const new_card = curr_card + j
        if (num_matches.length < new_card - 1) break

        if (!occurrences[new_card]) occurrences[new_card] = 0
        occurrences[new_card] += occurrences[curr_card]
    }
}

let total_scratches = occurrences.reduce((acc, curr) => acc + curr)

console.log("Part 2: ", total_scratches)
