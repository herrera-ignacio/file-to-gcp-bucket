const { writeFile, appendFile, readdir } = require('fs/promises')
const path = require('path')

// Output CSV file path
const CSV_PATH = './test.csv'
// GCP bucket where to find those elements
const URL_PREFIX = 'gs://fashion-1-bucket/training/'
// Directory contains folders per each label
const BASE_DIR = 'C:\\Users\\ignac\\Downloads\\model\\out\\training'
// Array index map to folder name (e.g., folder "0" contains "top" items)
const LABELS = [
  'top',
  'trouser',
  'pullover',
  'dress',
  'coat',
  'sandal',
  'shirt',
  'sneaker',
  'bag',
  'ankle_boot'
]

const writeHeader = async () => {
  return writeFile(CSV_PATH, 'file_name,label\n')
}

const writeRows = async (rows) => {
  return appendFile(CSV_PATH, rows.join('\n'))
}

const getRows = async () => {
  const dirs = await readdir(BASE_DIR)
  let rows = []
  for await (const dir of dirs) {
    const rowsFromLabel = await getRowsByLabelId(dir)
    rows = [...rows, ...rowsFromLabel]
  }
  return rows
}

const getRowsByLabelId = async (id) => {
  const fileNames = await readdir(path.join(BASE_DIR, id))
  return fileNames.map(name => `${URL_PREFIX}${id}/${name},${LABELS[id]}`)
};

(async () => {
  await writeHeader()
  await writeRows(await getRows())
  console.log('Done!')
})()
