const express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    multer = require('multer'),
    app = express()

app.use(express.static('www'))
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/movie', (req, res) => {
    console.log(req.body.data)
    function saveFile(fileName) {
        var fileText = fileName
        var fileName = `up/${fileName}.txt`
        fs.exists(fileName, exists => {
            if (!exists) {
                fs.appendFile(fileName, fileText)
            }
        })
    }

    fs.exists('up', exists => {
        if (exists) {
            for (var i = 0; i < req.body.data.length; i++) {
                saveFile(req.body.data[i])
            }
        }
        else {
            fs.mkdir('up', err => {
                if (!err) {
                    for (var i = 0; i < req.body.data.length; i++) {
                        saveFile(req.body.data[i])
                    }
                }
            })
        }
    })
    res.json({ code: 'success' })
})

app.get('/api/count', (req, res) => {
    fs.exists('up', exists => {
        if (exists) {
            fs.readdir('up', (err, files) => {
                if (!err) {
                    res.send(files)
                }
            })
        }
        else {
            res.send({ code: 'error', message: '还没有开始卖票！' })
        }
    })
})

app.listen(3000, err => console.log('玩命加载中...'))