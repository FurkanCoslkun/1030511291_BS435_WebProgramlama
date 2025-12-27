import type { ImageItem } from '../types/game';

export const images: ImageItem[] = [
    // =====================
    // GERÇEK GÖRSELLER
    // =====================

    // --- Portrait ---
    {
        id: 'real-portrait-1',
        url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        isAI: false,
        category: 'portrait',
        hints: ['Cilt dokusu doğal ve pürüzlü görünüyor.'],
    },
    {
        id: 'real-portrait-2',
        url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        isAI: false,
        category: 'portrait',
        hints: ['Yüz hatlarında doğal asimetri var.'],
    },
    {
        id: 'real-portrait-3',
        url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
        isAI: false,
        category: 'portrait',
        hints: ['Işık dağılımı doğal ve düzensiz.'],
    },
    {
        id: 'real-portrait-4',
        url: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
        isAI: false,
        category: 'portrait',
        hints: ['Yüzde küçük kusurlar ve doğal kırışıklıklar var.'],
    },
    {
        id: 'real-portrait-5',
        url: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg',
        isAI: false,
        category: 'portrait',
        hints: ['Göz ve ağız hizası hafif dengesiz.'],
    },

    // --- Nature ---
    {
        id: 'real-nature-1',
        url: 'https://images.pexels.com/photos/34950/pexels-photo.jpg',
        isAI: false,
        category: 'nature',
        hints: ['Doğal ışık geçişleri tutarlı.'],
    },
    {
        id: 'real-nature-2',
        url: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
        isAI: false,
        category: 'nature',
        hints: ['Detaylar rastgele ve karmaşık.'],
    },
    {
        id: 'real-nature-3',
        url: 'https://images.pexels.com/photos/15286/pexels-photo.jpg',
        isAI: false,
        category: 'nature',
        hints: ['Doğal renk tonları korunmuş.'],
    },
    {
        id: 'real-nature-4',
        url: 'https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg',
        isAI: false,
        category: 'nature',
        hints: ['Doğal gölgeler karmaşık ve tutarsız.'],
    },
    {
        id: 'real-nature-5',
        url: 'https://images.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg',
        isAI: false,
        category: 'nature',
        hints: ['Sis ve ışık geçişleri rastgele.'],
    },

    // --- Architecture ---
    {
        id: 'real-architecture-1',
        url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
        isAI: false,
        category: 'architecture',
        hints: ['Bina detayları gerçekçi ve düzensiz.'],
    },
    {
        id: 'real-architecture-2',
        url: 'https://images.pexels.com/photos/256150/pexels-photo-256150.jpeg',
        isAI: false,
        category: 'architecture',
        hints: ['Perspektif hatası yok, çizgiler doğal.'],
    },
    {
        id: 'real-architecture-3',
        url: 'https://images.pexels.com/photos/534174/pexels-photo-534174.jpeg',
        isAI: false,
        category: 'architecture',
        hints: ['Yapı dokusu detaylı ve tutarlı.'],
    },
    {
        id: 'real-architecture-4',
        url: 'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg',
        isAI: false,
        category: 'architecture',
        hints: ['Dikey çizgiler tam paralel değil.'],
    },
    {
        id: 'real-architecture-5',
        url: 'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg',
        isAI: false,
        category: 'architecture',
        hints: ['Pencere ve duvar oranları doğal.'],
    },

    // --- Art ---
    {
        id: 'real-art-1',
        url: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg',
        isAI: false,
        category: 'art',
        hints: ['Fırça darbeleri düzensiz ve gerçekçi.'],
    },
    {
        id: 'real-art-2',
        url: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg',
        isAI: false,
        category: 'art',
        hints: ['Boyama detayları manuel hissi veriyor.'],
    },
    {
        id: 'real-art-3',
        url: 'https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg',
        isAI: false,
        category: 'art',
        hints: ['Doku geçişleri organik.'],
    },

    // =====================
    // AI GİBİ GÖRSELLER
    // =====================

    // --- Portrait ---
    {
        id: 'ai-portrait-1',
        url: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg',
        isAI: true,
        category: 'portrait',
        hints: ['Yüz simetrisi fazla kusursuz.'],
    },
    {
        id: 'ai-portrait-2',
        url: 'https://images.pexels.com/photos/247878/pexels-photo-247878.jpeg',
        isAI: true,
        category: 'portrait',
        hints: ['Cilt dokusu aşırı pürüzsüz.'],
    },
    {
        id: 'ai-portrait-3',
        url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
        isAI: true,
        category: 'portrait',
        hints: ['Işık kaynağı doğal görünmüyor.'],
    },
    {
        id: 'ai-portrait-4',
        url: 'https://images.pexels.com/photos/91224/pexels-photo-91224.jpeg',
        isAI: true,
        category: 'portrait',
        hints: ['Yüz oranları aşırı dengeli.'],
    },
    {
        id: 'ai-portrait-5',
        url: 'https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg',
        isAI: true,
        category: 'portrait',
        hints: ['Cilt dokusu plastik hissi veriyor.'],
    },

    // --- Art ---
    {
        id: 'ai-art-1',
        url: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg',
        isAI: true,
        category: 'art',
        hints: ['Renk geçişleri fazla kusursuz.'],
    },
    {
        id: 'ai-art-2',
        url: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg',
        isAI: true,
        category: 'art',
        hints: ['Detaylar yapay şekilde tekrarlı.'],
    },
    {
        id: 'ai-art-3',
        url: 'https://images.pexels.com/photos/1570779/pexels-photo-1570779.jpeg',
        isAI: true,
        category: 'art',
        hints: ['Kompozisyon gerçekçi olmayan şekilde dengeli.'],
    },

    // --- Nature / Abstract ---
    {
        id: 'ai-nature-1',
        url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
        isAI: true,
        category: 'nature',
        hints: ['Doğada nadir görülen aşırı simetri var.'],
    },
    {
        id: 'ai-nature-2',
        url: 'https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg',
        isAI: true,
        category: 'nature',
        hints: ['Renk dağılımı gerçekçi değil.'],
    },
];
