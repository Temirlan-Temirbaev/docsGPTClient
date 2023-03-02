import { useLangStore } from "@/store/langStore";
import { Lang } from "./Lang";
export const LangList = () => {
  const {langs} = useLangStore()
  return <div className="langList" >
    {langs.map((lang: any)=> <Lang lang={lang} key={lang._id}/>)}
  </div>
}