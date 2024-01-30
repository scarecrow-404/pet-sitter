import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SearchBar from "@/components/common/SearchBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <SearchBar />
      <main className="flex min-h-4/6 flex-col items-center justify-between p-24"></main>{" "}
      <Footer />
    </>
  );
}
