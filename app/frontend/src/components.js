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
