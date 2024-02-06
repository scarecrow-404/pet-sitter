
import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

// const [sitterdata,setSitterData]= useState([])

export default async function GET() {
  //return NextResponse.json({ message: "Hello World" });
  const getSitterData = async () => {
    let { data, error } = await supabase.from("pet_sitter").select("*");
    if (error || !data) {
      console.log(error);
    }
    // setSitterData(data);
    console.log(data)
  };
getSitterData()
return NextResponse.json(data)
}

// export default async function handler(req, res) {
//     if (req.method === 'GET') {
//       // Handle GET request
//       let { data, error } = await supabase
//         .from('pet_sitter')
//         .select('*')
  
//       if (error) return res.status(500).json({ error: error.message });
//       return res.status(200).json(data);
//     } else {
//       // Handle any other HTTP method
//       res.setHeader('Allow', ['GET']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
//   }