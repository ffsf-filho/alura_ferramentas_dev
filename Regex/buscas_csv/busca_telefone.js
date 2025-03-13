const fs = require('fs')
const bancoCsv = 'database.csv'
const banco = fs.readFileSync(bancoCsv, "utf-8")

const regexTelefone = /\(\d+\)\s\d+-\d+/g

const matchRegexTelefone = banco.match(regexTelefone)
console.log(matchRegexTelefone);