
# Minikino veebileht



| Avaleht  									| 	Kategooriad 							| Mäng 									   |
| ----------------------------------------- | ----------------------------------------- | ------------- 						   |
| <img src="./media/img1.PNG" width="300">  | <img src="./media/img2.PNG" width="400">  | <img src="./media/img3.PNG" width="500"> |

## Eesmärk

Minikino eesmärk on anda õpetajatele valmis ning lihtsasti kohandatav õppekeskkond, mille alusel saab õpetada lastele meediaelementide olemust ning, kuidas nende mõjutamisel muutub edastatav sõnum. Õppekeskkonna fookuses on kasutajasõbralik disain, mis on kasutatav ka õpetajatele ja huvijuhtidele, kellel on vähesem digipädevus. Mänge saab kasutada nii erinevate õppeainete teemade raames kui ka vahetunni tegevusena, mis on lastele huvitav ja õpetlik.

Minikino veebileht on loodud Tallinna Ülikooli informaatika üliõpilaste poolt esimesel kursusel tarkvaraarenduse praktika raames koostöös meediaharidus OÜ-ga.

## Kasutatud Tehnoloogiad
VsCode - Ver. 1.124.2

IntelliJ IDEA ULTIMATE - Ver. 25.0.2+1-b329.117

pgAdmin - Ver. 9.15

postgreSQL - Ver. 18.3

ZONE - Ver.????

TypeScript - Ver. 5.9.3

React - Ver. 19.2.4

Vite - ver. ????

Node - ver. ????

express - ver.????

Java - Ver. Oracle OpenJDK 21.0.4

## Autorid
Veebilehe koostajad on Martin Saareväli, Roland Piperal, Õnne Elisabeth Maripu, Anette Aruorg ja Carolina Treu. Projekti loomine andis meile kogemusi ka edaspidi suuremate projektidega tegelemiseks. 

## Paigaldamine
### Frontend:

Tuleb rakenduse failid alla laadida, ning frontendi on võimalik jooksutada VsCodeis. Vaja on alla laadia Node, React ja Vite. 

Nende allalaadimiseks on vaja terminalis jooksutada ["npm install"](https://docs.npmjs.com/cli/v11/commands/npm-install) mis automaatselt laeb alla kõik vajalikud "package"-id. Peale kõikide vajalike "package"-ite allalaadimist tuleb terminalis jooksutada "npm run dev" mis paneb rakenduse tööle.

Kui on eesmärk frontend kuskile serverisse vms saada, siis tuleks kasutada ka "npm run build", tekitab Frontend kausta "dist" kausta, mis on valmis edasi saatmiseks.

(Veendu, et "directory"/kataloog kus olete on kindlasti "frontend"!!)

### Backend:


Programmi kloonimisel tuleks teha järgnevad tegevused backendis (soovitatavalt IntelliJ-s, eeldan, et JDK ja muud sätted on eelnevalt paigas):

1. rename-ida application.properties.example -> application.properties

2. application.properties sees tuleks asendada []-s olevad väljad enda valiidsete andmebaasi andmetega (DB nimi, kasutaja, parool).

3. Seejärel tuleks ühendada andmebaas PostgreSQL-ga, peale mida jooksutada "database"-kaustas olevaid scripte, järjekorras 1, 2, 3. 



## Testid

Testide jaoks ei kasutanud me eraldi programme, vaid kõik testid mida tegime olid manuaal testid, vaadates ise kõik leheküljed üle ning otsides vigu.
Enamus vigadest või mingi komponendi katki minekust saime teada just siis, kui üritasime uusi mänge lisada või olemasolevaid mänge muuta. 
		
## Litsents		

kasutatav litsents on [creative commons](https://creativecommons.org/cc-licenses/).
