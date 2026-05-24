"use client";

import createCache, { type EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { useState, type ReactNode } from "react";

type Registry = {
  cache: EmotionCache;
  flush: () => string[];
};

function createEmotionRegistry(): Registry {
  const cache = createCache({ key: "mui", prepend: true });
  cache.compat = true;
  const prevInsert = cache.insert;
  let inserted: string[] = [];

  cache.insert = (...args) => {
    const serialized = args[1];
    if (serialized && cache.inserted[serialized.name] === undefined) {
      inserted.push(serialized.name);
    }
    return prevInsert(...args);
  };

  const flush = () => {
    const prevInserted = inserted;
    inserted = [];
    return prevInserted;
  };

  return { cache, flush };
}

export function EmotionCacheProvider({ children }: { children: ReactNode }) {
  const [{ cache, flush }] = useState(createEmotionRegistry);

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }

    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }

    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
