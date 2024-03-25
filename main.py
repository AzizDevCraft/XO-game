import os 

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
            
    def choose_symbole (self, reference = "") : 
        while True : 
            symbol = input ("Donnez un symbole :").upper()
            try :
                assert symbol.isalpha () and len(symbol) == 1 and symbol != reference
            except AssertionError : 
                print ("le symbole doit contenir une seule lettre ! (n'est pas choisi avant)")
                continue
            else : 
                self.symbol = symbol
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
        self.players = [Person (), Person ()]
        self.menu = Menu ()
        self.current_player_index = 1
        
    def start_game (self) : 
        option = self.menu.display_main_menu () 
        if option == "1" : 
            name_player1 = self.players [0].choose_name ()
            symbol_player1 = self.players [0].choose_symbole ()
            name_player2 = self.players [1].choose_name ()
            symbol_player2 = self.players [1].choose_symbole(symbol_player1)
            self.board.display_board ()
            rules = "Choisir la position où vous voulez positionné votre symbole "
            print (rules)
            return {name_player1 : symbol_player1, name_player2: symbol_player2}
              
        print ("End Game!")
        os.system("pause")
    
    def play_turn (self) : 
        self.current_player_index = abs (self.current_player_index - 1)
        if self.current_player_index == 0 : 
            position = input (f"c'est le tour de {self.players[0].name}, choisit une position :")
            self.board.update_board (position, self.players[0].symbol)
        else : 
            position = input (f"c'est le tour de {self.players[1].name}, choisit une position :")
            self.board.update_board (position, self.players[1].symbol)       
            
    def check_win (self) : 
        pass
        
    def check_draw (self) : 
        pass
    
    def restart_game (self) : 
        pass 
    
    def quit_game (self) :
        pass 
        



if "__main__" == __name__ : 
    xo = Game ()
    xo.start_game () 
    xo.play_turn ()