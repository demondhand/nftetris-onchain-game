import BottomNav from "./BottomNav";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="game-root">
      <div className="game-card">
        
        {/* ===== SCROLLABLE CONTENT ===== */}
        <main className="game-main">
          {children}
        </main>

        {/* ===== FIXED BOTTOM NAV ===== */}
        <BottomNav />
      </div>
    </div>
  );
}
