const path = require("path");
const express = require("express");
const fileupload = require("express-fileupload");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(fileupload());

app.post("/upload", (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded");
  }

  let uploadPath;
  console.log(req.files.sampleFile);
  let sampleFile = req.files.sampleFile;

  uploadPath = path.join(__dirname, "uploadFiles", sampleFile.name);

  sampleFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send("File Uploaded!!");
  });
});

app.post("/download", (req, res) => {
  const downloadFile = path.join(__dirname, "uploadFiles", "textDownload.txt");
  res.download(downloadFile, () => {
    console.log('File Downloaded!!');
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000...");
});
