//insted of calling catch try in every route i think to use this middelware who take a function parametter then return a function with try catch 

const asyncMiddelware = (handler:Function)=>{
    return async(req:any,res:any,next:any)=>{
        try{
            await handler(req,res)
        }catch(error:any){
            next(error) // next that mean we send this error to the midelware ErrorDataBase 
        }
    }
}

module.exports =asyncMiddelware