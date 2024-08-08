const Drops = document.getElementById('Drops')
const Entity = document.getElementById('Entity')
const Rdps = document.getElementById('Rdps')
const Seperateur = document.getElementById('Seperateur')

const RdpsInEntity = document.getElementById('RdpsInEntity')
const AllDivisuerRdpsInEntity = document.getElementById('AllDivisuerRdpsInEntity')

function Diviseur(id) {
    const result_cheker = document.getElementById(`result_${id}`)
    result_cheker.removeAttribute("style")

    if (result_cheker != null) {
        result_cheker.innerHTML = ''
    }

	const Profiles = document.getElementById(`Profiles_${id}`)
	const All = document.getElementById(`All_${id}`)
	const profilesValue = Profiles.value
	const allValue = All.value
	const dropsValue = Drops.value

	if (profilesValue == '' || allValue == '' || id == '') {
		alert("Empty inputs / textarea")
	} else {
		var profilesArr = getArraySplited(profilesValue,"\n")
		var allArr = getArraySplited(allValue,"\n")

		var sortAll = []

		for (var i = 0; i < allArr.length; i++) {
			var profileTag = allArr[i]
			var profilesTagArr = getArraySplited(profileTag,"\t")
			sortAll.push(profilesTagArr)
		}

		const filteredArr = sortAll.filter(item => profilesArr.includes(item[0]));

	    const profilesArray = [];
	    const tagsArray = [];

	    filteredArr.forEach(item => {
	        profilesArray.push(item[0]);
	        tagsArray.push(item[1]);
	    });

	    var profilesArrayDivised = splitArrayIntoSubarrays(profilesArray,dropsValue)
	    var tagsArrayDivised = splitArrayIntoSubarrays(tagsArray,dropsValue)

	    for (var i = 0; i < dropsValue; i++) {
	    	innerHtmlMulti(i,id,arrayToString(profilesArrayDivised[i]),"Profiles")
	    	innerHtmlMulti(i,id,arrayToString(tagsArrayDivised[i]),"Tags")
	    }
	   	
	}
}	

Drops.addEventListener('input', function() {
    const inputValue = Drops.value;

    if (inputValue<1) {
    	Drops.value = 1
    }
});

Rdps.addEventListener('input', function() {
    const inputValue = Rdps.value;
    if (inputValue<1) {
    	Rdps.value = 1
    }
    entityValue = Entity.value
    if (entityValue == '') {
    	alert('Enter Name Of Entity')
    } else {
    	rdpsValue = Rdps.value
    	RdpsInEntity.innerHTML = ''
        AllDivisuerRdpsInEntity.innerHTML = ""
   	    for (var i = 0; i < rdpsValue; i++) {
	    	innerHTMLRdps(entityValue,i)
	    }
    }
});

function innerHtmlMulti(numberOfDepot,id,value,type) {
	const ResultId = document.getElementById(`result_${id}`)
	numberOfDepot++
	const inner = `<div>
                        <label class="flex items-center justify-between text-sm font-medium text-gray-700" for="${id}_${numberOfDepot}_${type}">
                            ${id} Depot ${numberOfDepot}: ${type}
                            <span class="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600" onclick="copyFromThis('${id}_${numberOfDepot}_${type}')">
                                Copy
                            </span>
                            <i class="fa fa-download px-2 py-1 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600" onclick="downloadToTxt('${id}_${numberOfDepot}_${type}','${numberOfDepot}')"></i>
                        </label>
                        <textarea class="resize-none w-full p-2 border border-gray-300 rounded mt-2 bg-gray-100 text-gray-700" readonly="readonly" id="${id}_${numberOfDepot}_${type}">${value}</textarea>
                    </div>`
	ResultId.innerHTML += inner 
}
function innerHTMLRdps(entityName, numberOfRdp) {
	numberOfRdp++
	const innerBtn = `<div class="flex items-center space-x-2">
        <i class="fa fa-desktop"></i>
		<button type="button" onclick="show('${entityName}_RDP${numberOfRdp}')" id="show_${entityName}_RDP${numberOfRdp}">${entityName} Rdp${numberOfRdp}</button>
	</div>`
	const innerDiviser = `<div class="AllDivisuerRdpsInEntity" id="${entityName}_RDP${numberOfRdp}" style="display: none !important;">
		<h3 class="text-1xl text-center font-bold tracking-tight text-gray-900 sm:text-2xl md:text-3xl p-3">
            <span class="block">
                <span class="text-transparent bg-clip-text bg-gradient-to-tr to-pink-500 from-purple-500">
                    ${entityName} RDP${numberOfRdp}
                </span>
            </span>
        </h3>
        <div class="flex flex-col items-center gap-3 p-4 bg-white rounded-lg shadow-md">
            <div class="flex gap-3">
                <div class="flex flex-col">
                    <label for="Profiles_${entityName}_RDP${numberOfRdp}" class="text-sm font-medium text-gray-700">Profiles Connected</label>
                    <textarea class="resize-none mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" placeholder="Leave a Profiles Connected here" id="Profiles_${entityName}_RDP${numberOfRdp}"></textarea>
                </div>

                <div class="flex flex-col">
                    <label for="All_${entityName}_RDP${numberOfRdp}" class="text-sm font-medium text-gray-700">All Profiles + All Tags</label>
                    <textarea class="mt-1 p-2 resize-none border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" placeholder="Leave a All Profiles + All Tags here" id="All_${entityName}_RDP${numberOfRdp}"></textarea>
                </div>
            </div>
            <button type="button" onclick="Diviseur('${entityName}_RDP${numberOfRdp}')" id="diviseur_${entityName}_RDP${numberOfRdp}" class="w-1/4 px-4 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Diviseur
            </button>
        </div>
		<div class="overflow-y-auto flex flex-wrap h-full w-58.1p items-center gap-3 p-4 bg-white rounded-lg shadow-md" id="result_${entityName}_RDP${numberOfRdp}" style="display:none !important;"></div>
	</div>`
	RdpsInEntity.innerHTML += innerBtn 
	AllDivisuerRdpsInEntity.innerHTML += innerDiviser 
}
function splitArrayIntoSubarrays(arr, divisor) {
    const result = [];
    const len = arr.length;
    const subarraySize = Math.floor(len / divisor);
    let startIndex = 0;

    for (let i = 0; i < divisor - 1; i++) {
        const endIndex = startIndex + subarraySize;
        result.push(arr.slice(startIndex, endIndex));
        startIndex = endIndex;
    }

    // Push the remaining elements into the last subarray
    result.push(arr.slice(startIndex));

    return result;
}
function copyFromThis(id){
	const textarea = document.getElementById(id)
	copyToClipboard(textarea)
}
function downloadToTxt(id,numberOfDepot) {
	const textarea = document.getElementById(id)
	textareaValue = textarea.value
	textareaArray = getArraySplited (textareaValue, '\n')
    const content = textareaArray.join(";");		
    fileName = `file_${numberOfDepot}.txt`
	downloadFile(content, fileName, "text/plain");
}

