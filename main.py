class Person : 
    
    def  __init__ (self) : 
        self.name = str ()
        self.symbol = str ()
        
    def choose_name (self) :
        while True : 
            self.name = input ("donner votre nom :")
            try : 
                assert self.name.isalpha ()
            except AssertionError : 
                print ("le nom doit contenir seulement des lettres")
                continue 
            else : 
                return self.name
            
    def choose_symbole (self) : 
        while True : 
            self.symbol = input ("Donnez un symbole :")
            try :
                assert self.symbol.isalpha () and len(self.symbol) == 1 
            except AssertionError : 
                print ("le symbole doit contenir une seule lettre")
                continue
            else : 
                return self.symbol 
            


if "__main__" == __name__ : 
    joueur = Person ()
    joueur.choose_name ()
    joueur.choose_symbole ()