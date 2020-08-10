const mm = require('music-metadata');
const util = require('util');
 
mm.parseFile('./music/02 Bach_ Lute Suite In E Minor, BWV.mp3')
  .then( metadata => {
    console.log('metadata : ', util.inspect(metadata));
    console.log('metadata-title : ', util.inspect(metadata.common.title));
    console.log('metadata-album : ', util.inspect(metadata.common.album));
    console.log('metadata-artist : ', util.inspect(metadata.common.artist));
  })
  .catch( err => {
    console.error(err.message);
  });