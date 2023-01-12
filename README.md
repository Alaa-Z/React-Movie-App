# DT162G Project

## REST-API With node.js, Express och mongoDB

Starta ny terminal i project directory och kör:
### `npm run build`

Starta frontend med ###
### `npm start`

### API beskrivning 

Webbtjänsten är för att hantera information om filmsamling och fälten för varje film är:
* _id: String,
* title: String,
* beenWatched: Boolean,
* description: String,
* filmLength: String,
* filmImage : String

Med Postman eller Thunder Client man kan testa API och CRUD-funktionalitet med nedstående:

       
| Domain | Method    | URI                   | BESKRIVNING  |
| ------------|-----------|--------|--------| 
|        | GET       | api/films             | Hämta ut all data från tabellen.                |
|        | GET       | api/films/id          | Hämta ut en rad från tabellen med ett givet id. |
|        | POST      | api/films             | Lägga till data till tabellen                   |
|        | PUT       | api/films/ID          | Uppdatera data för en rad med ett givet id.     |      
|        | DELETE    | api/films/ID          | Radera en rad i tabellen med ett givet id.      |



## Available Scripts

I projektkatalogen kan du köra:

### `npm start`

Kör appen i utvecklingsläge.\
Öppna [http://localhost:3000](http://localhost:3000) för att visa den i din webbläsare.


### `npm run build`

Bygger appen för produktion till mappen 'build'.\
Bygget är minifierat och filnamnen inkluderar hashes.\
Appen är redo för deployment!



