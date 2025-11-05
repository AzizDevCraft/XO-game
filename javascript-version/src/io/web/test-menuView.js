import MenuView from "./MenuView.js"

const begin = new MenuView ()
begin.renderTopBar ()
begin.displayMainMenu ("Bienvenue à X - O game, {Joueur 1} !")
begin.displayEndGame ("Game Over ! (Eya a gagné)")
begin.reset ()