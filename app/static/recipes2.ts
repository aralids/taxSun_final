// 7 x 3.125
var allTaxa:object = JSON.parse(`{"not identified":{"lineageNames":[["no rank","not identified"]],"rank":"no rank","taxID":"0","totalCount":44,"unassignedCount":44},
"root":{"lineageNames":[["root", "root"]],"rank":"root","taxID":"NA","totalCount":128,"unassignedCount":0},
"Eukaryota":{"lineageNames":[["superkingdom","Eukaryota"]],"rank":"superkingdom","taxID":"1","totalCount":24,"unassignedCount":24},
"Acidobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Acidobacteria"]],"rank":"phylum","taxID":"2","totalCount":8,"unassignedCount":8},
"Armatimonadetes":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Armatimonadetes"]],"rank":"phylum","taxID":"3","totalCount":4,"unassignedCount":4},
"Bacteroidota":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Bacteroidota"]],"rank":"phylum]","taxID":"4","totalCount":4,"unassignedCount":4},
"Chloroflexi":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Chloroflexi"]],"rank":"phylum","taxID":"5","totalCount":4,"unassignedCount":4},
"Chrysiogenetes":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Chrysiogenetes"]],"rank":"phylum","taxID":"7","totalCount":4,"unassignedCount":4}, 
"Cyanobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Cyanobacteria"]],"rank":"phylum","taxID":"6","totalCount":4,"unassignedCount":4},
"Ignavibacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Ignavibacteria"]],"rank":"phylum","taxID":"7","totalCount":4,"unassignedCount":4}, 
"Nitrospirae":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Nitrospirae"]],"rank":"phylum","taxID":"8","totalCount":4,"unassignedCount":4},
"Proteobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Proteobacteria"]],"rank":"phylum","taxID":"9","totalCount":4,"unassignedCount":4}, 
"Viruses":{"lineageNames":[["superkingdom","Viruses"]],"rank":"superkingdom","taxID":"10","totalCount":24,"unassignedCount":24}}`);

// Black Forest I and II.
var allTaxa:object = JSON.parse(`{"not identified":{"lineageNames":[["no rank","not identified"]],"rank":"no rank","taxID":"0","totalCount":44,"unassignedCount":44},"root":{"lineageNames":[["root", "root"]],"rank":"root","taxID":"NA","totalCount":128,"unassignedCount":0},"Eukaryota":{"lineageNames":[["superkingdom","Eukaryota"]],"rank":"superkingdom","taxID":"1","totalCount":24,"unassignedCount":24},"Acidobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Acidobacteria"]],"rank":"phylum","taxID":"2","totalCount":8,"unassignedCount":8},"Armatimonadetes":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Armatimonadetes"]],"rank":"phylum","taxID":"3","totalCount":4,"unassignedCount":4},"Black Forest Cake I":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Bacteroidota"], ["subkingdom", "Black Forest Cake I"]],"rank":"subkingdom","taxID":"4","totalCount":2,"unassignedCount":2}, "Black Forest Cake II":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Bacteroidota"], ["subkingdom", "Black Forest Cake II"]],"rank":"subkingdom","taxID":"4","totalCount":2,"unassignedCount":2}, "Chloroflexi":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Chloroflexi"]],"rank":"phylum","taxID":"5","totalCount":4,"unassignedCount":4},"Kladdkaka":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Kladdkaka"]],"rank":"phylum","taxID":"6","totalCount":4,"unassignedCount":4}, "Amandine":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Amandine"]],"rank":"phylum","taxID":"7","totalCount":4,"unassignedCount":4}, "Nitrospirae":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Nitrospirae"]],"rank":"phylum","taxID":"8","totalCount":4,"unassignedCount":4}, "Proteobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Proteobacteria"]],"rank":"phylum","taxID":"9","totalCount":4,"unassignedCount":4}, "Viruses":{"lineageNames":[["superkingdom","Viruses"]],"rank":"superkingdom","taxID":"10","totalCount":24,"unassignedCount":24}}`);

