import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

interface Props {
  numberPages: number;
  getWorkerFromDB:(page:number,limit:number)=>void
  specifecWorkersFromDB:(page:number,limit:number)=>void
}

const Pagination = ({ numberPages,getWorkerFromDB ,specifecWorkersFromDB}: Props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  let currentPage=1
  const queryFilter = queryParams.get('filter')
  const queryPage= queryParams.get('page')
   if(queryPage){
    currentPage=parseInt(queryPage)
  }

  const ChooseBetwenFilterOrGetSimpleData =async (page:number,limit:number)=>{
    if(queryFilter){
        await specifecWorkersFromDB(page,limit)
    }else{
        await getWorkerFromDB(page,limit)
    }
  }

    
  console.log('current page',currentPage)
  var pages: number[] = [];
  for (let i = 0; i < numberPages; i++) {
    pages.push(i);
  }
  return (
    <nav>
      <ul className="pagination   justify-content-center">
        {pages.length > 0 &&
          pages.map((page) => {

            return (
              <li className="page-item" key={page}>
                <Link to={`/searchWorker?filter=${queryFilter}&page=${page+1}&limit=3`} onClick={()=> ChooseBetwenFilterOrGetSimpleData(page+1,2)} className={currentPage==page+1?" btn btn-dark mx-1 px-4":" btn btn-outline-dark mx-1 px-4"}>
                     {page+1}
                </Link>
             
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export default Pagination;
