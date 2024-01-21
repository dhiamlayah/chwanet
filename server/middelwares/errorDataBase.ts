 
const DataBaseError :any = (err:any ,req:any , res:any,next:any  )=>{
    console.error("there is an error from data base ", err);
    res.status(500).json({ message: 'فشل شيء ما من قاعدة البيانات.' });
}

module.exports = DataBaseError