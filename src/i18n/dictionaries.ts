export interface Dictionary {
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  spinButton: string;
  spinning: string;
  winnerAnnouncement: string;
  optionsTitle: string;
  addOptionPlaceholder: string;
  bulkEditLabel: string;
  bulkEditPlaceholder: string;
  spinPowerLabel: string;
  shareViaQR: string;
  learnHub: string;
  privacyNotice: string;
}

export const DICTIONARIES: Record<string, Dictionary> = {
  en: {
    heroTagline: "Decision Making Made Easy",
    heroTitle: "Spin the Wheel of Decisions",
    heroSubtitle: "Can't make up your mind? Input your options, spin the wheel, and let fate decide instantly! Fast, fair, and fun.",
    spinButton: "SPIN!",
    spinning: "Spinning...",
    winnerAnnouncement: "The Winner is",
    optionsTitle: "Wheel Options",
    addOptionPlaceholder: "Add new option...",
    bulkEditLabel: "Bulk Edit (one option per line)",
    bulkEditPlaceholder: "Paste your options here...",
    spinPowerLabel: "Manual Spin Power",
    shareViaQR: "Share via QR",
    learnHub: "Learn Hub",
    privacyNotice: "Your options never leave your device. All calculations are stored locally.",
  },
  es: {
    heroTagline: "Toma de decisiones fácil",
    heroTitle: "Gira la Ruleta de Decisiones",
    heroSubtitle: "¿No puedes decidirte? Ingresa tus opciones, gira la rueda y deja que el destino decida al instante.",
    spinButton: "¡GIRAR!",
    spinning: "Girando...",
    winnerAnnouncement: "El Ganador es",
    optionsTitle: "Opciones de la Ruleta",
    addOptionPlaceholder: "Añadir nueva opción...",
    bulkEditLabel: "Edición masiva (una opción por línea)",
    bulkEditPlaceholder: "Pega tus opciones aquí...",
    spinPowerLabel: "Fuerza de Giro Manual",
    shareViaQR: "Compartir por QR",
    learnHub: "Centro de Aprendizaje",
    privacyNotice: "Tus opciones nunca salen de tu dispositivo. Todo se guarda localmente.",
  },
  fr: {
    heroTagline: "Prise de décision facilitée",
    heroTitle: "Tournez la Roue des Décisions",
    heroSubtitle: "Besoin d'aide pour choisir ? Entrez vos options, tournez la roue et laissez le destin décider.",
    spinButton: "TOURNER !",
    spinning: "Tourne...",
    winnerAnnouncement: "Le Gagnant est",
    optionsTitle: "Options de la Roue",
    addOptionPlaceholder: "Ajouter una option...",
    bulkEditLabel: "Édition en masse (une option par ligne)",
    bulkEditPlaceholder: "Collez vos options ici...",
    spinPowerLabel: "Puissance de Rotation",
    shareViaQR: "Partager via QR",
    learnHub: "Centre de Connaissances",
    privacyNotice: "Vos options ne quittent jamais votre appareil. Tout est stocké localement.",
  },
  de: {
    heroTagline: "Entscheidungen leicht gemacht",
    heroTitle: "Drehe das Entscheidungsrad",
    heroSubtitle: "Du kannst dich nicht entscheiden? Gib deine Optionen ein, drehe das Rad und lass den Zufall entscheiden.",
    spinButton: "DREHEN!",
    spinning: "Dreht sich...",
    winnerAnnouncement: "Der Gewinner ist",
    optionsTitle: "Rad-Optionen",
    addOptionPlaceholder: "Neue Option hinzufügen...",
    bulkEditLabel: "Massenbearbeitung (eine Option pro Zeile)",
    bulkEditPlaceholder: "Füge deine Optionen hier ein...",
    spinPowerLabel: "Manuelle Drehkraft",
    shareViaQR: "Per QR teilen",
    learnHub: "Lern-Zentrum",
    privacyNotice: "Deine Optionen verlassen nie dein Gerät. Alles wird lokal gespeichert.",
  },
  ar: {
    heroTagline: "صنع القرارات بأسهل طريقة",
    heroTitle: "أدر عجلة القرارات الفورية",
    heroSubtitle: "هل تحتار في الاختيار؟ أدخل خياراتك، أدر العجلة، ودع القدر يقرر فوراً بشكل عادل وممتع.",
    spinButton: "تدوير!",
    spinning: "جاري الدوران...",
    winnerAnnouncement: "الفائز هو",
    optionsTitle: "خيارات العجلة",
    addOptionPlaceholder: "إضافة خيار جديد...",
    bulkEditLabel: "تعديل جماعي (خيار واحد في كل سطر)",
    bulkEditPlaceholder: "الصق خياراتك هنا...",
    spinPowerLabel: "قوة الدوران اليدوية",
    shareViaQR: "مشاركة عبر رمز QR",
    learnHub: "مركز التعلم",
    privacyNotice: "خياراتك لا تغادر جهازك أبداً. يتم إجراء كل الحسابات محلياً.",
  },
};
