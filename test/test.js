const mm = require('music-metadata');
const util = require('util');

mm.parseFile('./music/02 Bach_ Lute Suite In E Minor, BWV.mp3')
    .than(metadata => {
        console.log(util.inspect(metadata, { showHidden: false, depth: null }));
    })
    .catch(err => {
        console.error(err.message);
    });