// import Image, { type ImageProps } from "next/image";
// import { Button } from "@repo/ui/button";
// import styles from "./page.module.css";
// // import  {todo} from "@repo/db/client";
// import BalancePage from "./testComponents/BalancePage";
// export default function Home() {
//   return (
//     <div className="text-2xl">
//       hi there
//       <BalancePage/>
//     </div>
//   );
// }

// "use client"
// import { signIn, signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";
import {AppBar}  from "@repo/ui/AppBar"

export default async function Home() {
  const session = await getServerSession(authOptions);
  if(session?.user){
    redirect('/dashboard')
  }else{
    redirect('/api/auth/signin')
  }
}
