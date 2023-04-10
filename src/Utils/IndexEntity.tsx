import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Link } from "react-router-dom";
import Button from "./Button";
import CustomConfirm from "./CustomConfirm";
import GenericList from "./GenericList";
import Pagination from "./Pagination";
import RecordsPerPageSelect from "./RecordsPerPageSelect";

export default function IndexEntity<T>(props: indexEntityProps<T>) {
  const [entity, setEntity] = useState<T[]>();
  const [totalAmountOfPages, setTotalAmountOfPage] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const buttons = (editUrl:string,id:number) => (
    <>
      <Link className="btn btn-success" to={editUrl}>
        Edit
      </Link>
      <Button
        onClick={() => CustomConfirm(() => deleteEntity(id))}
        className="btn btn-danger"
      >
        Delete
      </Button>
    </>
  );
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, recordsPerPage]);

  function loadData() {
    axios
      .get(props.url, { params: { page, recordsPerPage } })
      .then((response: AxiosResponse<T[]>) => {
        const totalAmountOfRecords = parseInt(
          response.headers["totalamountofrecords"],
          10
        );
        setTotalAmountOfPage(Math.ceil(totalAmountOfRecords / recordsPerPage));
        setEntity(response.data);
      });
  }
  async function deleteEntity(id: number) {
    try {
      await axios.delete(`${props.url}/${id}`);
      loadData();
    } catch (error: any) {
      if (error && error.response) {
        console.error(error.response.data);
      }
    }
  }
  return (
    <>
      <h4>{props.title}</h4>
      {props.createUrl ?    <Link className="btn btn-primary" to={props.createUrl}>
        Create {props.entityName}
      </Link>:null}
   
      <RecordsPerPageSelect
        onChange={(amountOfRecords) => {
          setPage(1);
          setRecordsPerPage(amountOfRecords);
        }}
      ></RecordsPerPageSelect>
      <Pagination
        totalAmountOfPages={totalAmountOfPages}
        currentPage={page}
        onChange={(newPage) => setPage(newPage)}
      ></Pagination>
      <GenericList list={entity}>
        <table className="table table striped">
            {props.children(entity!,buttons)}
        </table>
      </GenericList>
    </>
  );
}
interface indexEntityProps<T> {
  url: string;
  entityName?:string;
  title:string;
  createUrl?:string;
  children(entity:T[],buttons:(editUrl:string,id:number)=>ReactElement):ReactElement;
}
