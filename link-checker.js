let axios = require("axios");
let fs = require("fs");
let json2csv = require("json2csv");

let fields = ["url", "resolvedUrl", "status", "statusText", "isRedirect"];

let mappedUrlsInProgress = [];

let urls = [
  "https://www.facebook.com/BayerSCG",
  "https://www.youtube.com/channel/UC_BMr3vNHZG17R848M-meZw",
  "https://www.youtube.com/channel/UCuWBda2PhrGgInYVRpkECWQ?view_as=subscriber",
  "https://www.youtube.com/channel/UC_GvBBxKBd-mUDWe5hUUblQ",
  "https://twitter.com/BayerSchweiz_DE",
  "http://pf.kakao.com/_exehxid",
  "http://pf.kakao.com/_sPSzC",
  "https://www.youtube.com/bayer",
  "https://www.xing.com/companies/bayerinderschweiz",
  "https://www.youtube.com/c/bayerconsumerhealthbulgaria",
  "https://www.facebook.com/BayerEastAfrica/",
  "https://www.facebook.com/BayerEastAfrica/",
  "https://twitter.com/BayerCH",
  "https://www.facebook.com/zivibolje/?modal=admin_todo_tour",
  "https://www.facebook.com/Bayer-Danmark-295608794686172",
  "https://business.facebook.com/bayernorge/?business_id=236338936878561",
  "https://www.facebook.com/BayerPakistan",
  "http://www.facebook.com/hydrasenseusa",
  "https://twitter.com/YouthAgSummit",
  "https://www.instagram.com/bayernorge/",
  "https://twitter.com/Endo_KE",
  "https://www.youtube.com/channel/UCbAwvlSmp3fXOBbtvND4_Gw",
  "https://www.instagram.com/bayerdeutschland/",
  "https://www.instagram.com/conlamujer/",
  "https://www.youtube.com/channel/UCwMRDxAMnzg8gKEdEeFEs0A",
  "https://salud.bayer.es/bayer-te-cuida",
  "https://www.facebook.com/bayertecuid",
  "http://blog.tenemosunaedad.com",
  "https://es.pinterest.com/Bayertecuida/",
  "http://www.twitter.com/bayertecuida",
  "https://www.youtube.com/channel/UC--FE-dwL2cb9K-ixs7pAzA",
  "http://www.youtube.com/user/Tenemos1edad",
  "https://www.facebook.com/BepanthenPolska/?fref=ts",
  "https://www.youtube.com/channel/UCzJsKtHasg9r1dDmRrhqr2Q",
  "https://www.instagram.com/bayerespanaoficial/",
  "http://blog.bayer.es",
  "https://twitter.com/BayerEspana",
  "https://www.facebook.com/JestRolnikJestZywnosc",
  "https://www.instagram.com/jest_rolnik_jest_zywnosc/?hl=pl",
  "http://www.facebook.com/bayerhalsa",
  "http://www.instagram.com/bayerhalsa",
  "http://www.linkedin.com/company/bayer-sverige",
  "https://www.facebook.com/zivibolje/?modal=admin_todo_tour",
  "http://www.youtube.com/canestensouthafrica",
  "https://www.facebook.com/Penta-vite-149038768985682/",
  "https://..tbd...",
  "https://line.me/R/ti/p/%40fek8865g",
  "https://www.facebook.com/bayer.taiwan.innovation/",
  "https://band.us/n/a4a1Ycy2ma77a",
  "https://line.me/R/ti/p/%40xvi8691t",
  "http://pf.kakao.com/_xbHpNM",
  "https://www.facebook.com/Bayer4CropsES/",
  "https://www.linkedin.com/groups/10386474/",
  "https://www.instagram.com/",
  "https://twitter.com/BayerSverigeAB",
  "https://www.youtube.com/channel/UCTZnE2dAJ3ZBNSux1khe3CA",
  "https://www.facebook.com/BayerSV",
  "https://vk.com/bayerrussia",
  "http://www.youtube.com/user/bayercropscienceit?feature=results_main",
  "https://www.facebook.com/ProteccionParaTuHogar/",
  "http://twitter.com/#!/Bayer4CropsUK",
  "https://www.facebook.com/BayerBeeCareCenter/",
  "https://www.facebook.com/BayerCropScienceHrvatskaBiH/",
  "https://www.instagram.com/bayerrussia/",
  "https://business.facebook.com/BayerAdempas",
  "https://www.youtube.com/channel/UC_jsCI6d8NNSdPsiAl-yiPA/featured",
  "http://www.linkedin.com",
  "https://www.linkedin.com/company/bayerAPACPharma",
  "https://www.youtube.com/channel/UChXXF5KOk22Wc1OQ31yIn5Q",
  "https://www.instagram.com/bayercanada/",
  "https://www.youtube.com/channel/UCaFXsdQWUoXIVPwFz0rlqTQ",
  "https://www.instagram.com/bayer4cropsdk/",
  "https://www.youtube.com/channel/UCb52odwXK6uBto5kZisKrlA?view_as=subscriber",
  "https://www.youtube.com/channel/UCBEg0DnNxxPSPFgLp2VL42g",
  "https://www.youtube.com/channel/UCXJPvw4oQRpwGe84_iYnSrg",
  "https://www.youtube.com/channel/UC682-BeDZxTkchHcLpEuw2Q",
  "https://www.youtube.com/channel/UCkcgT1NASHwPJTe4Gh-EJpA",
  "https://www.instagram.com/priorin_de",
  "http://www.facebook.com/prioringermany/",
  "https://www.youtube.com/channel/UCWZ8PMPbtMLhFnuXDbsoTKA",
  "https://www.youtube.com/user/AGROBAYERPERU",
  "http://www.facebook.com/AfrisalAguadeMar",
  "https://www.facebook.com/Ja-mama-2303272949909959",
  "https://www.facebook.com/Jaz-mama-2611646365577134",
  "https://www.youtube.com/channel/UCp6sF9bA9N-rTcGZCNqYf1A?view_as=subscriber",
  "https://www.youtube.com/channel/UCK6SQdOxYLxV1l_S-WrVh4A",
  "https://www.facebook.com/BayerCropScienceHrvatskaBiH/",
  "https://www.youtube.com/c/BayerCroatiaConsumerHealth",
  "https://www.youtube.com/c/BayerSloveniaConsumerHealth",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=423382783",
  "https://www.facebook.com/LiebeSLeben.jp/",
  "https://www.instagram.com/meinliebesleben/?utm_source=ig_profile_share&igshid=py70he1hlovz",
  "https://www.youtube.com/channel/UCE9WD1cBxumSG2cr1fqIuGg",
  "https://www.facebook.com/phunusongchudong/",
  "https://www.instagram.com/madeinfarm_oficial/?hl=pt-br",
  "https://www.facebook.com/BayerCareer/",
  "https://www.instagram.com/bayerkarriere/",
  "https://www.instagram.com/bayerausbildung/",
  "https://www.glassdoor.de/Bewertungen/Bayer-Bewertungen-E4245.htm",
  "http://www.youtube.com/user/BayerKarriere",
  "https://www.kununu.com/de/bayer",
  "https://twitter.com/BLEReport",
  "https://twitter.com/bayerkarriere",
  "https://www.facebook.com/BayerKarriere/",
  "https://instagram.com/bayer_italia/",
  "https://www.youtube.com/channel/UCVssDJ-AzcVy9xiShawmv5w",
  "https://www.youtube.com/channel/UCuQHIex-cZKtR5VjJPd-l3Q",
  "https://www.youtube.com/user/BayerCropScienceBR/featured?view_as=subscriber",
  "https://www.facebook.com/AgroBayerBrasil",
  "https://www.youtube.com/channel/UClTyZivT5uNp1pTvr59OHeA",
  "http://twitter.com/BayerCarreiras",
  "http://www.facebook.com/BayerCarreirasBrasil",
  "http://twitter.com/bayerjovens",
  "http://www.facebook.com/bayerjovensBR",
  "https://mp.weixin.qq.com/",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=311451062",
  "https://instagram.com/bayercareersuk",
  "https://twitter.com/UKBayer",
  "https://www.linkedin.com/in/lily-villacis-5b473142/",
  "https://www.linkedin.com/in/stephanie-rinkel-56763b21/",
  "https://www.linkedin.com/in/heiko-mussmann-68b2788/",
  "https://www.linkedin.com/in/mathias-kremer-9b669231/",
  "https://twitter.com/KremerMathias",
  "https://www.facebook.com/KremerBayerAndina",
  "https://www.facebook.com/AskMayaNow/",
  "http://www.twitter.com/Bayer_FR",
  "https://www.facebook.com/BayerIreland/",
  "https://twitter.com/LetsTalkCrops",
  "https://www.facebook.com/LetsTalkCrops/",
  "https://www.instagram.com/bayer4cropsuk",
  "http://www.facebook.com/pages/Bayer-CropScience-Ukraine/330219993696576",
  "http://twitter.com/#!/Bayer4CropsUS",
  "https://www.facebook.com/bayercropscienceeestis/",
  "https://www.facebook.com/bayercropscienceeestis/",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=421494754",
  "http://instagram.com/bayerinnovacion",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=421227397",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=421227397",
  "https://www.facebook.com/groups/1360982500611807/",
  "https://twitter.com/GOAPbyBayer",
  "https://www.youtube.com/user/schwangerschaft-wissen",
  "http://at.line.me/en/",
  "https://www.youtube.com/channel/UCq5C83QK4dW6ckSo22SY64Q",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=371511864",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=349760425",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=349751720",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=326596156",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=310858217",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=310634075",
  "http://facebook.com/ZambukID",
  "https://www.youtube.com/channel/UCCPcM4rbAIXKcsua9ww-RFg",
  "https://vimeo.com/bayersuomi",
  "https://business.facebook.com/Bayer-Crop-Science-Canada-2024558920950014/?business_id=599137240465668",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=419232137",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=306522079",
  "https://mp.weixin.qq.com",
  "http://www.facebook.com/heikobayerperu/",
  "https://www.facebook.com/groups/Bayer.SIUonline/",
  "https://www.linkedin.com/company-beta/11042488",
  "http://bayerinnovacion.wordpress.com/",
  "https://www.youtube.com/user/BAYERCOLOMBIA",
  "http://twitter.com/BayerInnovacion",
  "http://www.facebook.com/BayerAndina",
  "http://www.facebook.com/AgroBayerPeru",
  "https://www.facebook.com/ViskasTavoRankose/",
  "https://www.instagram.com/viskas_tavo_rankose/",
  "http://www.facebook.com/BayerIndiaMSMS",
  "http://www.facebook.com/BayerCareerIndia",
  "http://www.facebook.com/ChooseSafetyChooseBayer",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=419244891",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=419068441",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=419019639",
  "https://www.facebook.com/bayerausbildung/",
  "https://www.youtube.com/user/GeraertsEline",
  "http://pf.kakao.com/_xeSxjaC",
  "https://www.facebook.com/renniedeutschland/",
  "https://www.facebook.com/AleveCanada/",
  "https://www.youtube.com/channel/UCqlfsd7HyZLxgGfShP9AJOA",
  "https://www.youtube.com/channel/UCq5C83QK4dW6ckSo22SY64Q",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=309640857",
  "https://www.instagram.com/bayercareer/",
  "https://twitter.com/bayercareer",
  "http://www.instagram.com/bayeril/",
  "https://www.instagram.com/BayerAusbildung",
  "http://twitter.com/bayernederland",
  "https://www.facebook.com/inhouseconsulting/",
  "https://www.facebook.com/bayerslovenia",
  "https://www.facebook.com/maennerredenjetzt",
  "https://www.youtube.com/channel/UC4_fVe-Q88GIH6OpM4WRrQg",
  "https://www.instagram.com/bayergencbilimelcileri/",
  "https://www.facebook.com/bilimelcileri/?fref=ts",
  "https://www.youtube.com/channel/UCLimtmsc8R7howfRa25cOfg",
  "https://www.facebook.com/BayerTurkiye/?fref=ts",
  "https://www.instagram.com/bayerturk/",
  "https://www.youtube.com/channel/UCpzZXhkrbaNXylsU4GCgTdg",
  "https://www.facebook.com/bayercropscienceturkiye/?fref=ts",
  "https://www.instagram.com/sinuvalik.ee/",
  "http://www.instagram.com/idealparavos.ar",
  "https://plus.google.com/+BayerCropScienceUSDurham",
  "https://www.flickr.com/photos/bayer4cropsus/",
  "https://www.instagram.com/bayer4cropsus/",
  "https://www.pinterest.com/bayeradvanced/",
  "http://www.youtube.com/user/BackedByBayerTurf",
  "http://www.youtube.com/channel/UCeq7mOAcfee86UYyG8SCgvw",
  "http://www.youtube.com/user/bayeradvanced",
  "http://www.youtube.com/channel/UC4pTi7WyGAJSIiJzjSLEJ4g",
  "http://www.youtube.com/user/BackedByBayerPest",
  "https://twitter.com/BayerOrnamental",
  "http://www.youtube.com/user/BayerBeeCareCenter",
  "https://de.pinterest.com/bayer4cropsus/",
  "http://www.youtube.com/user/BayerCropScienceUS#p/u",
  "https://twitter.com/BayerGolf",
  "https://twitter.com/BayerLawn",
  "https://www.facebook.com/BayerBeeCareCenter",
  "http://twitter.com/#!/Bayer4CropsUS",
  "https://twitter.com/BayerAdvanced",
  "https://www.facebook.com/BayerAdvanced",
  "https://www.facebook.com/livingwithhemophilia/",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=350259701",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=349749982",
  "https://www.facebook.com/tavadzive/",
  "https://www.instagram.com/tavadzive",
  "https://www.instagram.com/bayerportugal",
  "https://www.facebook.com/BayerCropScienceSE/",
  "https://www.facebook.com/Bayer-Crop-Science-Norge-1620420358016761/",
  "http://instagram.com/ClubForSmartGirl",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=315868060",
  "https://www.facebook.com/BepanthenUkraine",
  "https://www.instagram.com/bayer4cropsca",
  "http://www.youtube.com/bayerportugal",
  "https://www.facebook.com/BayerPortugal",
  "https://www.youtube.com/user/Radiologieetmoi",
  "https://www.facebook.com/bayercropscienceDK/",
  "http://twitter.com/#!/search/bayercropnl",
  "http://www.youtube.com/user/bayercropnl",
  "https://twitter.com/Bayer4CropsBE",
  "http://www.facebook.com/BayerCropNL",
  "https://plus.google.com/u/1/115809637586545038736/",
  "https://www.youtube.com/channel/UCZ63fCoCEZjg28EmK1q7GlA",
  "https://www.youtube.com/channel/UCexCLkY9uNoEM_-pkUWInNQ",
  "http://www.instagram.com/bayeragro",
  "https://www.youtube.com/channel/UC0xiCVGjeYvov8H-aFcQ44A",
  "https://www.facebook.com/BayerCropscienceLT/",
  "http://twitter.com/bayersuomi",
  "https://www.youtube.com/channel/UCdHx63MBTLmgTEoww4L4W4Q",
  "https://twitter.com/Bayer4CropsCA",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=326152360",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=325266253",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=325254050",
  "http://www.facebook.com/MiCultivoBayer",
  "http://www.youtube.com/user/BAYERCROPSCIENCE",
  "https://www.facebook.com/BayerAdvanced",
  "https://www.facebook.com/YouthAgSummit?fref=ts",
  "https://www.facebook.com/youfarminternational?fref=ts",
  "https://twitter.com/YouFarmVideo",
  "http://www.facebook.com/BayerCropScienceRussia",
  "http://www.facebook.com/BayerCropNL",
  "https://twitter.com/BayerGardenUK",
  "http://www.facebook.com/bayercropscience",
  "https://www.facebook.com/BayerAgEdu?fref=ts",
  "http://www.facebook.com/agrar.bayer",
  "https://www.facebook.com/BayerCropScienceSlovenija",
  "http://www.facebook.com/nunhems",
  "https://www.youtube.com/channel/UCBiupRpzHgJdC2wVowDeZtg",
  "https://twitter.com/BayerAgEdu",
  "https://twitter.com/BayerAgEdu",
  "https://www.youtube.com/user/youfarminternational",
  "https://twitter.com/BayerMalaria",
  "https://twitter.com/Bayer4CropsDK",
  "http://www.youtube.com/user/bayercropscienceuk",
  "https://twitter.com/BayerCrop_br",
  "https://twitter.com/Bayer4Crops",
  "http://www.youtube.com/user/bayercropscienceau",
  "https://twitter.com/BayerCropsRU",
  "http://www.youtube.com/user/bayeagrofokus",
  "https://twitter.com/Bayer4CropsCA",
  "https://twitter.com/Bayer4CropsAU",
  "http://twitter.com/#!/search/bayercropnl",
  "http://twitter.com/#!/Bayerbeecare",
  "http://www.flickr.com/photos/bayercropscience/",
  "http://www.linkedin.com/company/bayer-cropscience",
  "https://www.facebook.com/BayerAgEdu/?fref=ts",
  "https://plus.google.com/104529689577151647930/posts",
  "https://www.instagram.com/youthagsummit/",
  "http://www.slideshare.net/bayercropscience",
  "https://www.facebook.com/YouthAgSummit/?fref=ts",
  "http://twitter.com/#!/Bayer4CropsUK",
  "https://www.facebook.com/ProteccionParaTuHogar/",
  "http://www.facebook.com/MiCultivoBayer",
  "https://twitter.com/BayerCrop_br",
  "https://twitter.com/BayerCropsRU",
  "https://twitter.com/Bayer4Crops",
  "https://twitter.com/Bayer4CropsAU",
  "http://www.facebook.com/agrar.bayer",
  "https://www.facebook.com/BayerCropScienceSlovenija",
  "http://www.facebook.com/BayerCropScienceRussia",
  "https://www.facebook.com/youfarminternational?fref=ts",
  "http://www.facebook.com/bayercropscience",
  "https://www.facebook.com/BayerAgEdu?fref=ts",
  "http://www.facebook.com/nunhems",
  "https://www.facebook.com/BayerCropScienceSlovenija",
  "https://twitter.com/Bayer4CropsCA",
  "https://www.facebook.com/AeriusUkraine/",
  "https://www.facebook.com/Bayer-Crop-Science-Suomi-132353500760173/",
  "https://www.instagram.com/aspirin_neu_entdecken/",
  "http://www.youtube.com/channel/UCaFXsdQWUoXIVPwFz0rlqTQ",
  "http://www.instagram.com/bayercanada/",
  "http://www.facebook.com/BayerIndia",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=316462391",
  "https://www.youtube.com/user/ColturaeCultura",
  "https://twitter.com/g4a_italy",
  "https://www.youtube.com/channel/UCZ6J5BQfeQTg1YXb3tDJsLw",
  "https://twitter.com/colturaecultura",
  "https://twitter.com/bayeritalia",
  "https://it-it.facebook.com/colturaecultura/",
  "https://www.youtube.com/user/Bayer4Radiology",
  "https://www.instagram.com/braveisthenewpretty/",
  "http://www.bayer.ca",
  "http://www.bayer.ca",
  "https://www.youtube.com/channel/UCplxNhFEEVxi9i9vgcAhhtw",
  "https://www.facebook.com/official.byl/",
  "http://www.adalat.jp/ja/home/pharmacist/",
  "https://www.instagram.com/bayer4cropsa/",
  "https://www.facebook.com/Bepanthen-Ireland-293916977406959/",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=312669885",
  "https://www.youtube.com/channel/UCvff8Pr0z0kdwGEIazlOapg",
  "http://www.youtube.com/channel/UCoqNOPSyvp74GshRTUDjlnw",
  "https://www.youtube.com/channel/UCL0M-nG0VXWASBglmuQxsrg",
  "https://twitter.com/Bayer4SelfCare",
  "https://twitter.com/Bayer4Crops_SA",
  "https://www.facebook.com/BayerCropScienceSA/",
  "https://vk.com/club67898441",
  "https://vk.com/g4amoscow",
  "https://www.facebook.com/Supradyn-All-Day-1071603052877477",
  "https://www.facebook.com/MSileYasiyorum/?fref=ts",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=310524074",
  "https://mira.intranet.cnb/mira/Assets/SocialMedia?FLRExtIdDoc=310100113",
  "https://www.facebook.com/groups/G4Amoscow/",
  "https://www.youtube.com/user/bayerhungariaconsumerhealth",
  "https://www.facebook.com/bayer.israel/",
  "http://www.youtube.com/user/BayerCropScienceBR",
  "http://www.youtube.com/user/BayerCropScienceRU",
  "https://www.facebook.com/DrSchollsCentroamerica/",
  "https://twitter.com/BayerAgroArg",
  "https://www.youtube.com/channel/UCNOCD2_1ucW4bvSeGUT-_9g",
  "https://www.instagram.com/bayer4crops/",
  "https://www.facebook.com/YouthAgSummit?fref=ts",
  "https://www.youtube.com/channel/UCt5DqWc9QuYIVTjt6TvcFyQ",
  "https://www.facebook.com/redoxonargentina",
  "http://www.instagram.com/BeroccaArgentina",
  "https://twitter.com/menshealth_za",
  "https://www.facebook.com/SapereSalute/",
  "https://www.facebook.com/CitrosodinaOfficial/",
  "https://www.instagram.com/bepanthenol_4mums/",
  "https://www.youtube.com/channel/UC1ogHc-wIyREtCu8R6_rvzg",
  "https://www.facebook.com/bepanthenolitalia",
  "https://www.youtube.com/channel/UCXXYzTSrgTj2bG_Eyg_8mWw"
];

