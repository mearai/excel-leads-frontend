import { Plus_Jakarta_Sans } from "next/font/google";

export const plus = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const typography = {
  fontFamily: plus.style.fontFamily,
  h1: {
    fontWeight: 600,
    fontSize: "clamp(1.75rem, 4vw, 3.5rem)", // 28px → 36px
    lineHeight: "clamp(2.25rem, 5vw, 3.75rem)",
  },
  h2: {
    fontWeight: 600,
    fontSize: "clamp(1.5rem, 3.5vw, 1.875rem)", // 24px → 30px
    lineHeight: "clamp(2rem, 4.5vw, 2.25rem)",
  },
  h3: {
    fontWeight: 600,
    fontSize: "clamp(1.25rem, 3vw, 1.5rem)", // 20px → 24px
    lineHeight: "clamp(1.5rem, 3.5vw, 1.75rem)",
  },
  h4: {
    fontWeight: 600,
    fontSize: "clamp(1.125rem, 2.5vw, 1.3125rem)", // 18px → 21px
    lineHeight: "clamp(1.4rem, 3vw, 1.6rem)",
  },
  h5: {
    fontWeight: 600,
    fontSize: "clamp(1rem, 2vw, 1.125rem)", // 16px → 18px
    lineHeight: "clamp(1.3rem, 2.5vw, 1.6rem)",
  },
  h6: {
    fontWeight: 600,
    fontSize: "clamp(0.875rem, 1.8vw, 1rem)", // 14px → 16px
    lineHeight: "clamp(1.1rem, 2vw, 1.2rem)",
  },
  body1: {
    fontSize: "clamp(0.875rem, 1.5vw, 1rem)", // 14px → 16px
    lineHeight: "clamp(1.2rem, 2vw, 1.334rem)",
  },
  body2: {
    fontSize: "clamp(0.75rem, 1.3vw, 0.875rem)", // 12px → 14px
    lineHeight: "clamp(1rem, 1.8vw, 1.2rem)",
  },
  subtitle1: {
    fontSize: "clamp(0.875rem, 1.5vw, 1rem)", // 14px → 16px
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: "clamp(0.875rem, 1.3vw, 0.9375rem)", // 14px → 15px
    fontWeight: 400,
  },
  button: {
    textTransform: "capitalize",
    fontWeight: 400,
    fontSize: "clamp(0.8125rem, 1.4vw, 0.875rem)", // 13px → 14px
  },
};

export default typography;
