Project: Trello app
Descrizione

Ho realizzato un'app simile a Trello per la gestione di progetti. Permette di registrarsi, creare bacheche, organizzare liste e inserire task con scadenze. Il frontend è in Angular, con componenti standalone e servizi modulari. Ho implementato l’autenticazione con JWT e protetto le rotte. Tutta la comunicazione con l’API REST è autenticata e gestita tramite HttpClient. Ho anche curato la UX con TailwindCSS per avere un’interfaccia pulita e responsive. L’architettura è scalabile e pronta per future estensioni come drag&drop o collaborazione tra utenti.

Funzionalità principali
Gestione Liste

Creazione di nuove liste associate a una board specifica.

Visualizzazione delle liste esistenti.

Ordinamento e aggiornamento della posizione delle liste.

Gestione Card

Creazione di card all’interno di una lista specifica.

Modifica titolo, descrizione, stato (in sospeso, in corso, completato) e data di scadenza.

Eliminazione delle card.

Marcare una card come completata.

Aggiornamento dinamico dello stato e dei dettagli della card.

Autenticazione

Accesso tramite token salvato in localStorage.

Protezione delle rotte tramite guard (dashboardGuard), che limita l’accesso al dashboard solo agli utenti autenticati.

Interfaccia Responsive

Layout flessibile con utilizzo di TailwindCSS.

Comandi semplici per gestione liste e card, con feedback immediato.

Architettura
Componenti principali

Lists: Gestisce il rendering e la creazione delle liste.

Cards: Gestisce le card per ogni lista, incluse operazioni CRUD.

Form: Pagina di login o inserimento dati (non dettagliata qui).

Dashboard: Pagina protetta che mostra le liste e card associate.

Servizi

ListsService: Interagisce con l’API backend per operazioni sulle liste.

CardsService: Interagisce con l’API backend per operazioni sulle card.

Routing

Rotte configurate per form e dashboard con guard per protezione del dashboard.

Redirect automatico a form per rotte non definite.

Tecnologie utilizzate
Angular 14+ con componenti standalone

RxJS per gestione asincrona e stream di dati

TailwindCSS per styling

Angular CDK Drag & Drop (opzionale per riordino, se implementato)

Servizi REST per comunicazione con API backend

LocalStorage per gestione token di autenticazione


Cos’è JWT?
JWT (JSON Web Token) è uno standard aperto per la trasmissione sicura di informazioni tra client e server sotto forma di un token JSON firmato. Viene usato principalmente per l’autenticazione stateless.


Come funziona l’autenticazione JWT nella tua app
1. Login e ricezione del token
Quando l’utente effettua il login (ad esempio tramite il componente Form), il client invia username e password al backend.

Il backend verifica le credenziali e, se corrette, genera un token JWT firmato (contenente dati come userId, ruolo, scadenza, ecc.) e lo restituisce al client.

2. Salvataggio del token
Il client (Angular) riceve il token JWT e lo salva nel localStorage (come nel tuo codice: localStorage.setItem('token', token)).

Questo permette al client di mantenere l’utente autenticato anche ricaricando la pagina, fino alla scadenza del token.

3. Uso del token per le richieste protette
Quando il client deve fare una richiesta a un’API protetta (es. recuperare liste o card), include il token JWT nell’header Authorization della richiesta HTTP:

4. Validazione lato backend
Il backend, ad ogni richiesta protetta, controlla la validità del token (firma, scadenza, permessi).

Se il token è valido, autorizza la richiesta e risponde con i dati richiesti.

Se il token è assente o non valido, il backend risponde con errore 401 (Unauthorized).

5. Protezione delle rotte Angular
Nel frontend Angular, usi una guardia dashboardGuard per proteggere la rotta /dashboard.

Questa guardia controlla che ci sia un token valido (o altre condizioni di autenticazione) prima di permettere l’accesso alla pagina.

Se la guardia fallisce, l’utente viene reindirizzato al form di login.

