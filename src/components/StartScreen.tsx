type Props = {
    onStart: () => void;
};

export default function StartScreen({ onStart }: Props) {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'grid',
                placeItems: 'center',
                padding: 24,
                background:
                    'radial-gradient(1200px circle at 20% 10%, rgba(99,102,241,0.25), transparent 40%), radial-gradient(900px circle at 80% 40%, rgba(34,197,94,0.18), transparent 45%), #0b0f19',
                color: '#e5e7eb',
            }}
        >
            <div
                style={{
                    width: 'min(920px, 100%)',
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 0.8fr',
                    gap: 18,
                    alignItems: 'stretch',
                }}
            >
                {/* Sol: Başlık + açıklama */}
                <div
                    style={{
                        border: '1px solid rgba(255,255,255,0.10)',
                        borderRadius: 16,
                        padding: 22,
                        background: 'rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                    }}
                >
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '6px 10px',
                            borderRadius: 999,
                            background: 'rgba(99,102,241,0.18)',
                            border: '1px solid rgba(99,102,241,0.35)',
                            fontSize: 12,
                            color: '#c7d2fe',
                            marginBottom: 12,
                        }}
                    >
                        <span>AI vs Gerçek</span>
                        <span style={{ opacity: 0.7 }}>•</span>
                        <span>3 görsel</span>
                    </div>

                    <h1 style={{ margin: 0, fontSize: 34, lineHeight: 1.15, letterSpacing: -0.5 }}>
                        Yapay Zeka Görsel Tahmin Oyunu
                    </h1>

                    <p style={{ marginTop: 10, marginBottom: 0, fontSize: 14, color: '#cbd5e1' }}>
                        Üç görselden <b>hangisinin AI tarafından üretildiğini</b> bul. İlk tahmin yanlışsa bir ipucu
                        alırsın ve kalan iki görsel arasından ikinci şansın olur.
                    </p>

                    <div
                        style={{
                            marginTop: 16,
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 10,
                        }}
                    >
                        {[
                            { title: 'Hızlı tur', desc: 'Bir seçim → sonuç. Yanlışsa ipucu + 2. şans.' },
                            { title: '2 oyun modu', desc: 'Klasik ve Zamanlı (timer eklenecek).' },
                            { title: 'İpucu sistemi', desc: 'Arka plan, simetri, doku gibi ipuçları.' },
                            { title: 'Skor sistemi', desc: 'Klasik modda doğru tahminlerle skorunu artır.' },
                        ].map((item) => (
                            <div
                                key={item.title}
                                style={{
                                    borderRadius: 12,
                                    padding: 12,
                                    border: '1px solid rgba(255,255,255,0.10)',
                                    background: 'rgba(0,0,0,0.22)',
                                }}
                            >
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#e5e7eb' }}>{item.title}</div>
                                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sağ: Kurallar + buton */}
                <div
                    style={{
                        border: '1px solid rgba(255,255,255,0.10)',
                        borderRadius: 16,
                        padding: 22,
                        background: 'rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: 14,
                    }}
                >
                    <div>
                        <h2 style={{ margin: 0, fontSize: 16, color: '#e5e7eb' }}>Kurallar</h2>
                        <ul style={{ marginTop: 10, marginBottom: 0, paddingLeft: 18, color: '#cbd5e1', fontSize: 13 }}>
                            <li>Aynı anda 3 görsel görürsün: 2 gerçek, 1 AI.</li>
                            <li>İlk tahmin yanlışsa ipucu alırsın.</li>
                            <li>Kalan 2 görsel arasında ikinci şansın vardır.</li>
                            <li>Tur sonunda sonuç ekranı gelir ve yeni tur başlatırsın.</li>
                        </ul>
                    </div>

                    <button
                        onClick={onStart}
                        style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: 12,
                            border: '1px solid rgba(255,255,255,0.14)',
                            background: 'linear-gradient(135deg, rgba(99,102,241,0.95), rgba(34,197,94,0.75))',
                            color: '#0b0f19',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 10px 22px rgba(0,0,0,0.35)',
                        }}
                    >
                        Başla →
                    </button>

                    <div style={{ fontSize: 12, color: '#94a3b8' }}>
                        İpucu: AI görsellerde bazen küçük detay tutarsızlıkları olur.
                    </div>
                </div>
            </div>
        </div>
    );
}
