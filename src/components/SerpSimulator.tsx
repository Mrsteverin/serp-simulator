import React, { useState, useCallback, useMemo } from 'react';

// ─── i18n ────────────────────────────────────────────────────────────────────

type Lang = 'sv' | 'en';

const T = {
  sv: {
    appTitle: 'SERP Simulator',
    appSub: 'Förhandsgranska hur din sida visas i Google Sök',
    fetchTitle: 'Hämta metadata',
    fetchSub: 'Ange en URL för att hämta befintlig titel och beskrivning',
    fetchPh: 'https://example.com/din-sida',
    fetchBtn: 'Hämta',
    fetchingBtn: 'Hämtar…',
    fetchOk: 'Metadata hämtad — finjustera i fälten nedan.',
    fetchErr: 'Kunde inte hämta metadata — sidan blockerar möjligen externa förfrågningar. Redigera fälten manuellt.',
    editTitle: 'Redigera innehåll',
    editSub: 'Ändringar uppdaterar förhandsgranskningen direkt',
    siteNameLabel: 'Webbplatsnamn',
    siteNameOpt: '(valfritt)',
    siteNamePh: 'Ditt varumärke',
    titleLabel: 'Titel',
    titlePh: 'Din sidtitel som den visas i sökresultat',
    descLabel: 'Metabeskrivning',
    descPh: 'Beskriv din sida tydligt och engagerande för sökmotoranvändare.',
    looksGood: 'Ser bra ut',
    titleGettingLong: 'Titel börjar bli lång',
    descGettingLong: 'Beskrivning börjar bli lång',
    titleWarn: 'Titeln kan vara för bred för att visas i sin helhet.',
    descWarn: 'Metabeskrivningen kan trunkeras i sökresultat.',
    titleInfo: 'Titeln är ditt viktigaste SEO-element. Google visar den som klickbar länk i sökresultat — en tydlig, relevant titel lockar fler klick och hjälper sökmotorn förstå vad sidan handlar om.',
    descInfo: 'Metabeskrivningen visas under titeln i sökresultaten. Den påverkar inte rankning direkt, men en välskriven beskrivning ökar klickfrekvensen (CTR) markant. Håll den relevant, konkret och lockande.',
    clear: 'Rensa',
    copyTitle: 'Kopiera titel',
    copyDesc: 'Kopiera beskrivning',
    copyMeta: 'Kopiera metataggar',
    copied: '✓ Kopierad',
    preview: 'Live-förhandsvisning',
    desktop: 'Dator',
    mobile: 'Mobil',
    resultsCount: 'Ungefär 4 320 000 resultat (0,38 sek)',
    limitsNote: 'gränser · titel',
    limitsMid: 'px · beskrivning',
    titleCutOff: 'Titeln kan klippas av i sökresultat',
    descTrunc: 'Beskrivningen kan trunkeras i sökresultat',
    searchTabs: ['Alla', 'Bilder', 'Videor', 'Nyheter', 'Kartor', 'Mer'],
  },
  en: {
    appTitle: 'SERP Simulator',
    appSub: 'Preview how your page appears in Google Search',
    fetchTitle: 'Fetch Metadata',
    fetchSub: 'Enter a URL to pull in the existing title and description',
    fetchPh: 'https://example.com/your-page',
    fetchBtn: 'Fetch',
    fetchingBtn: 'Fetching…',
    fetchOk: 'Metadata fetched — refine it in the fields below.',
    fetchErr: "Couldn't fetch metadata — the site may block external requests. Edit the fields manually.",
    editTitle: 'Edit Content',
    editSub: 'Changes update the preview instantly',
    siteNameLabel: 'Site Name',
    siteNameOpt: '(optional)',
    siteNamePh: 'Your Brand',
    titleLabel: 'Title',
    titlePh: 'Your page title as it appears in search results',
    descLabel: 'Meta Description',
    descPh: 'Describe your page clearly and compellingly for search engine users.',
    looksGood: 'Looks good',
    titleGettingLong: 'Title getting long',
    descGettingLong: 'Description getting long',
    titleWarn: 'The title may be too wide to display fully.',
    descWarn: 'The meta description may be truncated in search results.',
    titleInfo: 'The title is your most important SEO element. Google displays it as the clickable link in search results — a clear, relevant title attracts more clicks and helps search engines understand your page.',
    descInfo: 'The meta description appears below the title in search results. It does not directly affect rankings, but a well-written description can significantly increase click-through rate (CTR). Keep it relevant, specific, and compelling.',
    clear: 'Clear / Reset',
    copyTitle: 'Copy Title',
    copyDesc: 'Copy Description',
    copyMeta: 'Copy Meta Tags',
    copied: '✓ Copied',
    preview: 'Live Preview',
    desktop: 'Desktop',
    mobile: 'Mobile',
    resultsCount: 'About 4,320,000 results (0.38 seconds)',
    limitsNote: 'limits · title',
    limitsMid: 'px · description',
    titleCutOff: 'Title may be cut off in search results',
    descTrunc: 'Description may be truncated in search results',
    searchTabs: ['All', 'Images', 'Videos', 'News', 'Maps', 'More'],
  },
} as const;

