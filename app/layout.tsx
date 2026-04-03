import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>{children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "tracking-wide font-medium",
            style: {
              background: "#ffffff",
              color: "#1f2937", // Matches text-darkColor
              border: "1px solid rgba(244, 114, 182, 0.3)", // Matches accent-pink/30
              borderRadius: "9999px", // Pill shape like other theme buttons
              boxShadow: "0 4px 6px -1px rgba(244, 114, 182, 0.1), 0 2px 4px -1px rgba(244, 114, 182, 0.06)",
            },
            success: {
              iconTheme: {
                primary: "#db2777",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
};
export default RootLayout;
