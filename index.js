const fs = require('fs')
const path = require('path');
const { Storage } = require('@google-cloud/storage')

const BUCKET_NAME = 'gcp-bucket-name'
const BUCKET_DESTINATION_FOLDER = 'demo'
const FOLDER_TO_UPLOAD = '/absolute-path'

// Initialize storage
const storage = new Storage({
  keyFilename: './keys.json'
})

const bucket = storage.bucket(BUCKET_NAME)

/**
 *
 * @param {string} path to file
 */
const uploadToBucket = async (filePath, fileName) => {
  try {
    console.log(`⏳ ${fileName}`)
    await bucket.upload(path.join(filePath, fileName), { destination: BUCKET_DESTINATION_FOLDER })
    console.log(`✅ ${BUCKET_NAME}/${BUCKET_DESTINATION_FOLDER}/${fileName}`)
  } catch (err) {
    console.log(`❌ ${fileName} - ${err.message}`)
  }
}

const main = async () => {
  const fileNames = fs.readdirSync(FOLDER_TO_UPLOAD)
  await Promise.all(fileNames.map(fileName => uploadToBucket(FOLDER_TO_UPLOAD, fileName)))
};

(async () => main())()
