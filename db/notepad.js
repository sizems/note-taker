const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

let iterator = 1;
let dataArr;

class Note {
    read() {
        return readFile('db/db.json', 'utf8');
    }

    write(note) {
        return writeFile('db/db.json', JSON.stringify(note))
    }

    getNotes() {
        return this.read().then((data => {
            let dataArr = JSON.parse(data)
            // console.log(dataArr); //this works
            return dataArr;
        }))
        };
    

    addNote(note) {
        return this.getNotes()
        .then(data => {
            note.id = data.length + 1;
            data.push(note)
            return data;
        }).then(data => this.write(data))
    }

    delNote(delId) {
        return this.getNotes()
        .then(data => {
            const newData = data.filter(item => item.id != parseInt(delId));
            this.write(newData)
        .then(console.log("Item deleted!"));    
        })
        
}
}



module.exports = new Note();