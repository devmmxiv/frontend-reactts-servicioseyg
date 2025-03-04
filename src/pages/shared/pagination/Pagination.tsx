
import "./pagination.css";
import classNames from "classnames";


interface propsPaginationItem {
  titulo: string;
  currentPage:number;
  isDisabled:boolean;
  key:number
  onPageChange:(page:number)=>void


}

interface propPagination {
 
    count:number;
    currentPage:number;
    take:number;
   
    onPageChange:(page:number)=>void
  
  
  }

  const range = (start:number, end:number) => {

    return [...Array(end - start).keys()].map((el) => el + start);

  };

  const getPagesCut = (pagesCount:number, pagesCutCount:number, currentPage:number ) => {
    const ceiling = Math.ceil(pagesCutCount / 2);
    const floor = Math.floor(pagesCutCount / 2);
    console.log("ceiling", ceiling);
    console.log("floor", floor);
  
    if (pagesCount < pagesCutCount) {
      return { start: 1, end: pagesCount + 1 };
    } else if (currentPage >= 1 && currentPage <= ceiling) {
      return { start: 1, end: pagesCutCount + 1 };
    } else if (currentPage + floor >= pagesCount) {
      return { start: pagesCount - pagesCutCount + 1, end: pagesCount + 1 };
    } else {
      return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 };
    }
  };
const PaginationItem = ( { titulo, currentPage, isDisabled,key=0 ,onPageChange}:propsPaginationItem ) => {
  const liClasses = classNames({
    "page-item": true,
    active:"true" ,
    disabled: isDisabled,
  });
  return (
    <li key={key} className={liClasses} onClick={() => onPageChange(currentPage)}>
      <span className="page-link">{titulo}</span>
    </li>
  );
};

const Pagination = ({count,currentPage, take,onPageChange }:propPagination) => {
  const pagesCount = Math.ceil(count/ take);

  const pagesCut = getPagesCut(pagesCount,5, currentPage );

  const pages = range(pagesCut.start, pagesCut.end);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;
  return (
    <ul className="pagination">
      <PaginationItem
        key={0}
        titulo={"Primero"}
        currentPage={currentPage}
        onPageChange={() => onPageChange(1)}
        isDisabled={isFirstPage}
      />
      <PaginationItem
        key={0}
        titulo={"Anterior"}
        currentPage={currentPage}
        onPageChange={() => onPageChange(currentPage - 1)}
        isDisabled={isFirstPage}
      />
      {pages.map((page) => (
        <PaginationItem
              titulo={page.toString()}
              key={page}
              currentPage={currentPage}
              onPageChange={onPageChange}
              isDisabled={false}        />
      ))}
      <PaginationItem
        key={0}
        titulo={"Siguiente"}
        currentPage={currentPage}
        onPageChange={() => onPageChange(currentPage + 1)}
        isDisabled={isLastPage}
      />
      <PaginationItem
      key={0}
        titulo={"Ultimo"}
        currentPage={currentPage}
        onPageChange={() => onPageChange(pagesCount)}
        isDisabled={isLastPage}
      />
    </ul>
  );
};
export default Pagination;