// Three not enough.
var allTaxa:object = JSON.parse(`{"not identified":{"lineageNames":[["no rank","not identified"]],"rank":"no rank","taxID":"0","totalCount":44,"unassignedCount":44},
"root":{"lineageNames":[["root", "root"]],"rank":"root","taxID":"NA","totalCount":128,"unassignedCount":0},
"Eukaryota":{"lineageNames":[["superkingdom","Eukaryota"]],"rank":"superkingdom","taxID":"1","totalCount":24,"unassignedCount":24},
"Acidobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Acidobacteria"]],"rank":"phylum","taxID":"2","totalCount":40,"unassignedCount":40},
"Armatimonadetes":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Armatimonadetes"]],"rank":"phylum","taxID":"3","totalCount":1.5,"unassignedCount":1.5},
"Chrysiogenetes":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Chrysiogenetes"]],"rank":"phylum","taxID":"9","totalCount":1.5,"unassignedCount":1.5}, 
"Ignavibacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Ignavibacteria"]],"rank":"phylum","taxID":"4","totalCount":1.5,"unassignedCount":1.5}, 
"Viruses":{"lineageNames":[["superkingdom","Viruses"]],"rank":"superkingdom","taxID":"10","totalCount":24,"unassignedCount":24}}`);

// 7 x 3.125 but not flat.
var allTaxa:object = JSON.parse(`{"not identified":{"lineageNames":[["no rank","not identified"]],"rank":"no rank","taxID":"0","totalCount":44,"unassignedCount":44},
"root":{"lineageNames":[["root", "root"]],"rank":"root","taxID":"NA","totalCount":128,"unassignedCount":0},
"Eukaryota":{"lineageNames":[["superkingdom","Eukaryota"]],"rank":"superkingdom","taxID":"1","totalCount":24,"unassignedCount":24},
"Acidobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Acidobacteria"]],"rank":"phylum","taxID":"2","totalCount":8,"unassignedCount":8},
"Armatimonadetes":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Armatimonadetes"]],"rank":"phylum","taxID":"13123","totalCount":5,"unassignedCount":3},
"Armatimonadetes bacterium":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Armatimonadetes"],["species", "Armatimonadetes bacterium"]],"rank":"species","taxID":"36546214","totalCount":2,"unassignedCount":2},
"uncultured Segetibacter sp.":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Bacteroidota"],["class", "Chitinophagia"], ["order", "Chitinophagales"], ["family", "Chitinophagaceae"], ["genus", "Segetibacter"], ["species", "uncultured Segetibacter sp."]],"rank":"species","taxID":"4678534","totalCount":2,"unassignedCount":2},
"Chloroflexi bacterium":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Chloroflexi"],["species","Chloroflexi bacterium"]],"rank":"species","taxID":"555","totalCount":3,"unassignedCount":3},
"Chrysiogenetes":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Chrysiogenetes"]],"rank":"phylum","taxID":"6756756","totalCount":4,"unassignedCount":4}, 
"Cyanobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Cyanobacteria"]],"rank":"phylum","taxID":"72243","totalCount":1,"unassignedCount":1}, 
"Nitrospira sp.":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Nitrospirae"],["class", "Nitrospira class"], ["order", "Nitrospirales"],["family", "Nitrospiraceae"], ["genus", "Nitrospira genus"], ["species", "Nitrospira sp."]],"rank":"species","taxID":"867675","totalCount":6,"unassignedCount":6}, 
"Proteobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Proteobacteria"]],"rank":"phylum","taxID":"11119","totalCount":7,"unassignedCount":1.75}, 
"Alphaproteobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Proteobacteria"], ["class", "Alphaproteobacteria"]],"rank":"class","taxID":"565649","totalCount":5.25,"unassignedCount":1.75}, 
"Nitrobacteraceae":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Proteobacteria"], ["class", "Alphaproteobacteria"], ["order", "Hyphomicrobiales"], ["family", "Nitrobacteraceae"]],"rank":"family","taxID":"15359","totalCount":1.75,"unassignedCount":1.75}, 
"Acetobacteraceae bacterium":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Proteobacteria"], ["class", "Alphaproteobacteria"], ["order","Hyphomicrobiales"], ["family","Acetobacteraceae"], ["species","Acetobacteraceae bacterium"]],"rank":"species","taxID":"29235","totalCount":1.75,"unassignedCount":1.75}, 
"Viruses":{"lineageNames":[["superkingdom","Viruses"]],"rank":"superkingdom","taxID":"16760","totalCount":24,"unassignedCount":24}}`);

