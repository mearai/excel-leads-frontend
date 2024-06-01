import Main from "./components/layout/Main";

export const metadata = {
  title: "Dashboard",
};

export default function RootLayout({ children }) {
  return <Main children={children} />;
}
