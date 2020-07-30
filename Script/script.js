
// ####################################### STICKY NAVIGATION ####################################### 

// Wenn gescrollt wird, soll function aufgerufen werden
window.onscroll = function() {stickyNav()};

// navbar in Variable deklarieren
var navbar = document.querySelector('.js_navbar');

// offset position der navbar bekommen
var sticky = navbar.offsetTop;

// function aufrufen, und die classe sticky (in CSS angesprochen) hinzufügen, und wenn man nicht gescrollt hat, dann soll sticky wieder entfernt werden
function stickyNav() {

  // mittels if abfragen, ob pageYOffset größer gleich sticky ist (damit weiß browser, ob gescrollt worden ist)
  if (window.pageYOffset >= sticky) {

    // weil gescrollt worden ist, sticky hinzufügen
    navbar.classList.add("sticky");

  } else {

    // Gegeteil: wenn nicht gescrollt wurde, sticky wieder removen
    navbar.classList.remove("sticky");
  }
}



// #######################################  BACK TO TOP BUTTON ####################################### 

// top_btn Eventlistener click hinzufügen
document.querySelector('.top_btn').addEventListener('click', function() {

  // bei click auf den Button, soll auf 0 nach oben gescrollt werden
  document.documentElement.scrollTop = 0;
 
});



// #######################################  (TOGGLE) CLICK NAVIGATION ####################################### 

// burger Eventlistener click hinzufügen
document.querySelector('.burger').addEventListener('click', function(_e){

  // verhindern, dass link aufgerufen wird
  _e.preventDefault();
  
  // mainnav in var deklarieren
  var mainnav = document.querySelector('.menu_points');

  // open classe toggeln
  mainnav.classList.toggle('menu_points--open');

  // burger icon in var deklarieren
  var burger_icon = document.querySelector('.burger_icon');

  // close icon in var deklarieren
  var close_icon = document.querySelector('.close_icon');

  // mittels if abfragen, ob mainnav die klasse open hat
  if(mainnav.classList.contains('menu_points--open')) {

    // passend dazu burger ausblenden
    burger_icon.style.display = "none";

    // passend dazu close einblende
    close_icon.style.display = "block";

  } else {

    // Gegenteil: passend dazu burger einblenden
    burger_icon.style.display = "block";
    
    // Gegenteil: passend dazu close ausblenden
    close_icon.style.display = "none";

  }

});


// #######################################  SLIDER ####################################### 

window.addEventListener('load', function(){

  // Anzahl der Slides in var deklarieren
  var n = document.querySelectorAll('.j-slide_list > li').length;
  
  // slide list in var deklarieren
  var slide_list = document.querySelector('.j-slide_list');

  // auf 0 setzen, damit keine Fehlermeldung in der console kommt, weil lis (die SVGs davon) unterschiedliche Größen haben
  // ************* Fehlermeldung imm Browser weil ich allgemein nur ein JavaScript File eingebunden habe, wenn man auf Seite mit dem Slider kommt, ist die Fehlermeldung auch weg *************
  slide_list.style.width = 0;

  // Breite von n auf die Anzahl der slide lists anpassen
  slide_list.style.width = (n * 100) + "%";

  // function für nächste Slide (nach rechts)
  var next_slide = function(){

    // ul class "slide_list--transition-on" hinzufügen
    slide_list.classList.add('slide_list--transition-on');

    // function die aufgerufen werden soll, wenn animation vorbei ist
    var after_transition = function(){
    
      // ul class "slide_list--transition-on" entfernen
      slide_list.classList.remove('slide_list--transition-on');

      // ul wieder auf 0 zurücksetzen
      slide_list.style.left = "0";

      // aktuell erste slide von ul in var deklarieren 
      var cur_first_slide = slide_list.removeChild(slide_list.children[0]);

      // aktuell erste slide im ul hinten anfügen
      slide_list.appendChild(cur_first_slide);

      // transitionend eventhandler wieder entfernen
      slide_list.removeEventListener('transitionend', after_transition);
    };

    // eventlistener hinzufügen (soll aufgerufen werden wenn animation vorbei ist) 
    slide_list.addEventListener('transitionend', after_transition);

    // ul um eine slide nach links schieben 
    slide_list.style.left = "-100%";
    
  };

  // bei klick auf "j-next" soll function aufgerufen werden
  document.querySelector('.j-next').addEventListener('click', next_slide);


  // function für vorige Slide (nach links)
  var prev_slide = function(){

    // das aktuell letzte slide aus dem ul in var deklarieren
    var cur_last_slide = slide_list.removeChild( slide_list.children[slide_list.children.length - 1] );

    // das aktuell letzte slide vor dem ersten einhängen
    slide_list.prepend(cur_last_slide);

    // ul class "slide_list--transition-on" entfernen (sicherheitshalber)
    slide_list.classList.remove('slide_list--transition-on');

    // ul um eine slide nach links schieben
    slide_list.style.left = "-100%";

    // abwarten bis ein frame gerendert ist
    setTimeout(function(){
      
      //  class "slide_list--transition-on" hinzufügen
      slide_list.classList.add('slide_list--transition-on');

      // ul wieder auf 0 zurücksetzen
      slide_list.style.left = "0";

    }, 100);

  };

  // bei klick auf button pev soll die passende function aufgerufen werden
  document.querySelector('.j-prev').addEventListener('click', prev_slide);

  // setInterval anlegen, um richtige function aufrufen zu können
  setInterval ( function () { 

    // mittels if abfragen, ob autoplay left checked ist
    if (document.querySelector('#autoplay_left').checked) {

      // passende function aurufen
      prev_slide();

    // mittels else if abfragen, ob autoplay right checked ist
    } else if (document.querySelector('#autoplay_right').checked) {

      // passende function aufrufen
      next_slide();

    }

  // 3sek für Interval anlegen
  }, 3000) 

});



