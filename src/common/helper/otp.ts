export const generateOtp = () => {
  const types = {
    alphanumeric: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numeric: "0123456789",
    alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  };

  const otpType = "alphanumeric";
  const otpLength = 6;

  const str = types[otpType];

  let OTP = "";

  for (let i = 0; i < otpLength; i++) {
    OTP += str[Math.floor(Math.random() * otpLength)];
  }
  return OTP;
};
