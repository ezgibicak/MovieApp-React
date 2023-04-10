import './MultipleSelector.css'
export default function MultipleSelector(props: multipleSelectorProps) {
  function select(item: multipleSelectorModel) {
    const selected = [...props.selected, item];
    const unselected = props.nonselected.filter((value) => value !== item);
    props.onChange(selected, unselected);
  }
  function deselect(item: multipleSelectorModel) {
    const unselected = [...props.nonselected, item];
    const selected = props.selected.filter((value) => value !== item);
    props.onChange(selected, unselected);
  }
  function selectAll() {
    const selectedAll = [...props.selected, ...props.nonselected];
    const noneSelected: multipleSelectorModel[] = [];
    props.onChange(selectedAll, noneSelected);
  }
  function deSelectAll() {
    const noneselectedAll = [...props.selected, ...props.nonselected];
    const selectedAll: multipleSelectorModel[] = [];
    props.onChange(selectedAll, noneselectedAll);
  }
  return (
    <div className="mb-3">
      <label>{props.displayName}</label>
      <div className="multiple-selector">
        <ul>
          {props.nonselected.map((item) => (
            <li
              key={item.key}
              onClick={() => {
                select(item);
              }}
            >
              {item.value}
            </li>
          ))}
        </ul>
        <div className="multiple-selector-buttons">
          <button
            type="button"
            onClick={() => {
              selectAll();
            }}
          >
            {">>"}
          </button>
          <button
            type="button"
            onClick={() => {
              deSelectAll();
            }}
          >
            {"<<"}
          </button>
        </div>
        <ul>
          {props.selected.map((item) => (
            <li
              key={item.key}
              onClick={() => {
                deselect(item);
              }}
            >
              {item.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
interface multipleSelectorProps {
  displayName: string;
  selected: multipleSelectorModel[];
  nonselected: multipleSelectorModel[];
  onChange(
    selected: multipleSelectorModel[],
    nonselected: multipleSelectorModel[]
  ): void;
}
export interface multipleSelectorModel {
  key: number;
  value: string;
}
