import Card from "./Card";

export default function Chart({ title, subtitle, action, children, className = "" }) {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="theme-text font-display text-lg font-bold">{title}</h3>
          <p className="theme-muted mt-1 text-sm">{subtitle}</p>
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </Card>
  );
}
