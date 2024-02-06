import { NextResponse } from "next/server";


export function GET(res,{params}) {
  return NextResponse.json({ message: params.sitterid });
  const fetchSitter = async () => {
    let { data, error } = await supabase.from("pet_sitter").select("*");
    if (error || !data) {
      console.log(error);
    }
    setSitterData(data);
  };

}
