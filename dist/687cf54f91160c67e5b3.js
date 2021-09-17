function _classCallCheck(n,o){if(!(n instanceof o))throw new TypeError("Cannot call a class as a function")}function _defineProperties(n,o){for(var a=0;a<o.length;a++){var e=o[a];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,e.key,e)}}function _createClass(n,o,a){return o&&_defineProperties(n.prototype,o),a&&_defineProperties(n,a),n}function _defineProperty(n,o,a){return o in n?Object.defineProperty(n,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[o]=a,n}import"./styles.scss";import loadCalendar from"./calendar";import handleResize from"./handleResize";$((function(){function n(){0===$(window).scrollTop()||!$("nav").is("#extend-searchbar")&&$("nav").hasClass("offset-top")||($("nav").removeAttr("id","extend-searchbar"),$("nav").addClass("offset-top")),0===$(window).scrollTop()&&($("nav").removeClass("offset-top"),o())}function o(){if(!($(window).width()<725)&&($("nav").attr("id","extend-searchbar"),$("nav").hasClass("offset-top")&&!$(".location-container").hasClass("search-bar-content-selected"))){if(window.searchBarSelected.placesToStay)return void $(".location-container").trigger("click");$(".experience-location-container").trigger("click")}}n(),$(document).on("scroll",n),$(".search-trip-bar").on("click",(function(){o()})),window.searchBarSelected={placesToStayOpen:!0,experiencesOpen:!1,get placesToStay(){return this.placesToStayOpen},set placesToStay(n){this.placesToStayOpen=n,this.experiencesOpen=!n,window.calendarLoaded&&loadCalendar.passDatesUpToStringDisplay(),$(".search-bar-content-selected").removeClass("search-bar-content-selected")},get experiences(){return this.experiencesOpen},set experiences(n){this.experiencesOpen=n,this.placesToStayOpen=!n,window.calendarLoaded&&loadCalendar.passDatesUpToStringDisplay()}},$(".nav-search-options").on("click",(function(){"online-experiences"!==this.id&&($(".selected-nav-search-option").removeClass("selected-nav-search-option"),$(this).addClass("selected-nav-search-option"),$(".selected-search-bar-content").removeClass("selected-search-bar-content"),"places-to-stay"===this.id&&($("#search-trip-bar-stays").addClass("selected-search-bar-content"),window.searchBarSelected.placesToStay=!0),"experiences"===this.id&&($("#search-trip-bar-experience").addClass("selected-search-bar-content"),window.searchBarSelected.experiences=!0))})),$(".search-bar-content").on("click",(function(){function n(o){!$(o.target).closest($(".search-trip-bar")).length>0&&($(".display-search-bar-option").removeClass("display-search-bar-option"),$(".search-trip-bar").removeClass("content-selected"),$(".search-bar-content-selected").removeClass("search-bar-content-selected"),$("body").off("click",n),$(document).off("scroll",n))}var o,a;$(".search-trip-bar").addClass("content-selected"),$(".search-bar-content-selected").removeClass("search-bar-content-selected"),$(this).addClass("search-bar-content-selected"),$(".display-search-bar-option").removeClass("display-search-bar-option"),$(this).hasClass("location-container")&&$(".location-active-options").addClass("display-search-bar-option"),($(this).hasClass("check-in-container")||$(this).hasClass("check-out-container")||$(this).hasClass("search-bar-flexible-dates-container"))&&($(".date-active-options").addClass("display-search-bar-option"),window.calendarLoaded||(window.calendarLoaded=!0,loadCalendar())),$(this).hasClass("guests-container")&&($(".guests-active-options").addClass("display-search-bar-option"),window.guestOptionsLoaded||(window.guestOptionsLoaded=!0,o=function(){function n(o){_classCallCheck(this,n),_defineProperty(this,"numberOf",0),this.type=o}return _createClass(n,[{key:"amount",get:function(){return this.numberOf},set:function(n){this.numberOf=n,$(".number-of-".concat(this.type)).empty().append(n),0===this.numberOf&&$(".reduce-number-of-".concat(this.type)).addClass("inactive-at-zero"),this.numberOf>0&&$(".reduce-number-of-".concat(this.type)).removeClass("inactive-at-zero"),function(){if((a.infants.amount>0||a.children.amount>0)&&0===a.adults.amount)a.adults.amount=1;else{var n=a.adults.amount+a.children.amount;if(0===n)return $(".guest-container-total-amount-string").empty().append("Add guests"),void $("#guest-remove-button").removeClass("display-delete-button");$("#guest-remove-button").addClass("display-delete-button").on("click",(function(){a.infants.amount=0,a.children.amount=0,a.adults.amount=0}));var o="";console.log(a.infants.amount),1===a.infants.amount&&(o=", ".concat(a.infants.amount," infant")),a.infants.amount>1&&(o=", ".concat(a.infants.amount," infants")),$(".guest-container-total-amount-string").empty().append("".concat(n," ").concat(1===n?"guest":"guests").concat(o))}}()}}]),n}(),a={},["adults","children","infants"].forEach((function(n){a[n]=new o(n),$(".reduce-number-of-".concat(n)).on("click",(function(){0!==a[n].amount&&(a[n].amount-=1)})),$(".increase-number-of-".concat(n)).on("click",(function(){a[n].amount+=1}))})))),$(this).hasClass("experience-location-container")&&$(".experience-location-active").addClass("display-search-bar-option"),$(this).hasClass("experience-date-container")&&(console.log("button selected"),$(".experience-dates-active").addClass("display-search-bar-option"),window.calendarLoaded||(window.calendarLoaded=!0,loadCalendar())),$("body").on("click",n),$(document).on("scroll",n)})),$(".account-settings-container").on("click",(function n(o){if(o.stopPropagation(),!$(o.target).closest($(".account-settings-dropdown")).length)return $(".account-settings-dropdown").hasClass("account-settings-dropdown-display")?($(".account-settings-dropdown").removeClass("account-settings-dropdown-display"),void $("body").off("click",n)):($(".account-settings-dropdown").addClass("account-settings-dropdown-display"),void $("body").on("click",n))})),function(){function n(n,o){var a=$("<div></div>",{class:"".concat(o,"-destinations-content-container list-of-destinations-content-container")}),e=$(".list-of-destinations-section");a.appendTo(e),n.forEach((function(n){a.append('<div class="destination-container">\n            <h3 class="destination-location">'.concat(n.location,'</h3>\n            <h4 class="destination-country">').concat(n.region,"</h4>\n          </div>"))})),$(".".concat(o,"-destination-title")).on("click",(function(){$(".type-of-destination-active").removeClass("type-of-destination-active"),$(this).addClass("type-of-destination-active"),$(".display-destinations").removeClass("display-destinations"),a.addClass("display-destinations")}))}n([{location:"Aberdeen",region:"Scotland"},{location:"Aberystwyth",region:"Wales"},{location:"Alnwick",region:"England"},{location:"Bamburgh",region:"England"},{location:"Berwick-upon-Tweed",region:"England"},{location:"Boscastle",region:"England"},{location:"Brittany",region:"Bourgogne-Franche-Comté"},{location:"Budapest",region:"Hungary"},{location:"Cardiff",region:"Wales"},{location:"Castleton",region:"England"},{location:"Cheltenham",region:"England"},{location:"Conwy",region:"Wales"},{location:"Criccieth",region:"Wales"},{location:"Dartmouth",region:"England"},{location:"Donegal",region:"County Donegal"},{location:"Dublin",region:"County Dublin"},{location:"Dumfries",region:"Scotland"},{location:"Durham",region:"England"},{location:"Galway",region:"County Galway"},{location:"Glasgow",region:"Scotland"},{location:"Grassington",region:"England"},{location:"Harrogate",region:"England"},{location:"Hawes",region:"England"},{location:"Hay-on-Wye",region:"Wales"},{location:"Inverness",country:"Scotland"},{location:"Kielder",region:"England"},{location:"Kraków",region:"Lesser Poland Voivodeship"},{location:"Lisbon",region:"Lisbon Region"},{location:"Llangollen",region:"Wales"},{location:"Ludlow",region:"England"},{location:"Lymington",region:"England"},{location:"Málaga",region:"Andalusia"},{location:"Milan",region:"Lombardy"},{location:"Minehead",region:"England"},{location:"Murcia",region:"Region of Murcia"},{location:"Newcastle upon Tyne",region:"England"},{location:"Nice",region:"Provence-Alpes-Côte d'Azur"},{location:"North Berwick",region:"Scotland"},{location:"Norwich",region:"England"},{location:"Nottingham",region:"England"},{location:"Oban",region:"Scotland"},{location:"Pickering",region:"England"},{location:"Pitlochry",region:"Scotland"},{location:"Porthmadog",region:"Wales"},{location:"Portpatrick",region:"Scotland"},{location:"Rye",region:"England"},{location:"Seahouses",region:"England"},{location:"Skipton",region:"England"},{location:"Llanberis",region:"Wales"},{location:"St Andrews",region:"Scotland"},{location:"St Austell",region:"England"},{location:"Swanage",region:"England"},{location:"Swansea",region:"Wales"},{location:"Tintagel",region:"England"},{location:"West Wittering",region:"England"},{location:"York",region:"England"},{location:"Tokyo",region:"Tokyo Region"}],"historic"),n([{location:"Abersoch",region:"Wales"},{location:"Agadir",region:"Souss-Massa"},{location:"Albufeira",region:"Faro District"},{location:"Aldeburgh",region:"England"},{location:"Alicante",region:"Valencian Community"},{location:"Almería",region:"Andalusia"},{location:"Alnmouth",region:"England"},{location:"Alvor",region:"Portugal"},{location:"Antibes",region:"Provence-Alpes-Côte d'Azur"},{location:"Ayia Napa",region:"Famagusta"},{location:"Barmouth",region:"Wales"},{location:"Beach",region:"England"},{location:"Beer",region:"England"},{location:"Benalmádena",region:"Andalusia"},{location:"Benidorm",region:"Valencian Community"},{location:"Biarritz",region:"Nouvelle-Aquitaine"},{location:"Blackpool",region:"England"},{location:"Blakeney",region:"England"},{location:"Bournemouth",region:"England"},{location:"Bradford",region:"England"},{location:"Brean",region:"England"},{location:"Bridlington",region:"England"},{location:"Brixham",region:"England"},{location:"Broadstairs",region:"England"},{location:"Bude",country:"England"},{location:"Bundoran",region:"County Donegal"},{location:"Buxton",region:"England"},{location:"Cala d'Or",region:"Balearic Islands Region"},{location:"Cala Galdana",region:"Balearic Islands Region"},{location:"Calp",region:"Valencian Community"},{location:"Cannes",region:"Provence-Alpes-Côte d'Azur"},{location:"Cape Town",region:"Western Cape"},{location:"Carvoeiro",region:"Faro District"},{location:"Christchurch",region:"England"},{location:"Crantock",region:"England"},{location:"Cromer",region:"England"},{location:"Cádiz",region:"Andalusia"},{location:"Dalyan",region:"Muğla Region"},{location:"Dawlish Warren",region:"England"},{location:"Dawlish",region:"England"},{location:"Dubai",region:"Dubai Region"},{location:"Eastbourne",region:"England"},{location:"Falmouth",region:"England"},{location:"Faro",region:"Faro District"},{location:"Ölüdeniz",region:"Muğla Region"},{location:"Filey",region:"England"},{location:"Flamborough",region:"England"},{location:"Fuengirola",region:"Andalusia"},{location:"Corralejo",region:"Canary Islands"},{location:"Great Yarmouth",region:"England"},{location:"Hastings",region:"England"},{location:"Hemsby",region:"England"},{location:"Hunstanton",region:"England"},{location:"Ilfracombe",region:"England"},{location:"Puerto de la Duquesa",region:"Andalusia"},{location:"Playa Blanca",region:"Canary Islands"},{location:"Lanzarote",region:"Canary Islands"},{location:"Larnaca",region:"Larnaca Region"},{location:"Lincoln",region:"England"},{location:"Lindos",region:"Greece"},{location:"Lizard",region:"England"},{location:"Llandudno",region:"Wales"},{location:"Looe",region:"England"},{location:"Los Cristianos",region:"Canary Islands"},{location:"Lyme Regis",region:"England"},{location:"Magaluf",region:"Balearic Islands Region"},{location:"Alcúdia",region:"Balearic Islands Region"},{location:"Marbella",region:"Andalusia"},{location:"Margate",region:"England"},{location:"İçmeler",region:"Muğla Region"},{location:"Mevagissey",region:"England"},{location:"Miami Beach",region:"Florida"},{location:"Miami",region:"Florida"},{location:"Mijas",region:"Andalusia"},{location:"Moraira",region:"Valencian Community"},{location:"Naples",region:"Florida"},{location:"Newcastle",region:"Northern Ireland"},{location:"Newquay",region:"England"},{location:"Padstow",region:"England"},{location:"Palma Nova",region:"Balearic Islands Region"},{location:"Paphos",country:"Paphos Region"},{location:"Penzance",region:"England"},{location:"Perranporth",region:"England"},{location:"Plymouth",region:"England"},{location:"Polperro",region:"England"},{location:"Port Isaac",region:"England"},{location:"Port de Pollença",region:"Balearic Islands Region"},{location:"Portrush",region:"Northern Ireland"},{location:"Portstewart",region:"Northern Ireland"},{location:"Positano",region:"Campania"},{location:"Protaras",region:"Famagusta"},{location:"Robin Hood's Bay",region:"England"},{location:"Runswick Bay",region:"England"},{location:"Salcombe",region:"England"},{location:"Salou",region:"Catalonia"},{location:"Donostia-San Sebastian",region:"Basque Country"},{location:"Sandsend",region:"England"},{location:"Santa Ponsa",region:"Balearic Islands Region"},{location:"Saundersfoot",region:"Wales"},{location:"Scarborough",region:"England"},{location:"Seaside",region:"Oregon"},{location:"Seaview",region:"England"},{location:"Sennen Cove",region:"England"},{location:"Sheringham",region:"England"},{location:"Shetland",region:"Scotland"},{location:"Sidari",region:"Greece"},{location:"Sidmouth",region:"England"},{location:"Skegness",region:"England"},{location:"Sorrento",region:"Campania"},{location:"Southport",region:"England"},{location:"Southwold",region:"England"},{location:"Split",region:"Split-Dalmatia County"},{location:"St Agnes",region:"England"},{location:"St Mawes",region:"England"},{location:"St Ives",region:"England"},{location:"Staithes",region:"England"},{location:"Sunny Beach",region:"Burgas Region"},{location:"Sydney",region:"New South Wales"},{location:"Sóller",region:"Balearic Islands Region"},{location:"Teignmouth",region:"England"},{location:"Tenby",country:"Wales"},{location:"Costa Adeje",region:"Canary Islands"},{location:"Playa de las Américas",region:"Canary Islands"},{location:"Torquay",region:"England"},{location:"Torremolinos",region:"Andalusia"},{location:"Torrevieja",region:"Valencian Community"},{location:"Valencia",region:"Valencian Community"},{location:"Villamartin",region:"Valencian Community"},{location:"Wells-next-the-Sea",region:"England"},{location:"Weston-super-Mare",region:"England"},{location:"Weymouth",region:"England"},{location:"Whitby",region:"England"},{location:"Whitstable",region:"England"},{location:"Woolacombe",region:"England"},{location:"Lefkada",region:"Greece"},{location:"Rhodes",region:"Greece"}],"coastal"),n([{location:"Berlin",region:"Berlin Region"},{location:"Cork",region:"County Cork"},{location:"Hayling Island",region:"England"},{location:"Ingoldmells",region:"England"},{location:"La Rochelle",region:"Nouvelle-Aquitaine"},{location:"Windsor",region:"England"}],"island"),n([{location:"Ambleside",region:"England"},{location:"Bowness-on-Windermere",region:"England"},{location:"Coniston",region:"England"},{location:"Grasmere",region:"England"},{location:"Hawkshead",region:"England"},{location:"Keswick",region:"England"},{location:"Kissimmee",region:"Florida"},{location:"Windermere",region:"England"},{location:"Lakeside",region:"England"},{location:"Morzine",region:"Auvergne-Rhône-Alpes"},{location:"New York",region:"New York"},{location:"Orlando",region:"Florida"},{location:"Tattershall",region:"England"}],"lake"),n([{location:"Aberfeldy",region:"Scotland"},{location:"Amsterdam",region:"North Holland"},{location:"Athens",region:"Greece"},{location:"Aviemore",region:"Scotland"},{location:"Bakewell",region:"England"},{location:"Barcelona",region:"Catalonia"},{location:"Bath",region:"England"},{location:"Betws-y-Coed",region:"Wales"},{location:"Birmingham",region:"England"},{location:"Bordeaux",region:"Nouvelle-Aquitaine"},{location:"Bourton-on-the-Water",region:"England"},{location:"Brecon",region:"Wales"},{location:"Bridport",region:"England"},{location:"Bristol",region:"England"},{location:"Cambridge",region:"England"},{location:"Chamonix",region:"Auvergne-Rhône-Alpes"},{location:"Cheddar",region:"England"},{location:"Chester",region:"England"},{location:"Chichester",region:"England"},{location:"Davenport",region:"Florida"},{location:"Exmouth",region:"England"},{location:"Florence",region:"Tuscany"},{location:"Kirkby Lonsdale",region:"England"},{location:"Las Vegas",region:"Nevada"},{location:"Leeds",country:"England"},{location:"Leicester",region:"England"},{location:"Les Gets",region:"Auvergne-Rhône-Alpes"},{location:"Liverpool",region:"England"},{location:"London",region:"England"},{location:"Los Angeles",region:"California"},{location:"Manchester",region:"England"},{location:"Munich",region:"Bavaria"},{location:"Oxford",region:"England"},{location:"Paris",region:"Île-de-France"},{location:"Peebles",region:"Scotland"},{location:"Porto",region:"Porto District"},{location:"Portsmouth",region:"England"},{location:"Rome",region:"Lazio"},{location:"San Antonio",region:"Texas"},{location:"San Francisco",region:"California"},{location:"Seville",region:"Andalusia"},{location:"Sheffield",region:"England"},{location:"St Davids",region:"Wales"},{location:"Stratford-upon-Avon",region:"England"},{location:"Sussex",region:"New Brunswick"},{location:"Tignes",region:"Auvergne-Rhône-Alpes"},{location:"Venice",region:"Veneto"},{location:"Vienna",region:"Austria"}],"other"),$(".historic-destinations-content-container").addClass("display-destinations")}(),handleResize()}));