

type Props = { onStart: () => void };

export default function StartScreen({ onStart }: Props) {
    return (
        <div style={{ padding: 24, maxWidth: 640, margin: '40px auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
                AI Görsel Tahmin Oyunu
            </h1>

            <p style={{ fontSize: 14, color: '#555', marginBottom: 16 }}>
                3 görselden hangisi yapay zekâ tarafından üretildi? Kuralları oku ve başla!
            </p>

            <div style={{ textAlign: 'left', background: '#f7f7f8', border: '1px solid #e6e6e8', padding: 16, borderRadius: 8, marginBottom: 20 }}>
                <ul style={{ margin: 0, paddingLeft: 16, fontSize: 14 }}>
                    <li>3 görsel: 2 gerçek, 1 AI.</li>
                    <li>İlk tahmin yanlışsa ipucu alırsın.</li>
                    <li>Sonra kalan 2 görsel arasından ikinci şans.</li>
                    <li>En az 2 oyun modu: Klasik & Zamanlı.</li>
                </ul>
            </div>

            <button
                onClick={onStart}
                style={{
                    padding: '10px 16px',
                    borderRadius: 8,
                    background: '#111',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Başla
            </button>
        </div>
    );
}
