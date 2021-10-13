const multer = require('multer');
const path = require('path');

exports.uploadBlogs = multer({
    storage: multer.diskStorage({

        destination: (req, file, callback) => {
            callback(null, path.join(__dirname, '../../public/images/blogs/'))
        },

        filename: (req, file, callback) => {
            callback(null, `${Math.random()}-${Date.now()}-${file.originalname}`)
        },

    }),
    fileFilter: function (req, file, callback) {
        let ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            const error = { error : "only images are allowed"}
            return callback(error)
        }
        callback(null, true)
    },
})