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

async function sendMessages(){
  emailjs.init("iPdbLcLSPnXHFXb6t"); // Clé Public

  // rrcuperation des donnes

 const nom = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const sujet = document.getElementById("sujet").value;
  const message = document.getElementById("messages").value;

  //alert(nom+' '+email+" "+sujet+" "+message);
  ////alert("bb")

  //verification et validation des donnees

  if(!nom || !email || !message){
    return;
  }

  //nous allons creer un message

  const templateṔarams = {
    from_name: nom,
    from_email: email,
    subject:    sujet,
    message:    message,
    to_email: "mezatiogeril@gamil.com"
  };

  try{
    await emailjs.send("service_6l8ib8o","template_ogls1i6",templateṔarams);
    alert("✅ Message envoyé avec succès !");

  } catch (error) {
  console.log("Erreur complète:", error);  // ← regarde ici dans F12
  alert("❌ Erreur: " + error.text);
  }

}