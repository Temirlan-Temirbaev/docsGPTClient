import { Header } from "@/components/Header";

const NotFound = () => {
  return <>
    <div className="container"><Header /></div>
    <div style={{width : '100%', height: '90vh', display : 'flex', justifyContent : 'center', alignItems : 'center'}}><h1>Такой страницы не существует</h1></div>
  </>
}

export default NotFound;