const fs = require('fs')
const bancoCsv = 'database.csv'
const banco = fs.readFileSync(bancoCsv, "utf-8")

const regexTelefone = /\(\d{2}\)\s\d{4,5}-\d{4}/g

const matchRegexTelefone = banco.match(regexTelefone)
console.log(matchRegexTelefone);