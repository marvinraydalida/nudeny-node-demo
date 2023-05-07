const express = require('express');
const cors = require('cors');
const multer = require('multer')
const fs = require('fs');
const FormData = require('form-data')
const nudeny = require('nudeny')

const upload = multer()
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(express.static('uploads'))

const db = []

app.post('/upload', upload.single('files'), async (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`

    const formData = new FormData()
    formData.append(req.file.fieldname, req.file.buffer, req.file.originalname)

    // const result = await nudeny.classifyMultiPartForm(formData)
    // console.log(result.data)

    // const classification = result.data.Prediction[0].class;
    // if (classification === 'safe') {
    //     const destinationPath = `uploads/${req.file.originalname}`;
    //     fs.writeFileSync(destinationPath, req.file.buffer);
    //     db.push({
    //         'title': req.body.title,
    //         'url': baseUrl + `/${req.file.originalname}`
    //     })
    //     res.status(200).json(db)
    // }
    // else {
    //     res.status(422).json({
    //         "status": classification,
    //     })
    // }

    const result = await nudeny.censorMultiPartForm(formData)
    console.log(result.data.Prediction[0].url)

    if(result.data.Prediction[0].url === ''){
        const destinationPath = `uploads/${req.file.originalname}`;
        fs.writeFileSync(destinationPath, req.file.buffer);
        db.push({
            'title': req.body.title,
            'url': baseUrl + `/${req.file.originalname}`
        })
        res.status(200).json(db)
    }
    else {
        db.push({
            'title': req.body.title,
            'url': result.data.Prediction[0].url
        })
        res.status(200).json(db)
    }
})


app.listen(port, () => {
    console.log(`Server started at ${port}`)
})