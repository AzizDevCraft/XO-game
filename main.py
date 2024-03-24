class Person : 
    
    def  __init__ (self) : 
        self.name = str ()
        self.symbol = str ()
        
    def choose_name (self) :
        while True : 
            name = input ("donner votre nom :")
            try : 
                assert name.isalpha ()
            except AssertionError : 
                print ("le nom doit contenir seulement des lettres !")
                continue 
            else : 
                self.name = name
                return self.name
            
    def choose_symbole (self) : 
        while True : 
            symbol = input ("Donnez un symbole :")
            try :
                assert symbol.isalpha () and len(symbol) == 1 
            except AssertionError : 
                print ("le symbole doit contenir une seule lettre !")
                continue
            else : 
                self.symbol = symbol.upper()
                return self.symbol 
            

class Menu :
    
    @staticmethod
    def choix (choice) :
        try :
            assert choice in ["1", "2"]
        except AssertionError : 
            print ("choisissez entre la première et la deuxième option !")
            return Menu.choix(choice = input ("choisissez une option :"))
        else : 
            return choice
     
    def display_main_menu (self) :
        menu = """
Bienvenue à X - O game
1. Start the game 
2. Quit the game 
Choose one option : """
        choice = input (menu)
        return Menu.choix (choice)
        
    def display_end_menu (self) : 
        menu = """
Game Over !
1. Restart Game
2. Quit Game
Choose one option : """
        choice = input (menu)
        return Menu.choix (choice)


class Board : 
    
    count = 0 # nombre de retour à la ligne
    def __init__ (self) : 
        self.board = [str(x) for x in range (1,10)]
        
    def display_board (self) : 
        grille = self.board
        if self.count == 0 : 
            for i in range (3,10,3) : 
                grille.insert (i + self.count, "\n")
                self.count += 1
        grille = " | ".join(grille)
        grille = " | " + grille
        grille = grille.split("\n")
        for i in range (3) : 
            grille [i] = grille [i][2:-2]
        grille = "\n___|___|___\n".join (grille[:-1])
        grille +="\n   |   |"
        return print (grille)
    
    def update_board (self, position, _symbole) : 
        
        try :
            indice = self.board.index (str(position))
        except ValueError :
            print ("tu ne peux pas jouez dans cette case !")
            return False 
        else :  
            self.board [indice] = _symbole
            return self.display_board ()
    
    def reset_board (self) : 
        self.board = [str(x) for x in range (1,10)]
        self.count = 0
        return self.display_board ()
                

class Game : 
    
    def __init__ (self) :
        self.board = Board ()
        self.player1 = Person ()
        self.player2 = Person ()
        
        

if "__main__" == __name__ : 
    planche = Board ()
    planche.display_board()
    planche.update_board (7, "X")
    planche.update_board (7, "O")
    planche.update_board (3, "O")
    planche.reset_board ()
    