// All different width. Set treshold to 6% instead of 4%.
var allTaxa:object = JSON.parse(`{"not identified":{"lineageNames":[["no rank","not identified"]],"rank":"no rank","taxID":"0","totalCount":44,"unassignedCount":44},
"root":{"lineageNames":[["root", "root"]],"rank":"root","taxID":"NA","totalCount":128,"unassignedCount":0},
"Eukaryota":{"lineageNames":[["superkingdom","Eukaryota"]],"rank":"superkingdom","taxID":"1","totalCount":24,"unassignedCount":24},
"Acidobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Acidobacteria"]],"rank":"phylum","taxID":"2","totalCount":8,"unassignedCount":8},
"Armatimonadetes":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Armatimonadetes"]],"rank":"phylum","taxID":"3","totalCount":1,"unassignedCount":1},
"Bacteroidota":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Bacteroidota"]],"rank":"phylum","taxID":"4","totalCount":2,"unassignedCount":2},
"Chloroflexi":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Chloroflexi"]],"rank":"phylum","taxID":"5","totalCount":3,"unassignedCount":3},
"Chrysiogenetes":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Chrysiogenetes"]],"rank":"phylum","taxID":"6","totalCount":4,"unassignedCount":4}, 
"Cyanobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Cyanobacteria"]],"rank":"phylum","taxID":"7","totalCount":5,"unassignedCount":5}, 
"Nitrospirae":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Nitrospirae"]],"rank":"phylum","taxID":"8","totalCount":6,"unassignedCount":6}, 
"Proteobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Proteobacteria"]],"rank":"phylum","taxID":"9","totalCount":7,"unassignedCount":7}, 
"Viruses":{"lineageNames":[["superkingdom","Viruses"]],"rank":"superkingdom","taxID":"10","totalCount":24,"unassignedCount":24}}`);

// All different width. Set treshold to 6% instead of 4%.
var allTaxa:object = JSON.parse(`{"not identified":{"lineageNames":[["no rank","not identified"]],"rank":"no rank","taxID":"0","totalCount":44,"unassignedCount":44},
"root":{"lineageNames":[["root", "root"]],"rank":"root","taxID":"NA","totalCount":128,"unassignedCount":0},
"Eukaryota":{"lineageNames":[["superkingdom","Eukaryota"]],"rank":"superkingdom","taxID":"1","totalCount":24,"unassignedCount":24},
"Acidobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Acidobacteria"]],"rank":"phylum","taxID":"2","totalCount":8,"unassignedCount":8},
"Armatimonadetes":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Armatimonadetes"]],"rank":"phylum","taxID":"3","totalCount":1,"unassignedCount":1},
"Chloroflexi":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Chloroflexi"]],"rank":"phylum","taxID":"5","totalCount":3,"unassignedCount":3},
"Chrysiogenetes":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Chrysiogenetes"]],"rank":"phylum","taxID":"6","totalCount":4,"unassignedCount":4}, 
"Bacteroidota":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Bacteroidota"]],"rank":"phylum","taxID":"4","totalCount":2,"unassignedCount":2},
"Nitrospirae":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Nitrospirae"]],"rank":"phylum","taxID":"8","totalCount":6,"unassignedCount":6},
"Cyanobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Cyanobacteria"]],"rank":"phylum","taxID":"7","totalCount":5,"unassignedCount":5},  
"Proteobacteria":{"lineageNames":[["superkingdom","Bacteria"],["phylum","Proteobacteria"]],"rank":"phylum","taxID":"9","totalCount":7,"unassignedCount":7}, 
"Viruses":{"lineageNames":[["superkingdom","Viruses"]],"rank":"superkingdom","taxID":"10","totalCount":24,"unassignedCount":24}}`);