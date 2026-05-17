"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Tarayıcının otomatik scroll hatırlama özelliğini devre dışı bırak
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 2. EĞER URL'de hash (#emek, #umitköy vb.) varsa, şube yönlendirmesini bozmamak için en üste kaydırmayı es geç!
    if (window.location.hash || window.location.href.includes("#")) {
      return;
    }

    // 3. Normal sayfa geçişlerinde ve yenilenmelerde en üste sıfırla
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}
