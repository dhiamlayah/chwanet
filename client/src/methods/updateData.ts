import axios from "axios";
import { Dispatch, SetStateAction } from "react";
export const sendUpdate = async (newName: object, id: string, setError:Dispatch<SetStateAction<string | null>>) => {
  const url: string = process.env.REACT_APP_port + `/meAsWorker/${id}`;
  let message : string | null
  try {
    await axios
      .put(url, newName, {
        headers: {
          token: localStorage.getItem("Token"),
        },
      })
      message = " تم تحديث البيانات بنجاح ";
  } catch (error: any) {
    if(error.response){
        setError(error.response.data.message)
        message =  null
      }else{
        setError('لا يمكن الاتصال بالسرفر')
        message =  null
      }   
  }

  return message
};
