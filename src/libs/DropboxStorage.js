import request from 'request';
import stream from 'stream';

class DropboxStorage {
  constructor(token) {
    this.token = token;
  }

  _handleFile(req, file, cb) {
    const fileName = Date.now() + '-' + file.originalname;
    const promised = this._upload(file.stream, fileName);
    promised.then(res => cb(null, res)).catch(err => cb(err));
  }

  _upload(fileStream, filename) {
    return new Promise((resolve, reject) => {
      const writeStream = request(
        {
          url: 'https://content.dropboxapi.com/2/files/upload',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/octet-stream',
            'Dropbox-API-Arg': `{\"path\":\"/uploads/${filename}\"}`,
          },
        },
        function(err, response, body) {
          if (err) {
            return reject(err);
          }
          try {
            const object = JSON.parse(body);
            resolve(object);
          } catch (e) {
            reject(e);
          }
          // console.log(arguments);
        },
      );
      return fileStream.pipe(writeStream);
    });
  }
  download(dropBoxPath) {
    return request({
      url: 'https://content.dropboxapi.com/2/files/download',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Dropbox-API-Arg': `{"path":"${dropBoxPath}"}`,
      },
    }).pipe(createTransformStream());
  }
}
function createTransformStream() {
  const streamInstance = new stream.Transform();
  streamInstance._transform = function(chunk, enc, done) {
    this.push(chunk);
    done();
  };
  return streamInstance;
}
export const dropboxStorage = new DropboxStorage(
  process.env.DROP_BOX,
);
