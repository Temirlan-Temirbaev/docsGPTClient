import { Header } from "@/components/Header";
import axios from "axios"
import Link from "next/link";
export const getServerSideProps = async (context : any) => {
  const {id} = context.params
  const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/lang/${id}`)
  return {
    props : {lang : res.data }
  }
}
const Lang = ({lang} : any) => {
  
  return <div className="container">
    <Header/>
    <div className="lang__page-name">
      <h1>{lang.name.charAt(0).toUpperCase() + lang.name.slice(1)}</h1>
    </div>
    <div className="terms">
      
    {lang.termNames.map((name : string, index : number) => {
      return <div key={index} className="lang__term">
        <Link href={`term/${lang.termsId[index]}`}><h1 className="lang__term-name">{index + 1} {name}</h1></Link>
      </div>
    })}
    </div>
  </div>
}

export default Lang