// ─── Types & Constants ───────────────────────────────────────────────────────

type ViewMode = 'desktop' | 'mobile';
type ValidationState = 'optimal' | 'getting-long' | 'truncated';

const THRESHOLDS = {
  title: { desktop: { orange: 500, red: 600 }, mobile: { orange: 400, red: 480 } },
  desc:  { desktop: { orange: 815, red: 897 }, mobile: { orange: 567, red: 680 } },
} as const;

const TITLE_FONT = '20px Arial, sans-serif';
const DESC_FONT  = '14px Arial, sans-serif';

// ─── Utilities ───────────────────────────────────────────────────────────────

function measurePx(text: string, font: string): number {
  if (typeof document === 'undefined' || !text) return 0;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return 0;
  ctx.font = font;
  return Math.round(ctx.measureText(text).width);
}

function getState(px: number, orange: number, red: number): ValidationState {
  return px >= red ? 'truncated' : px >= orange ? 'getting-long' : 'optimal';
}

function parseMeta(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return {
    title:       doc.querySelector('title')?.textContent?.trim() ?? '',
    description: doc.querySelector('meta[name="description"]')?.getAttribute('content')?.trim()
                 ?? doc.querySelector('meta[property="og:description"]')?.getAttribute('content')?.trim() ?? '',
    siteName:    doc.querySelector('meta[property="og:site_name"]')?.getAttribute('content')?.trim() ?? '',
  };
}

