const express = require("express")
const blogRouter = express.Router();
const multer = require('multer')
const path = require('path');


const { getAllBlogs , addBlog ,
     updateBlog ,getById , 
    deleteBlog , getByUserId} = require("../controller/blog-controller");


    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "uploads");
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      });
let upload = multer({storage:storage})
blogRouter.get("/",getAllBlogs);
blogRouter.post('/add',upload.single("image"), addBlog);
blogRouter.put("/update/:id",  updateBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id",deleteBlog);
blogRouter.get("/user/:id",getByUserId)
module.exports = blogRouter;