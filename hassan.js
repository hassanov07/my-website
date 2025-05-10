function interpretationIMC(imc) {
    if (imc < 18.5) return {text: "Maigreur", class: "maigreur", img: "🦴"};
    if (imc < 25) return {text: "Corpulence normale", class: "normal", img: "💪"};
    if (imc < 30) return {text: "Surpoids", class: "surpoids", img: "🍔"};
    return {text: "Obésité", class: "obesite", img: "⚠️"};
  }
  
  function afficherHistorique() {
    const hist = JSON.parse(localStorage.getItem('bmiHistory') || "[]");
    const ul = document.getElementById('historique');
    ul.innerHTML = "";
    hist.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `IMC: ${item.imc} (${item.interpretation})`;
      ul.appendChild(li);
    });
  }
  
  document.getElementById('bmiForm').onsubmit = function(e) {
    e.preventDefault();
    const taille = parseFloat(document.getElementById('taille').value) / 100;
    const poids = parseFloat(document.getElementById('poids').value);
    const imc = (poids / (taille * taille)).toFixed(2);
    const interp = interpretationIMC(imc);
  
    document.getElementById('resultat').innerHTML = `
      <div class="result ${interp.class}">
        <span style="font-size:2em">${interp.img}</span>
        <div>
          <strong>IMC :</strong> ${imc}<br>
          <strong>Interprétation :</strong> ${interp.text}
        </div>
      </div>
    `;
  
    // Stocker dans localStorage
    const hist = JSON.parse(localStorage.getItem('bmiHistory') || "[]");
    hist.unshift({imc, interpretation: interp.text});
    localStorage.setItem('bmiHistory', JSON.stringify(hist.slice(0, 10)));
    afficherHistorique();
  };
  
  afficherHistorique();