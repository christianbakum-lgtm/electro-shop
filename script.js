function ajouterPanier(nom, prix) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    panier.push({nom: nom, prix: prix});
    localStorage.setItem("panier", JSON.stringify(panier));
    alert("Produit ajouté au panier !");
}

function afficherPanier() {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let contenu = document.getElementById("contenu-panier");
    let total = 0;

    panier.forEach(produit => {
        contenu.innerHTML += `<p>${produit.nom} - ${produit.prix}$</p>`;
        total += produit.prix;
    });

    contenu.innerHTML += `<h3>Total : ${total}$</h3>`;
}

function viderPanier() {
    localStorage.removeItem("panier");
    location.reload();
}



document.getElementById("formPaiement").addEventListener("submit", function(e){
    e.preventDefault();

    // Générer numéro de commande
    const numeroCommande = "CMD" + Math.floor(Math.random()*9000 + 1000);

    // Récupérer infos
    const nom = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const tel = document.getElementById("tel").value;
    const produit = document.getElementById("produit").value;
    const prix = document.getElementById("prix").value;

    // Générer PDF avec jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Facture ElectroShop", 20, 20);
    doc.setFontSize(12);
    doc.text(`Numéro de commande: ${numeroCommande}`, 20, 40);
    doc.text(`Nom: ${nom}`, 20, 50);
    doc.text(`Email: ${email}`, 20, 60);
    doc.text(`Téléphone: ${tel}`, 20, 70);
    doc.text(`Produit: ${produit}`, 20, 80);
    doc.text(`Prix: ${prix} $`, 20, 90);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 100);

    doc.save(`Facture_${numeroCommande}.pdf`);

    alert("Paiement simulé avec succès ! Facture téléchargée.");
});