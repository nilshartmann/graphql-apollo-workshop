export function Card({ children }) {
  return <div className={"Card"}>{children}</div>;
}

export function InfoCard({ title, label, actions }) {
  const cardActions = actions ? (
    <div className="ButtonBar left">
      {actions.map((a, ix) => (
        <Button key={ix} tertiary onClick={a.onExecute}>
          {a.label}
        </Button>
      ))}
    </div>
  ) : null;

  return (
    <Card>
      <div className={"CardLabel"}>{label}</div>
      <div className={"CardTitle"}>{title}</div>
      {cardActions}
    </Card>
  );
}

export function Button({ children, onClick, secondary, tertiary, disabled }) {
  const buttonClassName = secondary
    ? "Button secondary"
    : tertiary
    ? "Button tertiary"
    : "Button";

  return (
    <button className={buttonClassName} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function Select({ label, value, options, onNewValue }) {
  function handleSelectChange(e) {
    const value = e.currentTarget.value;
    if ("UNSELECTED" === value) {
      onNewValue("");
    } else {
      onNewValue(value);
    }
  }

  return (
    <div className={"Select"}>
      <label>{label}</label>
      <select
        onChange={handleSelectChange}
        value={value === "" ? "UNSELECTED" : value}
      >
        <option value={"UNSELECTED"} />
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function LoadingIndicator({ children }) {
  return (
    <div className="LoadingIndicator">
      <div className="Spinner">
        {children && <h1>{children}</h1>}
        <div className="bounce bounce1" />
        <div className="bounce bounce2" />
        <div className="bounce bounce3" />
      </div>
    </div>
  );
}
