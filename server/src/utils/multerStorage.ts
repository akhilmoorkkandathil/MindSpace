import multer, { StorageEngine } from 'multer';

// Define a map for MIME types
const MIME_TYPE_MAP: { [key: string]: string } = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

// Configure storage for multer
const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error: Error | null = isValid ? null : new Error("Invalid mime type");
        cb(error, "images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

// Create multer instance with storage configuration
const upload = multer({ storage: storage });

// Export upload middleware for use in routes
export default upload;