function show(id) {
	const AllDivisuerRdpsInEntityByCN = document.getElementsByClassName('AllDivisuerRdpsInEntity')
	const DivisuerRdpInEntity = document.getElementById(id)

	for (var i = 0; i < AllDivisuerRdpsInEntityByCN.length; i++) {
		AllDivisuerRdpsInEntityByCN[i].setAttribute('style','display: none !important')
	}
	DivisuerRdpInEntity.removeAttribute('style')
}

function generateZip() {
    const entityName = Entity.value;
    const dropsValue = Drops.value;
    const rdpsValue = Rdps.value;
    const separatorValue = Seperateur.value;

    textareasContents = [];

    // Loop through drops and rdps to gather textarea contents
    for (let i = 0; i < dropsValue; i++) {
        let textareaContent = '';
        for (let j = 0; j < rdpsValue; j++) {
            const textarea = document.getElementById(`${entityName}_RDP${j + 1}_${i + 1}_Tags`);
            const textareaValue = textarea.value;
            const textareaValueArr = textareaValue.split("\n");
            const textareaContentJoined = textareaValueArr.join(separatorValue);
            textareaContent += textareaContentJoined + separatorValue;
        }
		file = { 
			name: `file_${i+1}.txt`, 
			content: textareaContent
		}
		textareasContents.push(file)
    }

	// Créer une nouvelle instance de JSZip
    const zip = new JSZip();

    // Ajouter chaque fichier au zip avec le contenu spécifié
    textareasContents.forEach(file => {
        zip.file(file.name, file.content.replace(/\\n/g, '\n'));
    });

    // Générer le fichier zip et le déclencher pour téléchargement
    zip.generateAsync({ type: "blob" })
        .then(function(content) {
            // Créer un lien pour le téléchargement
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = `${entityName}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
}

function getProfiles() {
 	const entityName = Entity.value;
    const dropsValue = Drops.value;
    const rdpsValue = Rdps.value;

    textareasContents = [];

    // Loop through drops and rdps to gather textarea contents
    for (let i = 0; i < rdpsValue; i++) {
        let textareaContentRdp = []
        for (let j = 0; j < dropsValue; j++) {
            const textarea = document.getElementById(`${entityName}_RDP${i + 1}_${j + 1}_Profiles`);
            const textareaValue = textarea.value;
            textareaContentRdp.push(textareaValue)
        }
        textareasContents.push(textareaContentRdp)
    }
    let rdps = ""

    for (var i = 0; i < textareasContents.length; i++) {
        array = textareasContents[i]
        rdps += `RDP${i + 1}` + '\t'
    }
    rdps += "\n"


    const maxColumns = Math.max(...textareasContents.map(row => row.length));
    const transformedArray = Array.from({ length: maxColumns }, () => []);

    let index = 0;
    let result = [];
    while (index < textareasContents[0].length) {
        textareasContents.forEach((row, i) => {
            if (!result[i]) {
                result[i] = [];
            }
            result[i].push(row[index]);
        });
        index++;
    }

    for (let i = 0; i < result.length; i++) {
        result[i] = result[i].join('\n\n').split('\n');
    }

    let max = result[0].length;
    for (let i = 1; i < result.length; i++) {
        if (result[i].length > max) {
            max = result[i].length;
        }
    }

    index = 0;
    let result2 = [];
    while (index < max) {
        result.forEach((row, i) => {
            if (!result2[i]) {
                result2[i] = [];
            }
            result2[i].push(row[index]);
        });
        index++;
    }

    let profilesByDrop = fusionnerTableaux(result2)

    let allData = rdps + profilesByDrop;

    // Create a Blob from the data
    let blob = new Blob([allData], { type: 'text/csv' });

    // Create a download link
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${entityName}_profiles_drop.xls`;  // Set desired file name here
    link.style.display = 'none';
    document.body.appendChild(link);

    // Trigger the download by simulating a click on the link
    link.click();

    // Clean up
    document.body.removeChild(link);
}