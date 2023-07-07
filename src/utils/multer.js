import fs from "fs";
import multer from "multer";

// uploads 폴더가 없으면 생성
const uploadFolder = "public/uploads/";
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder); // 파일 저장 경로 설정
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`); // 파일명 설정
  },
});

const fileFilter = (req, file, cb) => {
  // 파일 필터링 로직 작성
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true); // 허용할 파일 형식이면 true 전달
  } else {
    cb(new Error("Only JPEG and PNG images are allowed."), false); // 허용하지 않을 파일 형식이면 false 전달
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
