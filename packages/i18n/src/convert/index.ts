import inquirer from 'inquirer'
import { json2tsv } from './json2tsv'
import { tsv2json } from './tsv2json'

const convert = async () => {
  const question = {
    message: 'What would you like to do?',
    type: 'list',
    name: 'type',
    choices: [
      {
        key: 't',
        name: 'JSON -> TSV',
        value: 'tsv'
      },
      {
        key: 'j',
        name: 'TSV -> JSON',
        value: 'json'
      }
    ]
  }

  const answer = await inquirer.prompt([question])

  switch (answer.type) {
    case 'tsv':
      json2tsv()
      break
    case 'json':
      tsv2json()
      break
    default:
      console.log('Invalid selection!')
      convert()
      break
  }
}

convert()
