# Specifiche Progetto
## version:
  - node: v22.16.0
  - npm: 10.9.2
  - tailwindcss: v3.4.17 preferita alla 4

## Command script
Partendo dal presupposto che scrivo in italiano per velocità e chiarezza,
per far partire il progetto ho strutturato tra FE e API ho utilizzato un package `concurrently` nello scripts del package che permette con un comando:
```
npm run dev:all
```
di far partire sia project vue che il db json con un unico comando.

## Pinia
Mi sono affidato allo store ( anche se non serviva ) per settarmi gli state dal db ed averne accesso ovunque ( ma siamo sempre nello stesso componente!!! bah mi piaceva! )

## Typescript newbie.
Utilizzo Typescript anche se non sono ferrato su typescript perchè devo in continuazione andare a leggermi la documentazione. Ma mi piacciono le interface e i type per gestire in maniera ordinata e controllata il corretto sviluppo del progetto.

## Plotly
Per il grafico, se non ho compreso male il modello utilizzato, o usato la libreria Plotly.
Per me una libreria nuova a cui darò sicuramente nei prossimi giorni un approfondimento

## Test
Mancano le parti di test con Vitest o Jest, causa ci devo ragionare su e per il seguente progetto non ne vedevo la necessità
