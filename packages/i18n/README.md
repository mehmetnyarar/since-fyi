# I18n

This package provides translations for the supported languages and various utilities.

## Translations

Translations can be found under the `~/locales` directory.

## Utilities

### Convert

- json2tsv: Converts a TSV file to JSON
- tsv2json: Converts a JSON file to TSV

Any spreadsheet application can be used to create the initial TSV file (Google Spreadsheets is recommended). The TSV file is expected to be in the following format:

| usage       | namespace | key             | language1   | language2   | ... | languagen   |
| ----------- | --------- | --------------- | ----------- | ----------- | --- | ----------- |
| usage stats | common    | translation_key | translation | translation | ... | translation |

- You can run `yarn i18n:convert` and
  - select `TSV -> JSON` to generate JSON locales
  - select `JSON -> TSV` to generate TSV file
