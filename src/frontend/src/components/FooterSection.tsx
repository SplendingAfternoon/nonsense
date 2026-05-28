export default function FooterSection() {
  return (
    <footer
      data-ocid="footer.section"
      className="text-center py-8 px-8"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
          fontSize: "11px",
          color: "#7a7570",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {"SYS.VER 4.0  //  LAT: 51.507\u00b0  //  STATUS: SECURE."}
      </span>
    </footer>
  );
}
