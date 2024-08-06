import os 
import pickle 

def clear_screen () : 
    os.system("cls" if os.name == "nt" else "clear")
    
class Person : 
    
    def  __init__ (self) : 
        self.name = str ()
        self.symbol = str ()
        self.nombre_partie_gagner = 0
        
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
            assert position.isdigit ()
        except ValueError :
            print ("tu ne peux pas jouez dans cette case !")
            return False 
        except AssertionError : 
            print ("il faut choisir seulement des chiffres")
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
    
    def exist (self, fichier) : 
        localisation = os.getcwd ()
        path_fichier = os.path.join (localisation,fichier)
        return os.path.exists (path_fichier)
     
    def save_data (self, player) : 
        with open (f"{player.name}.pkl", "wb") as data : 
            pickle.dump (player, data)
            
    def crash_data (self, player) : 
        with open (f"{player.name}.pkl", "rb") as data : 
            player = pickle.load (data)
        return player
    
    def start_game (self) : 
        option = self.menu.display_main_menu () 
        if option == "1" : 
            print ("player 1 identifiez-vous :")
            self.players [0].choose_name ()
            if not (self.exist (f"{self.players[0].name}.pkl")) : 
                symbol_player1 = self.players [0].choose_symbole ()
                self.save_data (self.players [0])
            else : 
                self.players [0] = self.crash_data (self.players [0])
                symbol_player1 = self.players [0].symbol
                clear_screen()
                print (f"Re bonjour {self.players[0].name} ({self.players[0].symbol}), parties gagnés : {self.players[0].nombre_partie_gagner}")
            
            print ("player 2 identifiez-vous :")
            self.players [1].choose_name ()
            if not (self.exist (f"{self.players[1].name}.pkl")) : 
                self.players [1].choose_symbole(symbol_player1)
                self.save_data (self.players[1])
            else : 
                self.players [1] = self.crash_data (self.players [1])
                print (f"Re bonjour {self.players[1].name} ({self.players[1].symbol}), parties gagnés : {self.players[1].nombre_partie_gagner}")
                if self.players[0].symbol == self.players[1].symbol : 
                    print ("vous avez le meme symbol !")
                    self.players [1].choose_symbole(self.players[0].symbol)
                    
            self.board.display_board ()
            rules = "Choisir la position où vous voulez positionné votre symbole "
            print (rules)
            
        else :
            self.quit_game ()
    
    def play_turn (self) : 
        self.current_player_index = abs (self.current_player_index - 1)
        if self.current_player_index == 0 :
            while True :  
                self.board.display_board()
                position = input (f"c'est le tour de {self.players[0].name}, choisit une position :")
                try : 
                    assert self.board.update_board (position, self.players[0].symbol) != False
                except AssertionError : 
                    continue 
                else :  break 
        else : 
            self.board.display_board()
            position = input (f"c'est le tour de {self.players[1].name}, choisit une position :")
            self.board.update_board (position, self.players[1].symbol)       
    
    def _who_win (self, symbole) :
        if self.board.board [symbole] == self.players[0].symbol : 
            self.players[0].nombre_partie_gagner += 1
            self.save_data (self.players[0])
            print (f"{self.players[0].name} a gagné cette partie !")
        else :
            self.players[1].nombre_partie_gagner += 1 
            self.save_data (self.players[1])
            print (f"{self.players[1].name} a gagné cette partie !")
    
    def check_win (self) : 
        for i in range (3) :
            if self.board.board[i] == self.board.board[i+4] == self.board.board[i+8] : 
                self._who_win (i)
                return True 
        for i in range (0,10,4): 
            if self.board.board [i] == self.board.board [i+1] == self.board.board [i+2] :
                self._who_win (i)
                return True
        for i in range (0,3,2) : 
            pas = 5-i
            if self.board.board [i] == self.board.board [i+pas] == self.board.board [i+2*pas] :
                self._who_win (i)
                return True
        return False
        
    def check_draw (self) : 
        return all (not cell.isdigit() for cell in self.board.board)
    
    def play_game (self) :
        while not(self.check_win()) and not(self.check_draw ()):
            clear_screen ()
            self.play_turn ()
        choix = self.menu.display_end_menu ()
        if choix == "1" :
            self.restart_game ()
        else : 
            self.quit_game ()
            
    def restart_game (self) : 
        self.board.reset_board()
        self.current_player_index = 1
        self.play_game ()
    
    def quit_game (self) :
        print ("End Game!")
        os.system("pause")
        



if "__main__" == __name__ : 
    xo = Game ()
    xo.start_game () 
    xo.play_game ()
