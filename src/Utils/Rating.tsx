import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./Rating.css";
import AuthenticationContext from "../Authorize/AuthenticationContext";
import Swal from "sweetalert2";
export default function Rating(props: ratingProps) {
  const [maxArr, setMaxArray] = useState<number[]>([]);
  const [selectedRate, setSelectedRate] = useState<number>(props.selectedValue);
  const { claims } = useContext(AuthenticationContext);
  useEffect(() => {
    setMaxArray(Array(props.maximumValue).fill(0));
  }, [props.maximumValue]);
  function handleMouseOver(rate: number) {
    setSelectedRate(rate);
  }
  function handleClick(rate: number) {
    const userIsLogin = claims.length > 0;
    if(!userIsLogin){
        Swal.fire({title:'Error',text:'You need to login',icon:'error'});
        return;
    }
    setSelectedRate(rate);
    props.onChange(rate);
  }
  return (
    <>
      {maxArr.map((_, index) => (
        <FaStar
          key={index}
          className={`fa-lg pointer ${
            selectedRate >= index + 1 ? "checked" : null
          }`}
          onMouseOver={() => handleMouseOver(index + 1)}
          onClick={() => handleClick(index + 1)}
        ></FaStar>
      ))}
    </>
  );
}
interface ratingProps {
  maximumValue: number;
  selectedValue: number;
  onChange(rate: number): void;
}
