export default function HolaplexLink(props) {
  const url = props.url;

  if (url === null) return <></>;

  return (
    <p className="holaplex" style={props.style}>
      <a href={url} title="" target="_blank" rel="noreferrer">
        👋&nbsp;&nbsp;
        <span className="hola-link">Holaplex</span>
      </a>
    </p>
  );
}
