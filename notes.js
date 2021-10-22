const chalk = require('chalk')
const fs = require('fs')

const getNotes = function () {
    return 'Your notes...'
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = function(title){
    console.log("removing ",title)
    const notes = loadNotes() 
    const notesKeep = notes.filter(function(note){
       return note.title !== title

    }) 
    saveNotes(notesKeep)

if (notesKeep.length < notes.length)
{
    console.log(chalk.inverse.greenBright("Note with the title: ", chalk.redBright(title), "removed!!"))
}
else {
    console.log(chalk.inverse.red("Note with the title: ", chalk.redBright(title), " not removed!!"))
} 
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse.greenBright("Your Notes:"))
    notes.forEach(note => {
        console.log(chalk.inverse.grey(note.title))
    });
}
const findNote = (title) =>{
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
} 
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    findNote: findNote
}