export default function Card({ children, className = "" }) {
  return <section className={`card-surface ${className}`}>{children}</section>;
}
