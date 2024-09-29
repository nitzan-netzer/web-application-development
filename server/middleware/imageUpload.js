import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = 'productImage' + '-' + Date.now();
        req.generatedFileName = uniqueSuffix;
        cb(null, uniqueSuffix);
    }
});

const upload = multer({
    storage: storage,
});

// Middleware function
export function createImage(req, res, next) {
    const uploadSingle = upload.single('image');

    // Call the upload middleware and pass the control to the next middleware
    uploadSingle(req, res, function (err) {
        if (err) {
            // Handle the error
            return res.status(500).send(err.message);
        }
        // Continue to the next middleware
        next();
    });
}
