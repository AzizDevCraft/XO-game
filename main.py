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
    
    def choix (self, choice = input ("choisissez une option :")) :
        try :
            assert choice in ["1", "2"]
        except AssertionError : 
            print ("choisissez entre la première et la deuxième option !")
            return self.choix()
        else : 
            return choice
     
    def display_main_menu (self) :
        menu = """
            Bienvenue à X - O game
                1. Start the game 
                2. Quit the game 
            Choose one option :"""
        choice = input (menu)
        return self.choix (choice)
        
        

if "__main__" == __name__ : 
    menuu = Menu ()
    menuu.display_main_menu ()