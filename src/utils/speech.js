let lastSpeechTime = 0;

export const speak = (text) => {
  const now = Date.now();
  if (now - lastSpeechTime < 2500) return; // Prevent spamming
  if (window.speechSynthesis.speaking) return;
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  window.speechSynthesis.speak(utterance);
  lastSpeechTime = now;
};
