//  Récuperons les éléments du Dom
const form = document.querySelector("form");
const ChampPrenom = document.getElementById("pre");
const ChampNom = document.getElementById("nom");
const ChampMail = document.getElementById("mail");
const ChampTel = document.getElementById("tel");
const bsubmit = document.getElementById("submit");
const bUpdate = document.getElementById("update");
let tbody = document.querySelector("tbody");
// 
let users = [];

// function pour afficher la listes des utilisateurs
const craeteUser = (Prenom, Nom, Email, Telephone) => {
  tbody.innerHTML = " ";
  users = JSON.parse(localStorage.getItem("users")) || [];
  
  // créer les éléments du tableau
  for (let i = 0; i < users.length; i++) {
    // recuperer l'element du tableau a son index
    const user = users[i];
    let tr = document.createElement("tr");
    tr.classList = "ligne-tableau";
    tr.innerHTML = `
    <td class="tdPrenom">${user.Prenom}</td>
    <td class="tdNom">${user.Nom}</td>
    <td class="tdEmail">${user.Email}</td>
    <td class="tdTel">${user.Telephone}</td>
    <div class="boutActions d-flex justify-content-evenly">
    <button onclick="edite(${i})" type="button" class="btn btn-warning" id="edit">Modifier</button>
    <button onclick="supprime(${i})" type="button" class="btn btn-danger ms-5" id="supp">Supprimer</button>
    </div>
    `
    // ajouter la ligne dans le DOM
    tbody.appendChild(tr); 
  }
  
}
// const index = new Date().getTime.toString();
const addUsers = () => {
  users = JSON.parse(localStorage.getItem("users")) || [];
  const useObjet = {
    Prenom: ChampPrenom.value,
    Nom: ChampNom.value,
    Email: ChampMail.value,
    Telephone: ChampTel.value,
  }

  users.push(useObjet);

  localStorage.setItem("users", JSON.stringify(users));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addUsers();
  // craeteUser(useObjet.Prenom, useObjet.Nom, useObjet.Email, useObjet.Telephone);
  craeteUser();
  resetForm();
})

// Vidons les champs de saisie aprés ajout d'un utilisateur
function resetForm() {
  ChampPrenom.value = "";
  ChampNom.value = "";
  ChampMail.value = "";
  ChampTel.value = "";
}

// gestion de l'action modifier
function edite(index) {
    // recuperer l'index de l'element a modifier dans le tableau 
    const user = users[index];
  
    ChampPrenom.value = user.Prenom;
    ChampNom.value = user.Nom;
    ChampMail.value = user.Email;
    ChampTel.value = user.Telephone;

    // masquer le bouton ajouter et afficher le bouton modifier
    bsubmit.style.display = "none";
    bUpdate.style.display = "block";
  
    // Ecouter la modification avec le bouton modifier
    bUpdate.addEventListener('click', function () {

      // Egaliser contenu des cellules du tableau aux valeurs des champs du formulaire
      users.splice(index, 1)
      localStorage.setItem("users", JSON.stringify(users));
;      craeteUser();
      // masquer le bouton modifier et afficher le bouton ajouter
      bUpdate.style.display = "none";  
      bsubmit.style.display = "block";
      
    });
}

// gestion de l'action supprimer                                                      
function supprime(index) {
  
  users.splice(index, 1);

  localStorage.setItem("users", JSON.stringify(users));
  craeteUser();
}

// Afficher les utilisateurs au chargement de la page
craeteUser();
