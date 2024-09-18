// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
// Sử dụng import không dùng default
import { TOTP } from "otpauth";

function App() {
  const [secret, setSecret] = useState(""); // Secret key người dùng nhập
  const [otp, setOtp] = useState("");
  const [copied, setCopied] = useState(false); // Trạng thái đã sao chép
  const [error, setError] = useState(""); // Trạng thái hiển thị lỗi

  // Sinh mã OTP từ secret key
  const generateOtp = () => {
    if (!secret) {
      setError("Vui lòng nhập secret key"); // Hiển thị lỗi nếu không có secret
      return;
    }

    const totp = new TOTP({
      secret: secret,
      encoding: "base32",
    });
    const token = totp.generate();
    setOtp(token);
    setCopied(false); // Reset trạng thái sao chép khi sinh mã mới
    setError(""); // Xóa thông báo lỗi nếu có giá trị
  };

  // Hàm sao chép OTP vào clipboard
  const copyToClipboard = () => {
    if (otp) {
      navigator.clipboard.writeText(otp);
      setCopied(true); // Cập nhật trạng thái đã sao chép
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>OTP Generator</h1>
      <input
        type="text"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        placeholder="Nhập secret key"
        style={styles.input}
      />
      {error && <p style={styles.errorText}>{error}</p>}{" "}
      {/* Hiển thị lỗi nếu có */}
      <button onClick={generateOtp} style={styles.generateButton}>
        Sinh mã OTP
      </button>
      {otp && (
        <div style={styles.resultContainer}>
          <strong style={styles.otpLabel}>Mã OTP:</strong>
          <span style={styles.otpValue}>{otp}</span>
          <button onClick={copyToClipboard} style={styles.copyButton}>
            Copy
          </button>
          {copied && <span style={styles.copiedMessage}>Đã sao chép!</span>}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f8ff", // Màu nền nhạt
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
  },
  heading: {
    color: "#2c3e50", // Màu tiêu đề tối
    fontSize: "32px",
    marginBottom: "20px",
    textTransform: "uppercase",
  },
  input: {
    width: "300px",
    padding: "10px",
    fontSize: "16px",
    border: "2px solid #2ecc71", // Màu viền xanh lá
    borderRadius: "5px",
    marginBottom: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Hiệu ứng đổ bóng
  },
  errorText: {
    color: "red", // Màu chữ đỏ cho thông báo lỗi
    fontSize: "14px",
    marginBottom: "10px",
  },
  generateButton: {
    backgroundColor: "#3498db", // Màu xanh biển
    color: "#fff",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  generateButtonHover: {
    backgroundColor: "#2980b9",
  },
  resultContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "20px",
  },
  otpLabel: {
    fontSize: "18px",
    color: "#34495e", // Màu tối
    marginRight: "10px",
  },
  otpValue: {
    fontSize: "24px",
    color: "#e74c3c", // Màu đỏ nổi bật
    marginRight: "20px",
  },
  copyButton: {
    backgroundColor: "#2ecc71", // Màu xanh lá
    color: "#fff",
    padding: "8px 16px",
    fontSize: "14px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  copyButtonHover: {
    backgroundColor: "#27ae60",
  },
  copiedMessage: {
    color: "green",
    marginLeft: "10px",
    fontSize: "14px",
  },
};

export default App;
