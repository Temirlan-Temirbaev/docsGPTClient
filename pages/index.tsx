import { Header } from "@/components/Header";
import { useEffect } from "react";
import {useLangStore} from '@/store/langStore'
import { Slogan } from "@/components/Slogan";
import { LangList } from "@/components/LangList";
import { Loader } from "@/components/Loader";
export default function Home() {
  const {getLangs, loading} = useLangStore()
  useEffect(() => {
    getLangs()
  } ,[])
  
  return (
    <>
    <div className="container">
      <Header  />
      {loading ? <div className="loader__container"><Loader /></div> : <><Slogan /><LangList /></>}
    </div>
    </>
  )
}
