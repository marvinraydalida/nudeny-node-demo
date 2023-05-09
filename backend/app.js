const express = require('express');
const cors = require('cors');
const multer = require('multer')
const fs = require('fs');
const FormData = require('form-data')

const upload = multer()
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(express.static('uploads'))

const db = []

app.post('/upload', upload.single('files'), async (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`
    const destinationPath = `uploads/${req.file.originalname}`;

    const formData = new FormData()
    formData.append(req.file.fieldname, req.file.buffer, req.file.originalname)

    fs.writeFileSync(destinationPath, req.file.buffer);
    db.push({
        'title': req.body.title,
        'url': baseUrl + `/${req.file.originalname}`
    })
    res.status(200).json(db)
})


app.listen(port, () => {
    console.log(`Server started at ${port}`)
})