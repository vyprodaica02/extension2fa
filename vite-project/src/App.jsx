// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
// Sử dụng import không dùng default
import { TOTP } from "otpauth";

function App() {
  const [secret, setSecret] = useState("2BLAAJD7VKFIVLNV"); // Secret key bạn đã có
  const [otp, setOtp] = useState("");

  // Sinh mã OTP từ secret key
  const generateOtp = () => {
    const totp = new TOTP({
      secret: secret,
      encoding: "base32",
    });
    const token = totp.generate();
    setOtp(token);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Generate OTP</h1>
      <input
        type="text"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        placeholder="Nhập secret key"
        style={{ marginBottom: "10px" }}
      />
      <button onClick={generateOtp}>Sinh mã OTP</button>
      {otp && (
        <div style={{ marginTop: "20px" }}>
          <strong>Mã OTP:</strong> {otp}
        </div>
      )}
    </div>
  );
}

export default App;
