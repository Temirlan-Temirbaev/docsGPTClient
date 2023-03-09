import { Header } from "@/components/Header";
import Image from "next/image";
import inputBtn from '@/public/inputButton.png'
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Loader } from "@/components/Loader";
interface Result {
  name : string,
  lang : string,
  _id : string
}
const Search = () => {
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  const [result, setResult] = useState<Result[]>([]);
  const onSearchButtonClick = async () => {
    setLoading(true)
    const res = await axios(`${process.env.NEXT_PUBLIC_SERVER_URL}/search/${input}`)
    setLoading(false);
    setResult(res.data);
  }
  return <div className="container">
    <Header />
      <div className="search__inner">
        <div className="chat-input__box">
            <input onKeyUp={(e) => {if(e.keyCode == 13) onSearchButtonClick()}} type="text"  placeholder="Поиск..." className="chat-input" value={input} onChange={(e) => setInput(e.target.value)}/>
            <Image onClick={onSearchButtonClick} className="chat-input__btn" width={24} height={24} src={inputBtn} alt="Спросить"/>
        </div>
        <div className="terms" style={{justifyContent: 'flex-start'}}>
          {loading ? <Loader /> : result?.map((elem : Result) => (
            <Link className="lang__term" key={elem._id} href={`lang/term/${elem._id}`} style={{flexDirection : 'column', width : '100%'}}>
              <h1 className="lang__term-name" >{elem.name}</h1>
              <h3 className="lang__term-lang">{elem.lang.charAt(0).toUpperCase() + elem.lang.slice(1)}</h3>
            </Link>
          ))}
          {result.length === 0 && <>Ничего не найдено.</>}
        </div>
      </div>
    </div>
}

export default Search;