async function fetchWithProxies(url: string): Promise<string> {
  const attempts = [
    async () => { const r = await fetch(`https://corsproxy.io/?url=${encodeURIComponent(url)}`, { signal: AbortSignal.timeout(8000) }); if (!r.ok) throw new Error(); return r.text(); },
    async () => { const r = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`, { signal: AbortSignal.timeout(8000) }); if (!r.ok) throw new Error(); return r.text(); },
    async () => { const r = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, { signal: AbortSignal.timeout(8000) }); const j = await r.json(); if (!j.contents) throw new Error(); return j.contents as string; },
  ];
  for (const a of attempts) { try { const html = await a(); if (html.length > 200) return html; } catch { /* next */ } }
  throw new Error('All proxies failed');
}

function faviconFor(rawUrl: string): string {
  try { return `https://www.google.com/s2/favicons?domain=${new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`).hostname}&sz=32`; }
  catch { return ''; }
}

function toBreadcrumb(rawUrl: string): string {
  try { const u = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`); return [u.hostname, ...u.pathname.split('/').filter(Boolean)].join(' › '); }
  catch { return rawUrl; }
}

function toDomain(rawUrl: string): string {
  try { return new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`).hostname; }
  catch { return rawUrl; }
}

// ─── Progress Bar ────────────────────────────────────────────────────────────

function ProgressBar({ px, max, state }: { px: number; max: number; state: ValidationState }) {
  const color = state === 'truncated' ? 'bg-red-500' : state === 'getting-long' ? 'bg-amber-400' : 'bg-emerald-500';
  return (
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-200 ${color}`} style={{ width: `${Math.min((px / max) * 100, 100)}%` }} />
    </div>
  );
}

// ─── Field Meta ──────────────────────────────────────────────────────────────

function FieldMeta({ px, max, state, warningMsg, looksGood, gettingLong }: {
  px: number; max: number; state: ValidationState; warningMsg: string; looksGood: string; gettingLong: string;
}) {
  const text  = state === 'truncated' ? warningMsg : state === 'getting-long' ? gettingLong : px > 0 ? looksGood : '';
  const color = state === 'truncated' ? 'text-red-600' : state === 'getting-long' ? 'text-amber-600' : 'text-emerald-600';
  return (
    <div className="space-y-2">
      <ProgressBar px={px} max={max} state={state} />
      <div className="flex items-center justify-between">
        <span className={`text-xs ${color}`}>{text}</span>
        <span className="text-xs text-gray-400 tabular-nums">{px}px / {max}px</span>
      </div>
    </div>
  );
}

// ─── Input class ─────────────────────────────────────────────────────────────

function inputCls(state: ValidationState, extra = '') {
  const border = state === 'truncated' ? 'border-red-400 focus:ring-red-100 focus:border-red-400' : state === 'getting-long' ? 'border-amber-400 focus:ring-amber-100 focus:border-amber-400' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-300';
  return `w-full rounded-xl border px-4 py-3 text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${border} ${extra}`;
}

// ─── Ghost skeleton result ───────────────────────────────────────────────────

function GhostResult({ compact = false }: { compact?: boolean }) {
  const bar = (w: string, h = 'h-3', extra = '') =>
    <div className={`${h} ${w} bg-gray-200 rounded-sm animate-pulse ${extra}`} />;
  return (
    <div className={`${compact ? 'py-3' : 'py-4'} border-t border-gray-100`}>
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-4 h-4 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
        {bar('w-24')}
      </div>
      {bar('w-40', 'h-2.5', 'mb-2')}
      {bar(compact ? 'w-4/5' : 'w-3/4', 'h-5 bg-indigo-100', 'mb-2')}
      <div className="space-y-1.5">
        {bar('w-full', 'h-2.5')}
        {bar('w-5/6', 'h-2.5')}
        {!compact && bar('w-2/3', 'h-2.5')}
      </div>
    </div>
  );
}

// ─── Google tabs bar ─────────────────────────────────────────────────────────

function GoogleTabs({ tabs, compact = false }: { tabs: readonly string[]; compact?: boolean }) {
  return (
    <div className={`flex items-center gap-0 border-b border-gray-200 ${compact ? 'mt-1' : 'mt-2'}`}>
      {tabs.map((tab, i) => (
        <div
          key={tab}
          className={`${compact ? 'px-2.5 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'} font-medium cursor-default whitespace-nowrap ${
            i === 0
              ? 'text-blue-600 border-b-2 border-blue-600 -mb-px'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}

// ─── Real SERP result card ───────────────────────────────────────────────────

function SerpResult({ title, description, siteName, favicon, url, viewMode, compact = false }: {
  title: string; description: string; siteName: string;
  favicon: string; url: string; viewMode: ViewMode; compact?: boolean;
}) {
  const bc          = toBreadcrumb(url);
  const domain      = toDomain(url);
  const displaySite = siteName || domain || 'example.com';
  const titleMax    = THRESHOLDS.title[viewMode];
  const descMax     = THRESHOLDS.desc[viewMode];
  const titleOver   = measurePx(title, TITLE_FONT) > titleMax;
  const descOver    = measurePx(description, DESC_FONT) > descMax;

  const fallbackTitle = 'Din sidtitel';
  const fallbackDesc  = 'Din metabeskrivning visas här. Skriv något engagerande som lockar användare att klicka på ditt resultat.';

  const titleSize = compact ? 'text-lg' : 'text-xl';
  const textSize  = compact ? 'text-xs'  : 'text-sm';

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Favicon + site */}
      <div className="flex items-center gap-2 mb-0.5">
        {favicon ? (
          <img src={favicon} alt="" width={16} height={16} className="rounded-full flex-shrink-0"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        ) : (
          <div className="w-4 h-4 rounded-full bg-gray-300 flex-shrink-0" />
        )}
        <span className={`${textSize} leading-tight font-medium`} style={{ color: '#202124' }}>{displaySite}</span>
      </div>
      {/* Breadcrumb */}
      <div className={`${textSize} leading-snug mb-2 truncate`} style={{ color: '#202124' }}>
        {bc || 'www.example.com › sida › stig'}
      </div>
      {/* Title */}
      <div
        className={`${titleSize} leading-snug mb-2 cursor-pointer hover:underline`}
        style={compact
          ? { color: '#1a0dab', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties
          : { color: '#1a0dab', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        title={title}
      >
        {title || fallbackTitle}
      </div>
      {/* Description */}
      <div
        className={`${textSize} leading-relaxed`}
        style={{ color: '#4d5156', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}
      >
        {description || fallbackDesc}
      </div>
      {/* Overflow badges */}
      {(titleOver || descOver) && (
        <div className="mt-2 space-y-1">
          {titleOver && (
            <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 rounded px-2 py-1">
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {viewMode === 'desktop' ? 'Titeln kan klippas av i sökresultat' : 'Title may be cut off'}
            </div>
          )}
          {descOver && (
            <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 rounded px-2 py-1">
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {viewMode === 'desktop' ? 'Beskrivningen kan trunkeras i sökresultat' : 'Description may be truncated'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Desktop SERP preview ────────────────────────────────────────────────────

function DesktopPreview({ serpProps, t }: { serpProps: any; t: typeof T['sv'] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
      {/* Google header */}
      <div className="px-6 pt-5 pb-0 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          {/* Google logo */}
          <svg className="flex-shrink-0 h-7 w-7" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {/* Blank search bar */}
          <div className="flex-1 flex items-center gap-3 rounded-full border border-gray-300 bg-white px-5 py-2.5" style={{ boxShadow: '0 1px 6px rgba(32,33,36,0.1)' }}>
            <span className="flex-1" />
            <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
        </div>
        <GoogleTabs tabs={t.searchTabs} />
      </div>

      {/* Results area */}
      <div className="px-6 py-4">
        <p className="text-xs text-gray-500 mb-4">{t.resultsCount}</p>
        {/* Real result */}
        <SerpResult {...serpProps} />
        {/* Ghost results */}
        <GhostResult />
        <GhostResult />
      </div>
    </div>
  );
}

// ─── Mobile SERP preview (phone frame) ───────────────────────────────────────

function MobilePreview({ serpProps, t }: { serpProps: any; t: typeof T['sv'] }) {
  return (
    <div className="flex justify-center">
      <div className="relative" style={{ width: '320px' }}>
        {/* Phone outer frame */}
        <div className="relative rounded-[44px] p-3" style={{
          background: 'linear-gradient(160deg, #2e2e2e 0%, #191919 100%)',
          boxShadow: '0 0 0 1.5px #444, 0 0 0 3px #111, 0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}>
          {/* Buttons */}
          {[58, 96, 134].map((top, i) => (
            <div key={i} style={{ position: 'absolute', left: '-3.5px', top, width: '3.5px', height: i === 0 ? 20 : 30, background: '#3a3a3a', borderRadius: '2px 0 0 2px' }} />
          ))}
          <div style={{ position: 'absolute', right: '-3.5px', top: 108, width: '3.5px', height: 48, background: '#3a3a3a', borderRadius: '0 2px 2px 0' }} />

          {/* Screen */}
          <div className="rounded-[34px] overflow-hidden bg-white" style={{ minHeight: '600px' }}>
            {/* Dynamic Island */}
            <div style={{ position: 'absolute', top: '22px', left: '50%', transform: 'translateX(-50%)', width: 96, height: 28, background: '#191919', borderRadius: 16, zIndex: 10 }} />

            {/* Status bar */}
            <div className="flex items-end justify-between pt-2 pb-1.5 px-5" style={{ height: 48 }}>
              <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'system-ui' }}>9:41</span>
              <div className="flex items-center gap-1.5">
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                  <rect x="0" y="6" width="2.5" height="5" rx="0.5" fill="#111"/>
                  <rect x="4" y="4" width="2.5" height="7" rx="0.5" fill="#111"/>
                  <rect x="8" y="2" width="2.5" height="9" rx="0.5" fill="#111"/>
                  <rect x="12" y="0" width="2.5" height="11" rx="0.5" fill="#111"/>
                </svg>
                <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                  <path d="M7.5 9a1 1 0 100 2 1 1 0 000-2z" fill="#111"/>
                  <path d="M4.5 6.5a4.2 4.2 0 016 0" stroke="#111" strokeWidth="1.3" strokeLinecap="round"/>
                  <path d="M2 4a7.5 7.5 0 0111 0" stroke="#111" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
                  <rect x="0.5" y="0.5" width="22" height="11" rx="3.5" stroke="#111" strokeOpacity="0.35"/>
                  <rect x="2" y="2" width="18" height="8" rx="2" fill="#111"/>
                  <path d="M23.5 4.5v3a1.5 1.5 0 000-3z" fill="#111" opacity="0.4"/>
                </svg>
              </div>
            </div>

            {/* Chrome address bar */}
            <div className="px-3 pb-2">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
                <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/></svg>
                <span className="text-xs text-gray-500 flex-1 truncate">google.com/search</span>
                <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/></svg>
              </div>
            </div>

            {/* Google SERP page content */}
            <div className="overflow-y-auto" style={{ maxHeight: '530px' }}>
              {/* Google logo + search bar */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200">
                <svg className="flex-shrink-0 h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <div className="flex-1 flex items-center bg-gray-100 rounded-full px-3 py-1.5">
                  <span className="flex-1 text-xs text-gray-400" />
                  <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/></svg>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-0 border-b border-gray-200 px-2 overflow-x-auto no-scrollbar">
                {t.searchTabs.map((tab, i) => (
                  <div key={tab} className={`px-2.5 py-2 text-xs font-medium whitespace-nowrap flex-shrink-0 ${i === 0 ? 'text-blue-600 border-b-2 border-blue-600 -mb-px' : 'text-gray-600'}`}>
                    {tab}
                  </div>
                ))}
              </div>

              {/* Results */}
              <div className="px-3 pt-2 pb-4">
                <p className="text-xs text-gray-400 mb-3" style={{ fontSize: 10 }}>{t.resultsCount}</p>
                <SerpResult {...serpProps} viewMode="mobile" compact />
                <GhostResult compact />
                <GhostResult compact />
              </div>
            </div>

            {/* Home indicator */}
            <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 100, height: 4, background: '#000', borderRadius: 2, opacity: 0.15 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Info Tip ────────────────────────────────────────────────────────────────

function InfoTip({ text }: { text: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen(v => !v)}
        className="text-[10px] italic font-semibold leading-none focus:outline-none flex-shrink-0 transition-opacity hover:opacity-60 normal-case"
        style={{ color: '#c0392b', letterSpacing: 0 }}
        aria-label="Info"
      >i</button>
      {open && (
        <span className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-64 rounded-xl px-3.5 py-3 text-xs text-gray-700 leading-relaxed shadow-lg"
          style={{ background: '#fff', border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}>
          {text}
        </span>
      )}
    </span>
  );
}

// ─── Copy Button ─────────────────────────────────────────────────────────────

function CopyBtn({ label, text, id, copied, onCopy }: { label: string; text: string; id: string; copied: string; onCopy: (t: string, id: string) => void }) {
  const done = copied === id;
  return (
    <button onClick={() => onCopy(text, id)} disabled={!text}
      className="px-4 py-2.5 text-sm font-medium rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm active:scale-95 text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300">
      {done ? '✓ Kopierat' : label}
    </button>
  );
}

// ─── View Toggle ─────────────────────────────────────────────────────────────

function ViewToggle({ mode, onChange, t }: { mode: ViewMode; onChange: (m: ViewMode) => void; t: typeof T['sv'] }) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      {(['desktop', 'mobile'] as ViewMode[]).map((m) => (
        <button key={m} onClick={() => onChange(m)}
          className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md transition-all ${mode === m ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
          {m === 'desktop' ? (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="2" y="3" width="20" height="14" rx="2"/><path strokeLinecap="round" d="M8 21h8M12 17v4"/></svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="1" fill="currentColor" stroke="none"/></svg>
          )}
          {m === 'desktop' ? t.desktop : t.mobile}
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SerpSimulator() {
  const [lang,        setLang]       = useState<Lang>('sv');
  const [url,         setUrl]        = useState('');
  const [siteName,    setSiteName]   = useState('');
  const [title,       setTitle]      = useState('');
  const [description, setDesc]       = useState('');
  const [viewMode,    setViewMode]   = useState<ViewMode>('desktop');
  const [fetching,    setFetching]   = useState(false);
  const [fetchError,  setFetchError] = useState('');
  const [fetchOk,     setFetchOk]    = useState(false);
  const [copied,      setCopied]     = useState('');

  const t = T[lang];
  const favicon    = useMemo(() => faviconFor(url), [url]);
  const titleThresh = THRESHOLDS.title[viewMode];
  const descThresh  = THRESHOLDS.desc[viewMode];
  const titleMax    = titleThresh.red;
  const descMax     = descThresh.red;
  const titlePx     = measurePx(title, TITLE_FONT);
  const descPx      = measurePx(description, DESC_FONT);
  const titleState  = getState(titlePx, titleThresh.orange, titleThresh.red);
  const descState   = getState(descPx,  descThresh.orange,  descThresh.red);

  const fetchMeta = useCallback(async () => {
    if (!url.trim()) return;
    setFetching(true); setFetchError(''); setFetchOk(false);
    try {
      const clean = url.startsWith('http') ? url : `https://${url}`;
      const html  = await fetchWithProxies(clean);
      const meta  = parseMeta(html);
      setTitle(meta.title); setDesc(meta.description); setSiteName(meta.siteName);
      setFetchOk(true);
    } catch { setFetchError(t.fetchErr); }
    finally  { setFetching(false); }
  }, [url, t]);

  const reset = () => { setUrl(''); setSiteName(''); setTitle(''); setDesc(''); setFetchError(''); setFetchOk(false); };

  const copy = useCallback(async (text: string, id: string) => {
    try { await navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(''), 2000); } catch { /* */ }
  }, []);

  const metaTags   = `<title>${title}</title>\n<meta name="description" content="${description}">`;
  const serpProps  = { title, description, siteName, favicon, url, viewMode };

  return (
    <div className="min-h-screen" style={{ background: '#f5f6f8', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-base font-semibold text-gray-900 leading-tight">{t.appTitle}</h1>
            <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">{t.appSub}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {(['sv', 'en'] as Lang[]).map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${lang === l ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            {/* Mobile device toggle */}
            <div className="lg:hidden">
              <ViewToggle mode={viewMode} onChange={setViewMode} t={t} />
            </div>
          </div>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-7 md:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">

          {/* ═══ Left column ════════════════════════════════════ */}
          <div className="w-full lg:w-[440px] flex-shrink-0 space-y-5">

            {/* Fetch card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
              <div>
                <h2 className="text-sm font-semibold text-gray-800">{t.fetchTitle}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{t.fetchSub}</p>
              </div>
              <div className="flex gap-2">
                <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && fetchMeta()}
                  placeholder={t.fetchPh}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-colors min-w-0" />
                <button onClick={fetchMeta} disabled={fetching || !url.trim()}
                  className="flex-shrink-0 px-5 py-3 text-sm font-bold uppercase tracking-wide rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 hover:brightness-105 active:scale-95"
                  style={{ background: '#1a1a1a', color: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
                  {fetching ? (<><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg><span>{t.fetchingBtn}</span></>) : t.fetchBtn}
                </button>
              </div>
              {fetchError && (
                <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"/></svg>
                  <span>{fetchError}</span>
                </div>
              )}
              {fetchOk && (
                <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  {t.fetchOk}
                </div>
              )}
            </div>

            {/* Edit card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
              <div>
                <h2 className="text-sm font-semibold text-gray-800">{t.editTitle}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{t.editSub}</p>
              </div>

              {/* Site name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {t.siteNameLabel} <span className="normal-case font-normal text-gray-400">{t.siteNameOpt}</span>
                </label>
                <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder={t.siteNamePh}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-colors" />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {t.titleLabel} <InfoTip text={t.titleInfo} />
                </label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t.titlePh} className={inputCls(titleState)} />
                <FieldMeta px={titlePx} max={titleMax} state={titleState} warningMsg={t.titleWarn} looksGood={t.looksGood} gettingLong={t.titleGettingLong} />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {t.descLabel} <InfoTip text={t.descInfo} />
                </label>
                <textarea value={description} onChange={(e) => setDesc(e.target.value)} placeholder={t.descPh} rows={4}
                  className={inputCls(descState, 'resize-none leading-relaxed')} />
                <FieldMeta px={descPx} max={descMax} state={descState} warningMsg={t.descWarn} looksGood={t.looksGood} gettingLong={t.descGettingLong} />
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 px-6 py-4" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
              <div className="flex flex-wrap gap-2.5">
                <button onClick={reset}
                  className="px-4 py-2.5 text-sm font-medium rounded-xl transition-all shadow-sm active:scale-95 text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300">
                  {t.clear}
                </button>
                <CopyBtn label={t.copyTitle} text={title}       id="title" copied={copied} onCopy={copy} />
                <CopyBtn label={t.copyDesc}  text={description} id="desc"  copied={copied} onCopy={copy} />
                <CopyBtn label={t.copyMeta}  text={metaTags}    id="meta"  copied={copied} onCopy={copy} />
              </div>
            </div>
          </div>

          {/* ═══ Right column ════════════════════════════════════ */}
          <div className="w-full lg:flex-1 lg:sticky lg:top-[72px]">

            {/* Toggle header */}
            <div className="hidden lg:flex items-center justify-between mb-5">
              <span className="text-sm font-semibold text-gray-700">{t.preview}</span>
              <ViewToggle mode={viewMode} onChange={setViewMode} t={t} />
            </div>

            {viewMode === 'desktop' && <DesktopPreview serpProps={serpProps} t={t} />}
            {viewMode === 'mobile'  && <MobilePreview  serpProps={serpProps} t={t} />}

            <p className="text-xs text-gray-400 text-center mt-4">
              {viewMode === 'desktop' ? t.desktopLimits ?? 'Datorgränser' : t.mobileLimits ?? 'Mobilgränser'} · titel {titleMax}px · beskrivning {descMax}px
            </p>

            {/* CTA */}
            <div className="mt-6 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }}>
              <div>
                <p className="text-sm font-semibold text-white leading-snug">Vill du synas högre på Google och i AI?</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>Hör av dig så snackar vi möjligheter och kollar din potential.</p>
              </div>
              <a
                href="https://www.digitaleffekt.nu/kontakt/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all hover:brightness-110 active:scale-95"
                style={{ background: '#F0EF6C', color: '#1a1a1a' }}
              >
                Jag vill ha hjälp med min synlighet →
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
