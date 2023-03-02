import {create} from "zustand"
import axios from "axios"
export const useLangStore = create((set) => ({
  langs : [],
  loading : false,
  getLangs : async () => {
    set({loading : true});
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/lang`)
    set({langs : res.data});
    set({loading : false});
  },
  setLoader : () => {set({loading : !loading})}
}))