/**
 * Resolves a links final location and status
 * @param {URI} urlToCheck The url to be checked
 * @returns {Object} An object containing the final location, and status of the URL
 */
function getLinkInfo(urlToCheck) {
  try {
    urlToCheck = urlToCheck.replace(/#.*/, "");
    return new Promise((resolve, reject) => {
      axios
        .head(urlToCheck)
        .then(result => {
          // console.log(result)
          resolve(result);
        })
        .catch(error => {
          resolve(error.response);
        });
    });
  } catch (error) {
    console.log("In getLinkInfo", error);
  }
}

function processLinkResponse(response) {
  try {
    let resolvedUrl = response.request._redirectable._isRedirect
      ? response.request._redirectable._currentUrl
      : response.config.url;
    returnVal = {
      url: response.config.url,
      resolvedUrl,
      status: response.status,
      statusText: response.statusText,
      isRedirect: response.request._redirectable._isRedirect || false
    };
    // console.log(returnVal)
    mappedUrlsInProgress.push(returnVal);
    return returnVal;
  } catch (error) {
    console.log("In processLinkResponse", mappedUrlsInProgress);
    // fs.writeFile('links.json', JSON.stringify(mappedUrlsInProgress), (err)=> {
    // 	if (err) throw err;
    // 	console.log('JSON saved')
    // })
    writeToCSV();
  }
}

function processLinkResponses(responses) {
  return responses.map(processLinkResponse);
}

function handleLinkError(error) {
  processLinkResponse(error.response);
}

function writeToCSV(data = null, filePath = "links.csv") {
  if (data == null) data = mappedUrlsInProgress;
  let csv = json2csv({ data, fields });
  fs.writeFile(filePath, csv, err => {
    if (err) throw err;
    console.log("CSV saved");
  });
}

function writeToJSON(data = null, filePath = "links.json") {
  fs.writeFile(filePath, JSON.stringify(data), err => {
    if (err) throw err;
    console.log("JSON saved");
  });
}

// getLinkInfo(urls[1]).then(processLinkResponse).catch(handleLinkError)
// getLinkInfo(urls[90]).then(processLinkResponse)

try {
  fs.truncateSync("links.json");
  let mappedUrls = Promise.all(
    urls.map(url => {
      try {
        return getLinkInfo(url);
      } catch (error) {
        console.log("Fail");
      }
      return {
        url: url,
        resolvedUrl: "Failed",
        status: "Failed",
        statusText: "Failed",
        isRedirect: "Failed"
      };
    })
  )
    .then(processLinkResponses)
    .then(mappedUrls => {
      console.log("done");
      console.log(mappedUrls);
      writeToJSON(mappedUrls, "mappedUrls.json");
      writeToCSV();
    });
} catch (error) {
  console.log(mappedUrlsInProgress);
  writeToCSV();
  writeToJSON(
    urls.filter(url => mappedUrlsInProgress.find(m => m.url == url)),
    "unmappedUrls.json"
  );
  console.error(error);
}
