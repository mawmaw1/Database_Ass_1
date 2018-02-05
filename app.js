const fs = require('fs');
const readline = require('readline');
const [, , method, key, value] = process.argv;

var hashMap = new Map();


new Promise(function (resolve, reject) {

    // getting hashmap up2d8 from file
    const rl = readline.createInterface({
        input: require('fs').createReadStream('maps'),
    });
    rl.on('line', line => {
        newLine = line.split("=")
        hashMap.set(newLine[0], newLine[1])
    })
    rl.on('close', result => {
        resolve();
    })

}).then(function (result) {

    //read method
    if (method == "read") {
        a = hashMap.get(key)
        result = a.split(",")
        var readStream = fs.createReadStream('database', { start: parseInt(result[0]), end: parseInt(result[1]) });
        readStream.on('data', function (chunks) {
            const buf = Buffer.from(chunks)
            var regex = new RegExp("^" + key + "=(.*)$", "gm");
            var match = regex.exec(buf)
            console.log(match[1])
        })
    }

    //new addition method
    else if (method == "write") {
        fs.appendFile('database', key + "=" + value + '\n', function (err) {
            if (err) throw err;
            fs.readFile('database', 'utf8', function (err, data) {
                if (err) throw err;
                var regex = new RegExp("^" + key + "=(.*)$", "gm");
                var match, indexes = [];
                new Promise(function(resolve, reject){
                    while (match = regex.exec(data)) {
                        indexes.push([match[1], match.index, match.index + match[0].length]);
                    }
                    hashMap.set(key, [indexes[indexes.length - 1][1], indexes[indexes.length - 1][2]])
                    resolve()
                }).then(function(result){

                    //updating maps-hashtable-file
                    var stream = fs.createWriteStream("maps");
                    stream.once('open', function (fd) {
                        for (var [key, value] of hashMap) {
                            stream.write(key+"="+value+'\n')
                        }
                        stream.end();
                    });
                })
            });

        });
        console.log("Saved!")
    }
    //no method specified
    else {
        console.log("try again")
    }
})









