const fs = require("fs")

const content = fs.readFileSync(
    "src/inputs/day3.txt",
    { encoding: 'utf8', flag: 'r' }
)

const lines = content.split('\n')

let sum = 0
let seen_hash = new Set()

for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // find all symbols
    for (let j = 0; j < line.length; j++) {
        if (line[j] == '.') continue
        if (!isNaN(parseInt(line[j]))) continue

        // find numbers touching a symbol
        for (let y = -1; y < 2; y++) {
            if (i + y < 0 || lines.length <= i + y) continue

            let row = i + y

            for (let x = -1; x < 2; x++) {
                if (j + x < 0 || lines[0].length <= j + x) continue

                let col = j + x
                const symbol = parseInt(lines[row][col])

                // ignore non-numbers
                if (isNaN(symbol)) continue

                let start, end

                // decrement to find start index
                for (let temp = col; 0 <= temp; temp--) {
                    if (isNaN(parseInt(lines[row][temp]))) break
                    start = temp
                }
                
                // increment to find end index
                for (let temp = col; temp < line.length; temp++) {
                    if (isNaN(parseInt(lines[row][temp]))) break
                    end = temp
                }

                const hash = `${row}, ${start}`

                // skip already seen
                if (seen_hash.has(hash)) continue 
                seen_hash.add(hash)

                sum += parseInt(lines[row].substring(start, end + 1))
            }
        }
    }
}


console.log("Part 1: ", sum)

let gear_ratio = 0
seen_hash = new Set()

for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // find all symbols
    for (let j = 0; j < line.length; j++) {
        if (line[j] != '*') continue

        let curr_ratio
        let num_seen = 0

        // find numbers touching a symbol
        for (let y = -1; y < 2; y++) {
            if (i + y < 0 || lines.length <= i + y) continue

            let row = i + y

            for (let x = -1; x < 2; x++) {
                if (j + x < 0 || lines[0].length <= j + x) continue

                let col = j + x
                const symbol = parseInt(lines[row][col])

                // ignore non-numbers
                if (isNaN(symbol)) continue

                let start, end

                // decrement to find start index
                for (let temp = col; 0 <= temp; temp--) {
                    if (isNaN(parseInt(lines[row][temp]))) break
                    start = temp
                }

                // increment to find end index
                for (let temp = col; temp < line.length; temp++) {
                    if (isNaN(parseInt(lines[row][temp]))) break
                    end = temp
                }

                const hash = `${row}, ${start}`

                // skip already seen
                if (seen_hash.has(hash)) continue 
                seen_hash.add(hash)

                const number = parseInt(lines[row].substring(start, end + 1))
                curr_ratio = curr_ratio ? curr_ratio * number : number
                num_seen += 1

            }
        }

        if (num_seen == 2) {
            gear_ratio += curr_ratio
        }
    }
}

console.log("Part 2: ", gear_ratio)
