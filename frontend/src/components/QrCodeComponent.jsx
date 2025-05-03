import qrcode from "qrcode-terminal";
const frontendUrl = "http://192.168.29.228:5173";
qrcode.generate(frontendUrl, { small: true });
// // --- End Error Handling Middleware ---
