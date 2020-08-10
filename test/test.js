var ffmetadata = require("ffmetadata");
 
// Read song.mp3 metadata
ffmetadata.read("../music/01 Bach_ Lute Suite In E Minor, BWV.mp3", function(err, data) {
    if (err) console.error("Error reading metadata", err);
    else console.log(data);
});
 
