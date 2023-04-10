export default function DisplayErrors(props: displayErrorsProp) {
  const style = {color:'red'};
  return (
    <>
      {props.errors ? (
        <ul style={style}>
          {props.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

interface displayErrorsProp {
  errors?: string[];
}
