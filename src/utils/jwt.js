import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  // 토큰에 포함될 페이로드 데이터
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  // 비밀 키를 사용하여 토큰을 생성
  const token = jwt.sign(payload, process.env.SECRETE, { expiresIn: "1d" });

  return token;
};
