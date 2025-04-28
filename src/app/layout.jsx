import React from "react";
import ThemeLayout from "./components/layout/theme/ThemeLayout";
export const metadata = {
  title: {
    template: "%s | Flow Digital",
    default: "Flow Digital", // a default is required when creating a template
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeLayout>{children}</ThemeLayout>
      </body>
    </html>
  );
}
