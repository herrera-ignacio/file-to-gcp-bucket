# Upload files to GCP

This script uploads all files in a given directory to a GCP bucket. It doesn't go through subdirectories!

## How to use

1. From GCP's Admin, get a service account with _Storage Object Creator_ role. Be aware that this doesn't grant permissions for viewing, editing or deleting/overwriting.
2. Get a `keys.json` file from the GCP service account and place it in this dir.
3. Replace the configuration constants with proper values:
   1. `BUCKET_NAME`: Destination GCP bucket name.
   2. `BUCKET_DESTINATION_FOLDER`: Destination folder name.
   3. `FOLDER_TO_UPLOAD`: Absolute path of folder that contains files to upload.
4. `yarn install`.
5. `yarn start`.
