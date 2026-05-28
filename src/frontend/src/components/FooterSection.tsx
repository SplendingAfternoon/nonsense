export default function FooterSection() {
  return (
    <footer
      data-ocid="footer.section"
      style={{
        textAlign: "center",
        padding: "2rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          color: "rgba(232,228,222,0.4)",
          letterSpacing: "0.05em",
        }}
      >
        {"SYS.VER 4.0  //  LAT: 51.507°  //  STATUS: SECURE."}
      </span>
    </footer>
  );
}
