const { isUtf8 } = require('buffer');
const express = require('express');
const app = express()
const fs = require('fs')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        res.render('index', { files: files })
    })
})



app.post('/', (req, res) => {

    const { fileName, fileData } = req.body;

    fs.writeFile(`./files/${fileName.split(' ').join('')}.txt`, fileData, (err) => {
        res.redirect('/')
    })

})


app.get('/files/:filename', (req, res) => {

    const { filename } = req.params;
    fs.readFile(`./files/${filename}`, 'utf-8', (err, data) => {
        res.render('show', { filename: filename, fileData: data })
    })

})


app.get('/edit/:filename', (req, res) => {
    res.render('edit',{filename:req.params.filename})
})

app.post('/edit/:filename', (req, res) => {
    
    const {editFileName} = req.body

    fs.rename(`./files/${req.params.filename}`, `./files/${editFileName.split(' ').join('')}.txt`, (err)=>{
        res.redirect('/')
    })
})


app.get('/delete/:filename',(req,res)=>{
    fs.rm(`./files/${req.params.filename}`, (err)=>{
        res.redirect('/')
    })
})

app.listen('3000')