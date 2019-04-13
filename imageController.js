var imageModel = require('./models');
var cloud = requite('./cloudinaryConfig');

exports.createApp = (req, res) => {
  try {
    var imageDetails = {
      imageName: req.body.imageName,
    }
    imageModel.find({imageName: imageDetails.imageName}, (err, callback) => {
      if (err) {
        res.json({
          err: err,
          message: 'there was a problem uploading image'
        })
      } else if (callback.length >= 1) {
        res.json({
          message: 'file already exists'
        })
      } else {
        var imageDetails = {
          imageName: req.body.imageName,
          cloudImage: req.files[0].path,
          imageId: ''
        }
        cloud.uploads(imageDetails.cloudImage).then((result) => {
          var imageDetails = {
            imageName: req.body.imageName,
            cloudImage: result.url,
            imageId: result.id 
          }
          imageModel.create(imageDetails, (err, created) => {
            if(err) {
              res.json({
                err: err,
                message: 'could not upload image, try again'
              })
            } else {
              res.json({
                created: created,
                message: 'image uploaded successfully!!'
              })
            }
          })
        })
      }
    });
  } catch(exceptions) {
    console.log(exceptions)
  }
}