// HAMBURGER
document.getElementById('ham').addEventListener('click', () => {
  document.getElementById('mobileNav').classList.toggle('open');
});
function closeNav() { document.getElementById('mobileNav').classList.remove('open'); }

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const delay = e.target.closest('.skills-wrapper, .projects-wrapper, .about-values')
        ? [...e.target.parentElement.children].indexOf(e.target) * 100
        : 0;
      setTimeout(() => e.target.classList.add('visible'), delay);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => io.observe(r));

// SKILL BARS
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.lang-fill').forEach(fill => fill.classList.add('visible'));
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('#about .about-aside').forEach(el => barObs.observe(el));



// messages send

emailjs.init("iPdbLcLSPnXHFXb6t");

const form = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");

form.addEventListener("submit", sendMessages);
// recapchat
const captchaResponse =
  grecaptcha.getResponse();

if(!captchaResponse){
    alert("Veuillez confirmer que vous n'êtes pas un robot...");
    return;
}
async function sendMessages(event) {

  event.preventDefault();

  // ===== LIMITATION 5 MESSAGES / JOUR =====

  const today = new Date().toDateString();

  let messageData = JSON.parse(localStorage.getItem("messageLimit")) || {
    date: today,
    count: 0
  };

  // Reset si nouveau jour
  if (messageData.date !== today) {
    messageData = {
      date: today,
      count: 0
    };
  }

  // Limite atteinte
  if (messageData.count >= 5) {
    alert("❌ Limite de 5 messages atteinte aujourd'hui.");
    return;
  }

  // ===== RECUPERATION DES DONNEES =====

  const nom = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const sujet = document.getElementById("sujet").value.trim();
  const message = document.getElementById("messages").value.trim();

  // ===== VALIDATIONS =====

  if (!nom || !email || !message) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  // Validation email
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Adresse email invalide.");
    return;
  }

  // Anti spam simple
  if (message.length < 10) {
    alert("Message trop court.");
    return;
  }

  // ===== BLOCAGE BOUTON =====

  sendBtn.disabled = true;
  sendBtn.innerText = "Envoi en cours...";

  // ===== PARAMETRES EMAIL =====

  const templateParams = {
    from_name: nom,
    from_email: email,
    subject: sujet,
    message: message,
    to_email: "mezatiogeril@gmail.com"
  };

  try {

    await emailjs.send(
      "service_6l8ib8o",
      "template_ogls1i6",
      templateParams
    );

    // Incrémentation compteur
    messageData.count++;

    localStorage.setItem(
      "messageLimit",
      JSON.stringify(messageData)
    );

    alert("✅ Message envoyé avec succès !");

    // Reset formulaire
    form.reset();

  } catch (error) {

    console.log(error);

    alert("❌ Erreur lors de l'envoi.");

  } finally {

    sendBtn.disabled = false;
    sendBtn.innerText = "Envoyer le message ↗";
  }
}
