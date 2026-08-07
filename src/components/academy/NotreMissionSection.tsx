import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, HelpCircle } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

const NotreMissionSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Bonjour ! Je suis l'assistant d'orientation DM+ Academy. Quelle formation ou domaine vous intéresse ?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggestions de questions pour guider l'utilisateur
  const suggestions = [
    "Quelles sont les formations disponibles ?",
    "Comment financer ma formation ?",
    "Parlez-moi de la Masterclass Leadership",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate bot response with advanced routing
    setTimeout(() => {
      let botResponse = "";
      const cleanText = textToSend.toLowerCase().trim();

      // Greeting
      if (cleanText.match(/^(bonjour|salut|hello|hey|bonsoir|hi)/)) {
        botResponse = "Bonjour ! Comment puis-je vous aider aujourd'hui dans votre recherche de formation ?";
      }
      // Formations / domaines
      else if (cleanText.includes("formation") || cleanText.includes("cours") || cleanText.includes("dispo") || cleanText.includes("apprendre") || cleanText.includes("programme")) {
        botResponse = "Nous proposons des programmes certifiants en Finance & Investissement, Outils Digitaux & Automatisation, Data & Analytics, Entrepreneuriat, et Soft Skills & Leadership.";
      }
      // Finance / Prix / Combien
      else if (cleanText.includes("finance") || cleanText.includes("argent") || cleanText.includes("prix") || cleanText.includes("pay") || cleanText.includes("tarif") || cleanText.includes("combien") || cleanText.includes("coûte") || cleanText.includes("coute")) {
        botResponse = "Les tarifs dépendent du parcours choisi (intensif ou court). Nos formations peuvent être financées jusqu'à 100% selon votre statut. Contactez notre équipe pour un devis personnalisé !";
      }
      // Inscription / Rejoindre / Participer
      else if (cleanText.includes("inscr") || cleanText.includes("rejoindre") || cleanText.includes("participer") || cleanText.includes("postuler") || cleanText.includes("commencer")) {
        botResponse = "Pour vous inscrire, vous pouvez cliquer sur 'En savoir plus' sur nos programmes ou laisser vos coordonnées dans notre page Contact. Un conseiller vous rappellera sous 24h.";
      }
      // Durée / Temps / Longtemps
      else if (cleanText.includes("durée") || cleanText.includes("duree") || cleanText.includes("temps") || cleanText.includes("longtemps") || cleanText.includes("mois") || cleanText.includes("jour")) {
        botResponse = "Nos formats vont de la Masterclass intensive de 2 jours aux bootcamps complets de 3 à 6 mois, adaptés à votre rythme.";
      }
      // E-learning / Ligne / Replay / Distance
      else if (cleanText.includes("ligne") || cleanText.includes("distance") || cleanText.includes("e-learning") || cleanText.includes("replay") || cleanText.includes("chez moi")) {
        botResponse = "Oui ! Nous offrons des formations 100% en ligne via notre plateforme e-learning (Replay) et des formats hybrides alliant cours en ligne et sessions live.";
      }
      // Leadership
      else if (cleanText.includes("leadership") || cleanText.includes("manager") || cleanText.includes("direction") || cleanText.includes("masterclass")) {
        botResponse = "Notre Masterclass Leadership dure 2 jours en présentiel ou en ligne. Elle est conçue pour perfectionner vos compétences en management d'équipe et leadership stratégique.";
      }
      // Formateurs / Prof / Qui enseigne
      else if (cleanText.includes("formateur") || cleanText.includes("prof") || cleanText.includes("expert") || cleanText.includes("enseigne")) {
        botResponse = "Nos cours sont animés par des experts praticiens actifs dans de grandes entreprises, garantissant un apprentissage ancré dans la réalité du marché.";
      }
      // Contact / Téléphone / Mail / Adresse
      else if (cleanText.includes("contact") || cleanText.includes("téléphone") || cleanText.includes("telephone") || cleanText.includes("mail") || cleanText.includes("adresse") || cleanText.includes("écrire") || cleanText.includes("ecrire")) {
        botResponse = "Vous pouvez joindre nos conseillers d'orientation par téléphone ou nous écrire directement via notre onglet Contact. Nous serons ravis de vous guider !";
      }
      // Localisation / Où / Pays / Ville
      else if (cleanText.includes("où") || cleanText.includes("ou est") || cleanText.includes("ville") || cleanText.includes("pays") || cleanText.includes("afrique") || cleanText.includes("dakar")) {
        botResponse = "Nos formations physiques ont lieu dans nos centres modernes. Vous pouvez également suivre tous nos parcours à distance, où que vous soyez en Afrique et dans le monde.";
      }
      // Fallback intelligent
      else {
        botResponse = "C'est une excellente question ! Chez DM+ Academy, nous adaptons nos formations à vos besoins. Vous souhaitez que l'un de nos conseillers vous contacte pour en discuter ?";
      }

      const botMsg: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: botResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <section className="py-16 lg:py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#800020]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1D0000]/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center md:text-left mb-8">
          <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-widest text-[#800020] bg-[#800020]/10 rounded-full">
            Orientation IA
          </span>
          <h2 className="text-2xl md:text-3xl tracking-tight lg:text-4xl tracking-tight font-black text-gray-900 leading-tight">
            Découvrir nos formations
          </h2>
          <div className="w-12 h-1 rounded-full bg-[#800020] mt-3 hidden md:block" />
        </div>

        {/* Layout : Video Left, Chatbot Right sharing the premium context */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          {/* Video Container (Left) */}
          <div className="w-full lg:w-1/2 flex flex-col bg-[#1D0000] rounded-2xl overflow-hidden shadow-lg border border-white/10 relative">
            <div className="absolute top-3 left-3 z-20 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white text-[10px] font-semibold tracking-wider uppercase">Présentation</span>
            </div>
            
            <div className="w-full h-[220px] md:h-[280px] lg:h-[340px] relative">
              <video
                className="w-full h-full object-cover"
                controls
                loop
                poster="/placeholder.svg"
                title="Présentation de la formation DM+ Academy"
              >
                <source src="https://tre9zd4etmxyc.pika.art/results/pika2p5_final/b299609631894ab2acdf9467a2d9b636.mp4?download" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
          </div>

          {/* Chatbot Interface (Right) */}
          <div className="w-full lg:w-1/2 flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 min-h-[320px] lg:min-h-[340px] h-[340px]">
            {/* Header */}
            <div className="bg-[#1D0000] p-3 flex items-center justify-between text-white border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-2xl bg-white/10 flex items-center justify-center relative">
                  <Bot className="w-4 h-4 text-white" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-[#1D0000]" />
                </div>
                <div>
                  <h3 className="font-bold text-xs leading-none flex items-center gap-1">
                    Conseiller Virtuel
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                  </h3>
                  <p className="text-[9px] text-white/60 mt-0.5 leading-relaxed">Orientation DM+ Academy</p>
                </div>
              </div>
              <HelpCircle className="w-4 h-4 text-white/40 cursor-help" />
            </div>

            {/* Conversation Messages area */}
            <div className="flex-1 p-3 overflow-y-auto max-h-[180px] space-y-3 bg-gray-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                      msg.sender === "user"
                        ? "bg-[#800020] text-white"
                        : "bg-white border border-gray-200 text-[#1D0000]"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-md ${
                      msg.sender === "user"
                        ? "bg-[#1D0000] text-white rounded-tr-none"
                        : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <span className="block text-[9px] text-right mt-1 opacity-40">
                      {msg.timestamp.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions & Input area */}
            <div className="p-2.5 bg-white border-t border-gray-100">
              {/* Quick Suggestions */}
              <div className="flex flex-wrap gap-1 mb-2">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(sug)}
                    className="text-[10px] text-gray-600 hover:text-white bg-gray-50 hover:bg-[#800020] border border-gray-200 hover:border-[#800020] px-2.5 py-1 rounded-full transition-all duration-150 font-medium"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Chat Input form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex items-center gap-1.5"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question d'orientation..."
                  className="flex-1 bg-gray-50 border border-gray-200 focus:border-[#800020] outline-none text-xs px-3.5 py-2 rounded-full transition-all duration-200 text-gray-800 placeholder-gray-450"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-8 h-8 bg-[#1D0000] hover:bg-[#800020] disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-full flex items-center justify-center transition-all duration-200 shrink-0 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotreMissionSection;