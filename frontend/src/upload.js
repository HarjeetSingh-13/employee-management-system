import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "hevizgva");
  // data.append("cloud_name","ddigj13xo")

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/ddigj13xo/image/upload",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log(res.data);
    const url = res.data.url;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;

// const [file, setFile] = useState(null);
// const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = await upload(file);
//     try {
//       await newRequest.post("/auth/register", {
//         ...user,
//         img: url,
//       });
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//     }
//   };