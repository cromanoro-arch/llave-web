"use client";
import { useEffect, useState } from "react";

export default function Today() {
  const [d, setD] = useState("");
  useEffect(() => {
    setD(new Date().toLocaleDateString("es-BO", { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
  }, []);
  return <span suppressHydrationWarning>{d ? `La Paz, ${d}` : "La Paz, Bolivia"}</span>;
}