PROBLEMI RISCONTRATI 
Durante lo sviluppo della funzionalità di registrazione, ricevevo un errore 400 “email invalida” dalla API di registrazione. Dopo un’analisi approfondita e un’attenta sessione di debug tra frontend e backend, ho scoperto che i dati venivano inviati in un ordine diverso da quello richiesto dal backend, causando la validazione fallita.
Soluzione: 
 Ho corretto l’ordine dei dati inviati nel payload, risolvendo parte del problema. Tuttavia, l’errore persisteva occasionalmente con alcune email di test. Indagando ulteriormente, ho scoperto che Supabase a volte restituisce errori con email non realistiche o di test, probabilmente per restrizioni o validazioni interne. Dopo aver provato con email più realistiche, l’errore è scomparso.
 
Durante lo sviluppo della funzionalità di creazione delle boards, ci siamo trovati di fronte al problema di associare correttamente ogni board all’utente che la crea. Inizialmente, senza un sistema di autenticazione ben integrato nel frontend, non era chiaro come passare l’ID dell’utente al backend per associarlo alla nuova board.
Abbiamo inizialmente valutato la possibilità di installare e utilizzare il client Supabase anche nel frontend, così da poter recuperare direttamente l’ID utente autenticato e includerlo nelle chiamate di creazione delle board.
 Tuttavia, dato che nel backend abbiamo già integrato Supabase e gestiamo la logica server-side, si è deciso di effettuare il recupero e la verifica dell’ID utente direttamente sul server. In questo modo si mantiene una separazione più chiara delle responsabilità, si aumenta la sicurezza e si evita di esporre logiche di autenticazione nel frontend.
Successivamente, abbiamo considerato il metodo con cui passare l’identificativo dell’utente: inizialmente si pensava di passare direttamente lo userId dal client, ma ci siamo resi conto che è più sicuro e pratico passare il token JWT della sessione.
 Il token viene inviato dal frontend nel header Authorization delle richieste protette. Il backend, invece di aspettarsi lo userId esplicito, riceve il token, lo verifica e lo decodifica usando la libreria jsonwebtoken e una chiave segreta (TOKEN_SECRET_KEY) configurata nel backend. Da questo processo otteniamo in modo sicuro lo userId dell’utente autenticato.
In questo modo abbiamo potuto migliorare la sicurezza dell’applicazione, centralizzare la logica di autenticazione nel backend, e semplificare le chiamate client evitando di dover passare dati sensibili o ridondanti.
Un’altra sfida che si è presentata è stata quella di caricare l'immagine dell’utente, prima si è estesa la tabella SQL, con l’aggiunta di una colonna immagine. Poi è sorta la domanda di come caricare l'immagine (lato backend o frontend), e visto che  non si poteva fare lato front, perché non veniva passato nessun id si è optato per lato back in quanto l’id dell’utente veniva immesso solo sul backend.
Dopo aver lavorato sulla parte di autenticazione register/login procediamo con la creazione delle boards, lists e cards
Per la creazione delle boards abbiamo strutturato un backend API con le richieste di GET, POST per ora (successivamente vediamo se il caso di implementare PUT e DELETE). 
Per creare le bords procediamo con la creazione di un service boards


POSSIBILI MIGLIORIE 

Separazione componenti più piccoli e riatilizzabili, per manutenibilità e facilitare testing
Gestire la logica dei services tramite la libreria NgRx
Implementazione funzionalità drag and drop per spostare le cards

il recruiter mi ha detto che posso anche implementare un interceptor per recuperare il token e fare uiscer un pop up in caso di token scaduto, e nel caso renderizzare al login oppure refreshare il token.


Passaggio da services a logica ngRx

Inizialmente per la logica di utentixazionr, e delle operazione CRUD di boards, lists e cards si è optatato per l'utilizzo dei services, poi si è deciso di passare ad una gestione della logica separata dal resto del componente. 
Inoltre si è deciso di testare l'approccio dato dalla libreria (Actions, Reducers, ecc)
Gestire flussi asincroni e side effects (es. chiamate API) in modo più strutturato

