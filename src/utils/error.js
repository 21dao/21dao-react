import toast from "react-hot-toast";

export const error = (text) =>
  toast(text, {
    duration: 4000,
    icon: "❌",
    style: {
      borderRadius: "10px",
      background: "#F8D7DA",
      color: "#842029",
      border: "1px #842029 solid",
    },
  });
