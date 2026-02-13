export function getGameUserId(): string {
  if (typeof window === "undefined") return "";

  let id = localStorage.getItem("game_user_id");

  if (!id) {
    const timestamp = Date.now(); // angka besar, unik
    const random = Math.floor(Math.random() * 1000); // 0–999
    id = `NFTetris${timestamp}${random}`;

    localStorage.setItem("game_user_id", id);
  }

  return id;
}
