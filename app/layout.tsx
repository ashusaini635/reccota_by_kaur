import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const RootLayout=({children}:{children:React.ReactNode})=>{
  return <html lang="en">
    <body className={`${poppins.className} antialiased`}>
      {children}
    </body>
  </html>
}
export default RootLayout;