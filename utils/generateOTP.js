exports.generatePassword = (length) => {
  charset = "1234567890";
  let password = "";
  for (let i = 0, n = charset.length; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
};
