var T={
es:{n:["Anuncios","Deportes","Calendario","Suscripción","Sobre nosotros","Contacto"],t:"Todo el deporte, en una sola jugada",s:"Anuncios y novedades de distintos deportes, redactados aquí para que no tengas que salir de la web.",all:"Todos",back:"← Volver",dep:"Elige un deporte",cal:"Publicaciones por fecha",sub:"Recibe lo último en tu correo",em:"Tu correo",go:"Suscribirme",thx:"¡Gracias! Te hemos apuntado.",abt:"Última Jugada reúne los anuncios y novedades más recientes de distintos deportes. Cada noticia se redacta y se lee directamente aquí.",nm:"Tu nombre",msg:"Tu mensaje",send:"Enviar",sent:"Mensaje enviado. ¡Gracias!",ft:"© 2026 Última Jugada"},
en:{n:["Announcements","Sports","Calendar","Subscribe","About us","Contact"],t:"All sports, in one play",s:"Announcements and updates from different sports, written right here so you never have to leave the site.",all:"All",back:"← Back",dep:"Pick a sport",cal:"Posts by date",sub:"Get the latest by email",em:"Your email",go:"Subscribe",thx:"Thanks! You're on the list.",abt:"Última Jugada gathers the latest announcements and news from different sports. Every story is written and read right here.",nm:"Your name",msg:"Your message",send:"Send",sent:"Message sent. Thank you!",ft:"© 2026 Última Jugada"},
fr:{n:["Annonces","Sports","Calendrier","Abonnement","À propos","Contact"],t:"Tout le sport, en un seul coup",s:"Annonces et actualités de différents sports, rédigées ici pour ne jamais quitter le site.",all:"Tous",back:"← Retour",dep:"Choisissez un sport",cal:"Publications par date",sub:"Recevez les dernières infos par e-mail",em:"Votre e-mail",go:"S'abonner",thx:"Merci ! Vous êtes inscrit.",abt:"Última Jugada rassemble les dernières annonces et actualités de différents sports. Chaque article est rédigé et lu directement ici.",nm:"Votre nom",msg:"Votre message",send:"Envoyer",sent:"Message envoyé. Merci !",ft:"© 2026 Última Jugada"}
};
/* Noticias de ejemplo: sustitúyelas por las tuyas (o deja que n8n las añada a este array). */
var A=[
{id:"futbol-semana",sp:"Fútbol",d:"2026-10-14",t:"Qué mirar esta semana en el fútbol",x:"Cada semana hay partidos que marcan la clasificación. Esta guía de ejemplo muestra cómo se verá una noticia completa dentro de Última Jugada.\n\nAquí irá el texto íntegro: contexto, resultados y claves, sin enlaces externos para leerlo."},
{id:"baloncesto-calendario",sp:"Baloncesto",d:"2026-10-13",t:"Calendario de baloncesto: fechas a apuntar",x:"Las competiciones de baloncesto concentran sus citas importantes en pocas semanas. Esta pieza de ejemplo resume cómo se presentarán las fechas clave.\n\nCada anuncio se redacta completo en la propia web."},
{id:"tenis-novedades",sp:"Tenis",d:"2026-10-12",t:"Tenis: novedades del circuito",x:"Texto de ejemplo para la sección de tenis. Aquí se contarán las novedades del circuito con todo el detalle necesario.\n\nSustituye este contenido por tus noticias reales."},
{id:"ciclismo-ruta",sp:"Ciclismo",d:"2026-10-10",t:"Ciclismo: recorridos y anuncios",x:"Ejemplo de noticia de ciclismo. El recorrido, los equipos y los anuncios oficiales se explican aquí mismo.\n\nTodo el contenido vive dentro de la web."}
];
var L="es";try{L=localStorage.getItem("uj-l")||"es"}catch(e){}
var app=document.getElementById("app"),nav=document.getElementById("nav"),sel=document.getElementById("lang");
var R=["","deportes","calendario","suscripcion","nosotros","contacto"];
function card(a){return '<a class="card" href="#/anuncio/'+a.id+'"><span class="meta"><span class="date">'+a.d+'</span><span class="tag">'+a.sp+'</span></span><div><h3>'+a.t+'</h3><p>'+a.x.split("\n")[0]+'</p></div></a>'}
function chips(cur){var s=["__all"].concat([...new Set(A.map(a=>a.sp))]);return '<div class="chips">'+s.map(k=>'<button data-s="'+k+'" class="'+(k===cur?"on":"")+'">'+(k==="__all"?T[L].all:k)+'</button>').join("")+'</div>'}
function head(t,s){return '<h1>'+t+'</h1>'+(s?'<p class="sub">'+s+'</p>':"")}
function render(){
var h=location.hash.replace("#/",""),t=T[L],o="";
document.documentElement.lang=L;sel.value=L;
nav.innerHTML=t.n.map((n,i)=>'<a href="#/'+R[i]+'" class="'+(h===R[i]||(i===0&&h.startsWith("anuncio"))?"on":"")+'">'+n+'</a>').join("");
document.getElementById("foot").textContent=t.ft;
if(h.startsWith("anuncio/")){var a=A.find(x=>x.id===h.slice(8));
if(a)o='<article><a class="back" href="#/">'+t.back+'</a><span class="tag">'+a.sp+'</span><h1>'+a.t+'</h1><span class="date">'+a.d+'</span>'+a.x.split("\n\n").map(p=>"<p>"+p+"</p>").join("")+'</article>'}
else if(h===""){var z=A[0];o='<section class="hero"><svg class="arc" viewBox="0 0 600 300" aria-hidden="true"><path pathLength="1" d="M10 285C150 10 420 0 590 250"/><circle cx="590" cy="250" r="7"/></svg><h1>'+t.t+'</h1><p class="sub">'+t.s+'</p><a class="lead" href="#/anuncio/'+z.id+'"><span class="tag">'+z.sp+'</span><b>'+z.t+'</b><span class="date">'+z.d+'</span></a></section><div class="grid">'+A.map(card).join("")+'</div>'}
else if(h==="deportes"){o=head(t.n[1],t.dep)+chips("__all")+'<div class="grid" id="g">'+A.map(card).join("")+'</div>'}
else if(h==="calendario"){var ds=[...new Set(A.map(a=>a.d))].sort().reverse();o=head(t.n[2],t.cal)+ds.map(d=>'<div class="day"><h3>'+d+'</h3><div class="grid">'+A.filter(a=>a.d===d).map(card).join("")+'</div></div>').join("")}
else if(h==="suscripcion"){o=head(t.n[3],t.sub)+'<form id="f1"><input type="email" required placeholder="'+t.em+'"><button class="btn">'+t.go+'</button><span class="ok" id="m"></span></form>'}
else if(h==="nosotros"){o=head(t.n[4])+'<p style="max-width:640px">'+t.abt+'</p>'}
else if(h==="contacto"){o=head(t.n[5])+'<form id="f2"><input required placeholder="'+t.nm+'"><input type="email" required placeholder="'+t.em+'"><textarea rows="4" required placeholder="'+t.msg+'"></textarea><button class="btn">'+t.send+'</button><span class="ok" id="m"></span></form>'}
app.innerHTML='<div class="fade">'+o+'</div>';window.scrollTo(0,0);
var g=document.getElementById("g");
app.querySelectorAll(".chips button").forEach(b=>b.onclick=function(){var s=b.dataset.s;app.querySelectorAll(".chips button").forEach(x=>x.classList.toggle("on",x===b));g.innerHTML=A.filter(a=>s==="__all"||a.sp===s).map(card).join("")});
["f1","f2"].forEach(i=>{var f=document.getElementById(i);if(f)f.onsubmit=function(e){e.preventDefault();document.getElementById("m").textContent=i==="f1"?t.thx:t.sent;f.reset()}});
}
sel.onchange=function(){L=sel.value;try{localStorage.setItem("uj-l",L)}catch(e){}render()};
window.onhashchange=render;render();
