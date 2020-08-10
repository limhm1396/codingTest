const NodeID3 = require('node-id3')
 
/* Variables found in the following usage examples */
 
//  file can be a buffer or string with the path to a file
let file = '../music/01 Bach_ Lute Suite In E Minor, BWV.mp3';

async function read() {
    try {
        let tags = await NodeID3.read(file);
        console.log('title : ', tags.title);
        console.log('album : ', tags.album);
        console.log('artist : ', tags.artist);
    } catch (err) {
        console.error(err);
    }
}

read();

tags = {
    title: "Tomorrow",
    artist: "Kevin Penkin",
    album: "TVアニメ「メイドインアビス」オリジナルサウンドトラック",
  }

async function update () {
    try {
        //  Update existing ID3-Frame with new/edited tags
        let success = await NodeID3.update(tags, file); //  Returns true/false or, if buffer passed as file, the tagged buffer
        await NodeID3.update(tags, file, function(err, buffer) {  });
    } catch (err) {
        console.error(err);
    }
}

update();

tags = NodeID3.read(file);

read();