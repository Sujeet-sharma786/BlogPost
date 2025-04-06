import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
// import config from "../config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const AddBlogs = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [image,setImage] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL
  // const [inputs, setInputs] = useState({
  //   title: "",
  //   description: "",
  //   imageURL: "",
  // });
  // const handleChange = (e) => {
  //   setInputs((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };
  const sendRequest = async () => {
    const formdata  = new FormData();
    
    formdata.append("title",title)
    formdata.append("desc",desc)
    formdata.append("image",image)
    formdata.append("user",localStorage.getItem("userId"));
    console.log(formdata.image)
    console.log(title,desc,image)
    const res = await axios
      .post(`${BASE_URL}/api/blogs/add`, formdata)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
        >
          <Typography
            className={classes.font}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            Post Your Blog
          </Typography>
          <InputLabel className={classes.font} sx={labelStyles}>
            Title
          </InputLabel>
          <TextField
            className={classes.font}
            name="title"
            type="text"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            margin="auto"
            variant="outlined"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Description
          </InputLabel>
          <TextareaAutosize
            className={classes.font}
            name="desc"
            type="text"
            onChange={(e)=>setDesc(e.target.value)}
            minRows={10}
            margin="auto"
            variant="outlined"
            value={desc}
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            ImageURL
          </InputLabel>
          <TextField
            className={classes.font}
            name="image"
            onChange={(e)=>setImage(e.target.files[0])}
            // value={image}
            type="file"
            margin="auto"
            variant="outlined"
          />
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlogs;
