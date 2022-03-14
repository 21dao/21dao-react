import toast from "react-hot-toast";

export const success = (text) =>
  toast(text, {
    duration: 4000,
    icon: "🎉",
    style: {
      borderRadius: "10px",
      background: "#D1E7DD",
      color: "#2F4E35",
      border: "1px #2F4E35 solid",
    },
  });