// #######################################  FORM VALIDATION ####################################### 

window.addEventListener('load', function(){


  // Referenz in Variable speichern (Class j-form in HTML vergeben)
  var form = document.querySelector('.j-form');

  // form Eventlistener submit hinzufügen
  // ************* Fehlermeldung imm Browser weil ich allgemein nur ein JavaScript File eingebunden habe, wenn man auf Seite mit dem Newsletter kommt, ist die Fehlermeldung auch weg *************
  form.addEventListener('submit', function(event){

    // davin ausgehend, dass isValid true ist
    var isValid = true;

    // input in var deklarieren
    var input = document.querySelector('.j-input_first_name');

    // input value in var deklarieren
    var text = input.value;

    

    // ###################### FIRST NAMES ######################
    
    // Alle Leerzeichen in FIRST NAME entfernen:
    if(text.trim() === "") {

      // Wenn Eingebefeld leer ist, soll das Abschicken verhindert werden
      event.preventDefault();

      // Fehler der ausgegeben wird, wenn Feld leer ist
      document.querySelector('.j-error_first_name').textContent = "First name cannot be left blank!";
      document.querySelector('.j-input_first_name').classList.add('j-error_first_name_input');

      // damit abschicken verhindert wird
      isValid = false;

    }

    else {

      // wenn im Nachhinein dann doch etwas eingegeben wird, soll Error Message "First name cannot be left blank!" verschwinden
      document.querySelector('.j-input_first_name').classList.remove('j-error_first_name_input');
      document.querySelector('.j-error_first_name').textContent = "";

    }

    // ###################### EMAIL ADDRESS ######################

    // email in var deklarieren
    var email_input = document.querySelector('#email');

    // email input value in var deklarieren
    var email = email_input.value;


    var first_at_index = email.indexOf('@');
   
    // Abfrage ob ein @ in Eingabefeld vorhanden ist
    if (email.indexOf('@') === -1) {

      // verhindern dass es ausgeführt wird
      event.preventDefault();

      // Fehler der ausgegeben wird, wenn kein @ vorhanden ist
      document.querySelector('.j-error_email').textContent = "Please insert a valid E-Mail Address!";
      document.querySelector('.j-input_email').classList.add('j-error_email_input');

      // damit abschicken verhindert wird
      isValid = false;

    } 

    // Abfrage ob eingegebenes @ an erster Stelle, oder an letzter Stelle ist
    else if (email.charAt(0) === '@' || email.charAt(email.length - 1) === '@' ) {

      // verhindern dass es ausgeführt wird
      event.preventDefault();

      // Fehler der ausgegeben wird, wenn @ an erste Stelle, oder an letzter Stelle steht
      document.querySelector('.j-error_email').textContent = "Please insert a valid E-Mail Address!";
      document.querySelector('.j-input_email').classList.add('j-error_email_input');

      // damit abschicken verhindert wird
      isValid = false;

    } 

    // Abfrage ob mehr als ein @ eingegeben wurde
    else if (email.indexOf('@', first_at_index + 1) !== -1) {

      // verhindern dass es ausgeführt wird
      event.preventDefault();

      // Fehler der ausgegeben wird, wenn mehr als ein @ eingegeben worden ist
      document.querySelector('.j-error_email').textContent = "Please insert a valid E-Mail Address!";
      document.querySelector('.j-input_email').classList.add('j-error_email_input');

      // damit abschicken verhindert wird
      isValid = false; 

    }

    else {
      // wenn im Nachhinein dann doch etwas eingegeben wird, soll Error Messages verschwinden
      document.querySelector('.j-input_email').classList.remove('j-error_email_input');
      document.querySelector('.j-error_email').textContent = "";
    }


    // ###################### LAST NAME ######################

    // input von last name in var deklarieren 
    var input = document.querySelector('.j-input_last_name');
    
    // value von input in var deklarieren
    var text = input.value;
    
    // Alle Leerzeichen in LAST NAME entfernen:
    if(text.trim() === "") {

      // Wenn Eingebefeld leer ist, soll das Abschicken verhindert werden
      event.preventDefault();

      // Fehler der ausgegeben wird, wenn Feld leer ist
      document.querySelector('.j-error_last_name').textContent = "Last name cannot be left blank!";
      document.querySelector('.j-input_last_name').classList.add('j-error_last_name_input');

      // damit abschicken verhindert wird
      isValid = false;

    }

    else {
      // wenn im Nachhinein dann doch etwas eingegeben wird, soll Error Message "Last name cannot be left blank!" verschwinden
      document.querySelector('.j-input_last_name').classList.remove('j-error_last_name_input');
      document.querySelector('.j-error_last_name').textContent = "";
    }


    // ###################### (2 Radiobuttons) WANT TO RECEIVE OUR NEWSLETTER? ######################

    // newsletter in var deklarieren
    var newsletterRadios = document.querySelectorAll('input[name="newsletter"]');

    // Ausgehend, dass kein Radiobutton angehakt wurde
    var checked = false; 

    // Mittels for Schleife alle Radiobuttons durchgehen
    for(var i = 0; i < newsletterRadios.length; i++) { 

      if(newsletterRadios[i].checked === true) { 

        // wenn der Wert true ist, ist ein Radiobuttin angehakt
        checked = true; 

        // Schleife kann abgebrochen werden, weil immer nur ein Radiobutton angehakt werden
        break; 

      }

    }

    // wenn kein Radiobutton angehakt wurde
    if (!checked) { 

      // Fehler der ausgegeben wird, wenn Radiobutton angehakt wurde
      document.querySelector('.j-error_newsletter').textContent = "Please let us know if you want to receive our newsletter!";

      // damit abschicken verhindert wird
      isValid = false;

    } else {

      // wenn im Nachhinein dann doch ein Radibutton angehakt wurde, soll Error Message "Please let us know if you want to receive our newsletter!" verschwinden
      document.querySelector('.j-error_newsletter').textContent = "";

    }


    // ###################### (2 Checkboxen) SERVICE PRIVAY POLICY AGREED? ######################

    // checkbox in var deklarieren
    var serviceAndPrivacyPolicy = document.querySelector('#checkbox_service_privacy_policy');

    // mittels if ansprechen, wenn keine checkbox checked ist
    if(!serviceAndPrivacyPolicy.checked) {

    // Fehler der ausgegeben wird, wenn Service Privacy Policy nicht auf "I agree" gesetzt wurde
      document.querySelector('.j-error_service_privacy_policy').textContent = "Service and Privacy Policy cannot be left blank!";

      // damit abschicken verhindert wird
      event.preventDefault();

      // damit abschicken verhindert wird
      isValid = false;

    } else {
    // wenn im Nachhinein dann doch Service Privacy Policy auf "I agree" gesetzt wurde, soll Error Message "Service and Privacy Policy cannot be left blank!" verschwinden
    document.querySelector('.j-error_service_privacy_policy').textContent = "";
    }

  });    

});

