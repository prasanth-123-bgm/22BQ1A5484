// logMiddleware.js
export async function Log(stack, level, pkg, message) {
  try {
    const res = await fetch("http://20.244.56.144/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });

    if (!res.ok) {
      console.error("Logging failed:", res.status);
    }
  } catch (err) {
    console.error("Logging error:", err.message);
  }
}

