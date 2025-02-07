const new_todoElement = document.getElementById("new_todo");
const add_new_todoElement = document.querySelector("#add_new_todo");
const list_todoElement = document.getElementById("list_todo");
const list_delete_todoElemnts = document.getElementsByClassName("delete_todo");
const list_complete_todoElemnts =
  document.getElementsByClassName("complete_todo");


let taches = [];

add_new_todoElement.addEventListener("click", function (e) {
  e.preventDefault();
  const new_todo_value = new_todoElement.value;
  ajouterTache(new_todo_value);
});

function ajouterTache(texte) {
  // Créer un nouvel objet tâche
  const tache = {
    id: taches.length + 1,
    message: texte,
    terminee: false,
  };

  // Ajouter au tableau
  taches.push(tache);

  // Mettre à jour l'affichage
  afficherTaches();
}

function afficherTaches() {
  list_todoElement.innerHTML = "";
  // Parcourir le tableau de tâches

  taches.forEach(function (tache) {
    // Créer les éléments HTML pour chaque tâche
    list_todoElement.innerHTML += `
     <li
          class="flex gap-4 justify-between border border-purple-400 p-2 rounded-md"
        id="todo-${tache.id}"
        >
          <div class="flex gap-2">
            <input type="checkbox" id="complete_todo-${
              tache.id
            }" class="complete_todo" />
            <p class="${tache.terminee == true ? "line-through" : ""}">${
      tache.message
    }</p>
          </div>
          <div class="flex gap-2">
            <button
              class="text-xs bg-red-500 text-white px-4 py-1 border border-red-800 rounded-md cursor-pointer delete_todo "
                id="delete_todo-${tache.id}"
            >
              Supprimer
            </button>
          </div>
        </li>
    `;
  });

  // Ajouter la fontion supprimerTache aux boutons de suppression
  Array.from(list_delete_todoElemnts).forEach(function (delete_todo) {
    delete_todo.addEventListener("click", (event) => {
      const getTacheId = String(event.currentTarget.id).slice(-1); //delete_todo-2

      supprimerTache(getTacheId);
    });
  });

  Array.from(list_complete_todoElemnts).forEach((complete_todo) => {
    complete_todo.addEventListener("change", (event) => {
      const getTacheId = String(event.currentTarget.id).slice(-1); //complete_todo-2

      completeTache(getTacheId);
    });
  });
}

function supprimerTache(id) {
  taches = taches.filter(function (tache) {
    return tache.id != id;
  });

  afficherTaches();
}

function completeTache(id) {
  const tacheUpdated = taches.find((tache) => tache.id == id);

  if (tacheUpdated) {
    tacheUpdated.terminee = !tacheUpdated.terminee;
  }

  taches = taches.filter(function (tache) {
    return tache.id != id;
  });

  taches.push(tacheUpdated);

  afficherTaches();
}
