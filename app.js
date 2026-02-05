const comediantes = [
  { id: "comediante-1", nombre: "Comediante 1", minutosRutina: 45, descripcion: "Humor de historias reales, remates rápidos y roast ligero.", foto: "assets/comediante1.png" },
  { id: "comediante-2", nombre: "Comediante 2", minutosRutina: 35, descripcion: "Observacional, improvisa con el público y deja el mic vibrando.", foto: "assets/comediante2.png" },
  { id: "comediante-3", nombre: "Comediante 3", minutosRutina: 25, descripcion: "Stand-up cotidiano: trabajo, familia y tragedias que dan risa.", foto: "assets/comediante3.png" },
  { id: "comediante-4", nombre: "Comediante 4", minutosRutina: 15, descripcion: "Energía alta, chistes cortos e interacción sin miedo.", foto: "assets/comediante4.png" },
  { id: "comediante-5", nombre: "Comediante 5", minutosRutina: 10, descripcion: "Nuevo talento: fresco, directo y con hambre de escenario.", foto: "assets/comediante5.png" },
];

// Ordenados mayor -> menor
const ordenados = [...comediantes].sort((a,b) => b.minutosRutina - a.minutosRutina);

const grid = document.getElementById("comedianteGrid");
const dropdown = document.querySelector(".dropdown-menu");
const searchInput = document.getElementById("comedianteSearch");

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function renderCards(lista){
  grid.innerHTML = "";

  if(!lista.length){
    grid.innerHTML = `<div class="hint">Sin resultados. Prueba con otro nombre.</div>`;
    return;
  }

  for(const c of lista){
    const wrap = document.createElement("div");
    wrap.className = "flip";
    wrap.id = c.id;

    wrap.innerHTML = `
      <div class="flip-inner" tabindex="0" aria-label="${escapeHtml(c.nombre)}">
        <div class="face front">
          <img class="avatar" src="${escapeHtml(c.foto)}" alt="Foto de ${escapeHtml(c.nombre)}" loading="lazy" />
          <div class="overlay"></div>
          <div class="front-content">
            <h3 class="name">${escapeHtml(c.nombre)}</h3>
            <div class="meta-row">
              <span class="badge">${c.minutosRutina} min</span>
            
            </div>
          </div>
        </div>

        <div class="face back">
          <p>${escapeHtml(c.descripcion)}</p>
          <div class="small">${c.minutosRutina} minutos de rutina</div>
        </div>
      </div>
    `;

    grid.appendChild(wrap);
  }
}

function renderDropdown(lista){
  dropdown.innerHTML = "";
  for(const c of lista){
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="#${escapeHtml(c.id)}">
        <span>${escapeHtml(c.nombre)}</span>
        <span class="badge">${c.minutosRutina}m</span>
      </a>
    `;
    dropdown.appendChild(li);
  }
}

renderCards(ordenados);
renderDropdown(ordenados);

searchInput.addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  const filtrados = ordenados.filter(c => c.nombre.toLowerCase().includes(q));
  renderCards(filtrados);
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
