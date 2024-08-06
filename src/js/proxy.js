const Profiles = document.getElementById('Profiles')
const Proxys = document.getElementById('Proxys')

const Result = document.getElementById('result')

const updateProxys = document.getElementById('updateProxys')

function copyProxy() {
	copyToClipboard(updateProxys)
}
function GenerateSyntax() {

	const profilesValue = Profiles.value
	const proxysValue = Proxys.value

	profilesArr = getArraySplited(profilesValue,"\n")
	proxysArr = getArraySplited(proxysValue,"\n")


	if (profilesArr.length - proxysArr.length > 0) {
		alert('profiles numbre > proxys numbre')
	} else if (profilesArr.length - proxysArr.length < 0) {
		alert('profiles numbre < proxys numbre')
	} else {
		Result.removeAttribute('style')
		string = ""
		for (var i = 0; i < proxysArr.length; i++) {
			profile=profilesArr[i]
			profile=getArraySplited(profile,"\t")[0]
			proxy=proxysArr[i]
			proxy=getArraySplited(proxy,":")[0]
			oneProxySyntax = profile+","+proxy
			if (i == proxysArr.length-1) {
				string += oneProxySyntax
			} else {
				string += oneProxySyntax + "\n"
			}
		}
		updateProxys.value = string
	}
}