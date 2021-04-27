export const imageFileFilter = (req, file, callback) => {
    console.log("imageFileFilter",imageFileFilter);
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  };
