const bcrypt = require("bcryptjs");

const generateGroupCodeAndSlug = (name) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 7; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Generate a slug from the name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return { code, slug };
};

const sanitizeDoc = (doc) => {
  if (!doc || typeof doc.toObject !== "function") return doc;

  const obj = doc.toObject();

  const { _id, __v, password, ...rest } = obj;

  return {
    id: _id?.toString(),
    ...rest,
  };
};

function generateOTP(length = 6) {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

async function hashOTP(otp) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(otp, salt);
}

function isExpired(date) {
  return new Date() > date;
}

module.exports = {
  generateGroupCodeAndSlug,
  sanitizeDoc,
  generateOTP,
  hashOTP,
  isExpired,
};
