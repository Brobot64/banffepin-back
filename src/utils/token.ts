// Generate Token
export const generateRandomNumber = (length: number) => {
    return Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    );
  };
  
  // Genrate OTP
export const generateOTP = (length: number) => {
    const token = generateRandomNumber(length);
    return `${token}.${Date.now()}`;
};
  
  // Verify OTP
export const verifyOTP = (otp: string) => {
    const [token, time] = otp.split('.');
    const totalDiff = Date.now() / 1000 - Number(time);
    if (totalDiff > 1800) {
      throw new Error("OTP Expired");
    }
    return token;
}