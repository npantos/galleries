# Završni zadatak - Galerija

Zadatak je da se napravi aplikacija Galleries. Ova aplikacija služi za kreiranje galerija slika od strane registrovanih korisnika.

Potrebno je realizovati aplikaciju kao Single Page Application (SPA). Od tehnologija je potrebno koristiti AngularJS na klijentskoj strani i Laravel na serverskoj strani. Integrisati i bootstrap4 okvir.

U daljem tekstu su opisane stranice koje aplikacija treba da sadrži kao i funkcionalnosti na tim stranicama. Obratiti pažnju da osvežavanje bilo koje stranice treba da prikaže istu tu stranicu sa potrebnim podacima.

Nije potrebno uraditi funkcionalnosti koje nisu opisane ovim dokumentom. Fokus rada je na kvalitetu više nego na kvantitetu, tj. svaka urađena funkcionalnost bi trebalo da zadovolji sve stavke iz opisa funkcionalnosti, da kvalitet koda bude zadovoljavajući i da funkcionalnost bude dobro istestirana.

**Layout - neulogovan korisnik**

Kao neulogovan korisnik sajta, vidim layout koji je isti na svim stranicama. Layout sadrzi naziv projekta i linkove &quot;All Galleries&quot; (/), &quot;Login&quot; (/login), &quot;Register&quot; (/register).

**Layout - ulogovan korisnik**

Kao ulogovan korisnik sajta, vidim layout koji je isti na svim stranicama. Layout sadrzi naziv projekta i linkove &quot;All Galleries&quot; (/), &quot;My Galleries&quot; (/my-galleries), &quot;Create New Gallery&quot; (/create), &quot;Logout&quot;.

**Login Page**

Kao neulogovan korisnik imam mogućnost da pristupim Login stranici (/login) i da se ulogujem preko nje. Na stranici vidim dva polja: email i password, i button &quot;Log in&quot;. U slučaju da podaci nisu validni, potrebno je da dobijem informaciju o tome. Ako su podaci validni, ulogovan sam u aplikaciju i preusmeren na početnu stranicu. Ovoj stranici ne mogu da pristupim kao ulogovan korisnik.

**Register Page**

Kao neulogovan korisnik imam mogućnost da pristupim Register stranici (/register) i da kreiram novi account preko nje. Na stranici vidim polja: first name, last name, email, password, confirm password, checkbox za &quot;I accept terms and conditions&quot;, i button &quot;Register&quot;. Potrebno je postaviti validaciju na polja:

- First name: required
- Last name: required
- Email: required, email
- Password: confirmed, at least 8 chars, at least 1 digit
- Accepted terms and conditions

U slučaju da uneti podaci nisu validni, potrebno je da dobijem informaciju o tome. Ako su podaci validni, registrovan sam i automatski ulogovan u aplikaciju, te preusmeren na početnu stranicu. Ovoj stranici ne mogu da pristupim kao ulogovan korisnik.

**Home Page (/)**

Ako kao korisnik pristupim sajtu, vidim listu poslednjh 10 galerija iz baze. Za svaku galeriju prikazujemo naziv, prvu sliku iz liste slika, ime i prezime autora i vreme kreiranja. U slučaju da nije kreirana nijedna galerija, prikazati odgovarajuću poruku. Klik na ime galerije vodi na stranicu galerije &quot;/galleries/:id&quot;, a klik na autora vodi na stranicu &quot;/authors/:id&quot;.

**Home Page - paginacija**

Na kraju home stranice imam button &quot;load more&quot; sa kojim mogu da učitam dodatnih 10 galerija. Ako nema više galerija za učitavanje, ovaj button se ne prikazuje.

**Home Page - filter**

Kao korisnik na vrhu home stranice vidim input polje preko kojeg mogu da filtriram galerije. Kada ukucam termin i kliknem na dugme &quot;Filtriraj&quot; koje se nalazi pored, prikazuju mi samo galerije koje imaju ukucan termin u imenu, ili opisu, ili u imenu autora. Paginacija se i dalje prikazuje i klikom na &quot;load more&quot; dugme se učitava novih 10 galerija koje zadovoljavaju kriterijume filtera.

**Create New Gallery Page**

Kada kao ulogovan korisnik pristupim URL-u &quot;/create&quot;, otvara se ova stranica. Na stranici se prikazuje forma za dodavanje nove galerije gde vidim:

