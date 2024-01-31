import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>

      <Navbar />
      <main className="flex min-h-4/6 flex-col items-center justify-between p-24"></main>{" "}
      <Footer />
  
    </>
  );
}
