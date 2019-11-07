import { dropboxStorage } from '../libs/DropboxStorage';

const multer = require('multer');

const uploader = multer({ storage: dropboxStorage });
export function upload() {
  return [
    uploader.single('file'),
    function(req, res) {
      const file = Object.assign({}, req.file);
      res.send(file);
    },
  ];
}
export function download(req, res) {
  dropboxStorage
    .download('/uploads/' + req.params.filename)
    .pipe(res);
}
