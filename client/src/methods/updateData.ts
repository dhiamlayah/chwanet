import axios from "axios";
export const sendUpdate = async (newName: any, id: string,setError:any) => {
  const url: string = process.env.REACT_APP_port + `/meAsWorker/${id}`;
  try {
    await axios
      .put(url, newName, {
        headers: {
          token: localStorage.getItem("Token"),
        },
      })
      .then(() => {
        return " تم تحديث البيانات بنجاح ";
      });
  } catch (error: any) {
    if(error.response){
        setError(error.response.data.message)
      }else{
        setError('لا يمكن الاتصال بالسرفر')
      }
    
  }
};
