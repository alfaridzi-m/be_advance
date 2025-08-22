const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + extension)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|png|gif|webp/
    const mimeType = allowedTypes.test(file.mimetype)
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())

    if (mimeType && extname) {
        return cb(null, true)
    }  
    cb('Hanya File JPEG,PNG,GIF yang bisa')
}

const upload = multer({
    storage:storage,
    fileFilter:fileFilter,
    limit:{
        fileSize: 4*1024*1024
    }
})
module.exports = upload