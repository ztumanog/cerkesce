export default function GorselPage() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="/faz-kontrol-viz.html"
        title="Faz Kontrol Görselleştirme"
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
}
