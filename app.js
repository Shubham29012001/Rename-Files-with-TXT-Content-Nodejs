const fsPromises = require('fs').promises;
const path = require('path')
const fs = require('fs')

const renameFiles = async () => {
    try {

        // Read folder in the parent directory and filter folders & files
        const readDirectoryFolder = await fsPromises.readdir(path.join(__dirname))

        readDirectoryFolder.sort(function (a, b) {
            return parseInt(a) - parseInt(b);
        });

        const filterFolder = readDirectoryFolder.filter((fileName) => {
            return fs.lstatSync(fileName).isDirectory();
        })

        // Read line by line from lesson name txt
        const readChunk = fs.readFileSync('./lesson names.txt', 'utf-8');
        const splitChunk = readChunk.split(/\r?\n/);

        let chunkLine = 0;

        filterFolder.forEach(folder => {
            const innerVideos = fs.readdirSync(path.join(__dirname, folder));
            for (let i = 0; i < innerVideos.length; i++) {
                const fileName = innerVideos[i];
                const completeDirectory = path.join(__dirname, folder, fileName);
                const renameFileName = path.join(__dirname, folder, `${fileName} - ${splitChunk[chunkLine]}`);

                const data = `Old Dir ${fileName}\nNew Dir ${fileName} - ${splitChunk[chunkLine]}\n\n`;
                const newFileData = fs.appendFileSync('./changes.txt', data);

                chunkLine++;

                const renameFile = fs.renameSync(completeDirectory, renameFileName);
            }
        })
    }
    catch (error) {
        console.log(`Directory Error Occured ${error}`)
    }
}

renameFiles();