// #######################################  GALLERY ####################################### 

  // alle li img in var deklarieren
  var lis = document.querySelectorAll('.tn_list > li img');

  // overlay in var deklarieren
  var overlay = document.querySelector('.overlay__cnt');

  // stage in var deklarieren
  var stage = document.querySelector('.overlay__stage');

  // close button in var deklarieren
  var close = document.querySelector('.overlay__close');

  // overlay__close_on_blac in var deklarieren (damit es dann auch wieder geschlossen werden kann) 
  var close_on_black = document.querySelector('.overlay__close_on_black');

  // close eventhandler click hinzufügen
  // ************* Fehlermeldung imm Browser weil ich allgemein nur ein JavaScript File eingebunden habe, wenn man auf Seite mit Gallery kommt, ist die Fehlermeldung auch weg *************
  close.addEventListener('click', function(){

    // mittels sytel display none ausblenden
    overlay.style.display = "none";

  });

  // close_on_black eventhandler click hinzufügen
  close_on_black.addEventListener('click', function(){
    
    // wrapper footer wieder einblenden (blenden wir in for Schleife unten aus) - damit im Hintergrund weniger los ist
    document.querySelector('.wrapper_footer').style.visibility = 'visible';
    
    // overlay mittels display none ausblenden
    overlay.style.display = "none";

  });


  // mittels for Schleife durch alle lis durchgehen
  for(var i = 0; i < lis.length; i++) {

    // jedem li einen Eventlistener click hinzufügen 
    lis[i].addEventListener('click', function(_e){

      // wrapper footer ausblenden, damit im Hintergrund weniger los ist (wenn overlay offen ist)
      document.querySelector('.wrapper_footer').style.visibility = 'hidden';

      // verhindern, dass link aufgerufen wird
      _e.preventDefault();

      // overrlay mit display flex wieder einblenden
      overlay.style.display = "flex";

      // neues img tag für großes bild erzeugen
      var img = document.createElement('img');

      // src für großes Bild aus a tag auslesen src
      img.setAttribute('src', _e.target.parentNode.getAttribute('href'));

      // stage leeren (falls schon ein image darin sein sollte) 
      stage.innerHTML = "";

      // neues image in stage einhängen
      stage.appendChild(img);

      
      // *********** THUMBNAIL LISTE FÜR OVERLAY ERZEUGEN ***********

      // vom angeklicktes thumbnail das zugehörige ul ermitteln
      var ul = _e.target.parentNode.parentNode.parentNode;

      // nur angeklicktes die class hinzufügen
      _e.target.parentNode.parentNode.classList.add('selected');

      // neues ul für overlay erzeugen 
      var tns = document.createElement('ul');

      // ul tn_list klasse geben (um es später mit css zu stylen)
      tns.classList.add('tn_list');

      // aktuelles HTML in neues ul setzen (um eine kopie von ul mit angeklicktem li mit klasse selected zu haben)
      tns.innerHTML = ul.innerHTML;
      
      // angeklicktes thumbnail wieder klasse removen
      _e.target.parentNode.parentNode.classList.remove('selected');

      // container im overlay thumbnailliste ausleeren (mit keinem Inhalt "" überschreiben)
      document.querySelector('.overlay__tns').innerHTML = "";

      // anschließend in neue thumbnailliste hinzufügen 
      document.querySelector('.overlay__tns').appendChild(tns);

      // alle thumbnails in var deklarieren
      var overlay_tns = document.querySelectorAll('.overlay__cnt .tn_list > li img');

      // mittels for Schleife alle durchgehen
      for(var i = 0; i < overlay_tns.length; i++) {

        // allen evenntlistener click hinzufügen
        overlay_tns[i].addEventListener('click', function(_e){

          // verhindern, dass link aufgerufen wird
          _e.preventDefault();

          // wie oben: bei angeklicktem neues img mit großen bild erzeugen
          var img = document.createElement('img');
          img.setAttribute('src', _e.target.parentNode.getAttribute('href'));
          stage.innerHTML = "";
          stage.appendChild(img);

          // aktuell ausgewählten li die klasse selected wieder entfernen 
          document.querySelector('.overlay__cnt .tn_list > li.selected').classList.remove('selected');

          // nur dem angeklickten img die klasse selected hinzufügen
          _e.target.parentNode.parentNode.classList.add('selected');

        });

      }

    });

  }

  // overlay__next Eveentlistener click hinzufügen
  document.querySelector('.overlay__next').addEventListener('click', function(){

    // aktuelles li in var deklarieren 
    var cur = document.querySelector('.overlay__cnt .tn_list > li.selected');

    // alle lis in var deklarieren
    var overlay_lis = cur.parentNode.children;

    // mittels Schleife alle durchgehen
    for (var i = 0; i < overlay_lis.length; i++) {

      // mittels if abfragen, ob das selektierte, und nicht letztes true ist 
      if (i <  overlay_lis.length - 1 && overlay_lis[i].classList.contains('selected') ) {

        // neues Event triggern, um so zu tun, also würde nächstes angeklickt worden sein (li danach soll angesprochen werden)
        overlay_lis[i+1].querySelector('img').dispatchEvent(new Event('click'));
        break;

      }

    }
   
  });

  // overlay__prev Eveentlistener click hinzufügen
  document.querySelector('.overlay__prev').addEventListener('click', function(){

    // aktuelles li in var deklarieren 
    var cur = document.querySelector('.overlay__cnt .tn_list > li.selected');

    // alle lis in var deklarieren
    var overlay_lis = cur.parentNode.children;

    // mittels Schleife alle durchgehen
    for (var i = 0; i < overlay_lis.length; i++) {

      // mittels if abfragen, ob das selektierte, und nicht letztes true ist 
      if (i > 0 && overlay_lis[i].classList.contains('selected') ) {

        // neues Event triggern, um so zu tun, also würde voriges angeklickt worden sein (weil li davor angesprochen werden soll)
        overlay_lis[i-1].querySelector('img').dispatchEvent(new Event('click'));
        break;

      }
    }
  
  });