- Naziv, obavezno polje, minimum 2 karaktera, maksimum 255
- Opis, opciono polje. Maksimum 1000 karaktera
- Lista URL-a do slika
  - Obavezno je da se postavi barem jedan URL
  - URL do slike postavljamo u input polje
  - Imam mogućnost da dodajem proizvoljan broj URL-ova preko dugmeta &quot;Add another URL&quot; koji se nalazi ispod poslednjeg input polja
  - Za svaki URL postavljamo posebno input polje
  - Validiramo da li je upisan validan URL i da li se URL završava sa nekom image ekstenzijom (png, jpg ili jpeg)
  - Imam mogućnost da uklonim bilo koji URL ali moram da imam barem jedan (ako ostane samo jedan input, nemoguće ga je obrisati)
  - Pored svakog input polja imam opcije &quot;Move Up&quot; i &quot;Move Down&quot; koje pomeraju dati URL u listi

Na kraju forme imam dugme &quot;Submit&quot;. Ako su podaci neispravni, dobijam validacione poruke. Ako su podaci ispravni, galerija je dodana i preusmeren sam na stranicu &quot;My Galleries&quot;.

Pored dugmeta &quot;Submit&quot; imam i dugme &quot;Cancel&quot; koje me preusmerava na &quot;My Galleries&quot; stranicu.

**My Galleries Page**

Kada kao korisnik pristupim ovoj stranici, vidim sličnu stranica kao i Home s tim što su ovde prikazani samo moje galerije. Takođe vidim i paginaciju i filter.

**View Gallery Page**

Kao korisnik mogu da pristupim stranici određene galerije &quot;/galleries/:id&quot;. Prikazuje mi se naziv galerije u naslovu, ipod toga ime i prezime autor (klik na ovo vodi na &quot;/authors/:id&quot;) i vreme kreiranja. Nakon toga se prikazuje opis galerije, a posle toga su izlistane sve slike u toj galeriji preko [bootstrap carousel](https://getbootstrap.com/docs/4.0/components/carousel/) komponente. Slike prikazujemo u redolsedu kako su sačuvane. Klik na odredjenu sliku otvara istu u novom tabu.

**Author&#39;s Galleries Page**

Kada pristupim stranici &quot;/authors/:id&quot; mogu da vidim galerije tog autora. Kao i u slučaju Home i My Galleries, mogu da vidim listu galerija sa filterom i paginacijom.

**Comments List Feature**

Kada pristupim stranici View Gallery, ispod galerije imam listu komentara. Za svaki komentar je postavljeno ime autora komentara, vreme postavljanja, i sam komentar.

**Add Comments Feature**

Ako sam ulogovan korisnik, na dnu sekcije komentara (ispod liste) imam mogućnost da dodajem novi komentar. Prikazana je samo textarea-a gde upisujem komentar. Komentar može da bude maksimalno 1000 karaktera i neophodno je da se nešto upiše da bih mogao da doda komentar. Nakon uspešnog dodavanja, komentar je automatski dodat u lisu komentara iznad a sadržaj polja za dodavanje komentara je obrisano. Ovu opciju nemam dostupnu ako nisam ulogovan u aplikaciju.

**Remove Comment Feature**

Ako sam ulogovan korisnik, pored svakog mog komentara imam button &quot;Delete&quot; preko kojeg mogu da uklonim komentar. Klik na ovo dugme, aplikacija me najpre pita za potvrdu da li sam siguran da želim da obrišem komentar. Nakon što potvrdim, komentar treba da je automatski izbrisan iz liste komentara.

**Edit Gallery Page**

Na View Gallery stranici, ako gledam galeriju koju sam ja kreirao, imam dugme &quot;Edit&quot;. Ovo dugme me vodi na stranicu &quot;/edit-gallery/:id&quot; kojoj mogu da pristupim samo ja (svaki autor može da pristupi editu samo svojih galerija). Na ovoj stranici se prikazuje ista forma kao za dodavanje galerije i imam iste opcije kao i tamo. Nakon uspešne izmene, preusmeren sam opet na View Gallery stranicu galerije koju sam izmenio.

Pored dugmeta &quot;Submit&quot; imam i dugme &quot;Cancel&quot; koje me preusmerava takođe na View Gallery stranicu.

**Delete Gallery Feature**

Na View Gallery stranici, ako gledam galeriju koju sam kreirao, imam dugme &quot;Delete&quot;. Ovo dugme me pita da li želim da obrišem galeriju. Ako potvrdim, nakon uspešnog brisanja, preusmeren sam na My Galleries stranicu. Samo ja mogu da obrišem galerije koje sam ja kreirao.