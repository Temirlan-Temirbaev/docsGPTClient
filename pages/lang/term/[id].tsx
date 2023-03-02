import { Header } from "@/components/Header";
import axios from "axios";
import hljs from "highlight.js"
import { useEffect } from "react";
import Head from "next/head";
export const getServerSideProps = async (context : any) => {
  const {id} = context.params
  const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/term/${id}`);
  return {
    props : {term : res.data}
  }
}
 const Term = ({term} : any) => {
  useEffect(() => {
      hljs.highlightAll();
  }, []);
  return <div className="container">
    <Head>
      <title>{term.name}</title>
    </Head>
    <Header/>
    
    <h1>{term.name}</h1>
    {term.content.map((info : string, index : number) => (
      <div key={index}>
        <p className="term__info">{info}</p>
        {!term.code[index] || term.code[index] == "" ? "" : <div><pre>
          <code className={`language-${term.lang}`}  style={{borderRadius : '10px'}}>{term.code[index]}</code>
        </pre>
        <h6
            style={{margin : 0, fontWeight : "300", cursor : "pointer"}} 
            onClick={() => navigator.clipboard.writeText(term.code[index])}>
              Копировать
          </h6></div>}
      </div>
    ))}    
    </div> 
}
export default Term