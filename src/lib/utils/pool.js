import * as pg from "pg";
const { Pool } = pg.default;




const pool = new Pool({
    connectionString: "postgres://postgres.twbnpazhgudgqhmulgru:Petsitter1234.@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres",
  });
export  {pool}
