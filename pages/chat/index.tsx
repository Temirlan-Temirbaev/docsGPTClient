import { Header } from "@/components/Header";
import inputBtn from "@/public/inputButton.png"
import { useRouter } from "next/router";
import {  useState } from "react";
import useStateRef from "react-usestateref";
import userIcon from '@/public/user.png'
import Image from "next/image";
import { Configuration, OpenAIApi } from "openai";
interface Message{
  from : string,
  content : string
}
const MessageComponent = (message : Message) => {
  
  return <div className="message">
  <div className="message-avatar">
    {message.from === 'gpt' ? <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512"><rect fill="#10A37F" width="512" height="512" rx="104.187" ry="105.042"></rect><path fill="#fff" fillRule="nonzero" d="M378.68 230.011a71.432 71.432 0 003.654-22.541 71.383 71.383 0 00-9.783-36.064c-12.871-22.404-36.747-36.236-62.587-36.236a72.31 72.31 0 00-15.145 1.604 71.362 71.362 0 00-53.37-23.991h-.453l-.17.001c-31.297 0-59.052 20.195-68.673 49.967a71.372 71.372 0 00-47.709 34.618 72.224 72.224 0 00-9.755 36.226 72.204 72.204 0 0018.628 48.395 71.395 71.395 0 00-3.655 22.541 71.388 71.388 0 009.783 36.064 72.187 72.187 0 0077.728 34.631 71.375 71.375 0 0053.374 23.992H271l.184-.001c31.314 0 59.06-20.196 68.681-49.995a71.384 71.384 0 0047.71-34.619 72.107 72.107 0 009.736-36.194 72.201 72.201 0 00-18.628-48.394l-.003-.004zM271.018 380.492h-.074a53.576 53.576 0 01-34.287-12.423 44.928 44.928 0 001.694-.96l57.032-32.943a9.278 9.278 0 004.688-8.06v-80.459l24.106 13.919a.859.859 0 01.469.661v66.586c-.033 29.604-24.022 53.619-53.628 53.679zm-115.329-49.257a53.563 53.563 0 01-7.196-26.798c0-3.069.268-6.146.79-9.17.424.254 1.164.706 1.695 1.011l57.032 32.943a9.289 9.289 0 009.37-.002l69.63-40.205v27.839l.001.048a.864.864 0 01-.345.691l-57.654 33.288a53.791 53.791 0 01-26.817 7.17 53.746 53.746 0 01-46.506-26.818v.003zm-15.004-124.506a53.5 53.5 0 0127.941-23.534c0 .491-.028 1.361-.028 1.965v65.887l-.001.054a9.27 9.27 0 004.681 8.053l69.63 40.199-24.105 13.919a.864.864 0 01-.813.074l-57.66-33.316a53.746 53.746 0 01-26.805-46.5 53.787 53.787 0 017.163-26.798l-.003-.003zm198.055 46.089l-69.63-40.204 24.106-13.914a.863.863 0 01.813-.074l57.659 33.288a53.71 53.71 0 0126.835 46.491c0 22.489-14.033 42.612-35.133 50.379v-67.857c.003-.025.003-.051.003-.076a9.265 9.265 0 00-4.653-8.033zm23.993-36.111a81.919 81.919 0 00-1.694-1.01l-57.032-32.944a9.31 9.31 0 00-4.684-1.266 9.31 9.31 0 00-4.684 1.266l-69.631 40.205v-27.839l-.001-.048c0-.272.129-.528.346-.691l57.654-33.26a53.696 53.696 0 0126.816-7.177c29.644 0 53.684 24.04 53.684 53.684a53.91 53.91 0 01-.774 9.077v.003zm-150.831 49.618l-24.111-13.919a.859.859 0 01-.469-.661v-66.587c.013-29.628 24.053-53.648 53.684-53.648a53.719 53.719 0 0134.349 12.426c-.434.237-1.191.655-1.694.96l-57.032 32.943a9.272 9.272 0 00-4.687 8.057v.053l-.04 80.376zm13.095-28.233l31.012-17.912 31.012 17.9v35.812l-31.012 17.901-31.012-17.901v-35.8z"></path></svg> :
    <Image src={userIcon} alt='' height={40} width={40}/>}
  </div>
  <div className={`message-content ${message.from}`}>
    <p>{message.content}</p>
  </div>
</div>
}
const Chat = () => {
  const router = useRouter();
  const [input, setInput] = useState<string>('')
  const [messages, setMessages, messagesRef] = useStateRef<Message[]>([])
  const buttonClickHandler = async () => {
    const myMessage : Message = {from : 'me', content : input}
    const loadingMessage : Message = {from : 'gpt', content : "Генерация ответа..."}
    setMessages([...messagesRef.current, myMessage])
    setMessages([...messagesRef.current, loadingMessage])
    
    const config = new Configuration({
      apiKey : process.env.NEXT_PUBLIC_CHATGPT_KEY
    })
    const openai = new OpenAIApi(config);
    const aiResult = await openai.createCompletion({
      model : 'text-davinci-003',
      prompt : input,
      temperature : 0.2,
      max_tokens : 2048,
      frequency_penalty : 0.5,
      presence_penalty : 0
    })
    const res = aiResult.data.choices[0].text?.trim() || "Извините, но на данный момент все сервера перегружены"
    if(res){
      setMessages(messagesRef.current.filter(msg => msg !== loadingMessage))
      const botMessage : Message= {from : 'gpt', content : res.trim().replace('?', '').replaceAll('\n', '')};
      setMessages([...messagesRef.current, botMessage])
    }
    setInput('')
  }
  return <div className="chat">
    <div className="container">
      <Header />
      <div onClick={router.back} style={{cursor : 'pointer'}}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAhklEQVR4nO3VQQqDQAwF0LlERW8gJpl8KN6+qxa6kK7qosdRBqUIXdeI/Aezmc0PISEpEdGR5ZwrMX+J+TMmXDGqYVLzYddwABdRvEu4mH+6rq8Z/ndg2y1g4Iqy58uqBTzFI7QAUdx/hq9tr03aG1jEip04VCdy5DneFlHCRf32/SSis5kBetizVZqYmjMAAAAASUVORK5CYII=" /></div>
      <div className="chat__inner">
        <div className="chat-input__box">
          <input onKeyUp={(e) => {if(e.keyCode == 13) buttonClickHandler()}} type="text"  placeholder="Спроси меня о чём угодно..." className="chat-input" value={input} onChange={e => setInput(e.target.value)}/>
          <Image onClick={buttonClickHandler} className="chat-input__btn" width={24} height={24} src={inputBtn} alt="Спросить"/>
        </div>
        <div className="chat-messages">
          {messages.map((msg : Message, index : number) => <MessageComponent  key={index} from={msg.from} content={msg.content} />)}
        </div>
      </div>
    </div>
  </div>
}
export default Chat;