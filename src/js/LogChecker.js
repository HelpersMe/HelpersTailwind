const Profiles = document.getElementById('Profiles')
const Logs = document.getElementById('Logs')

const Result = document.getElementById('result')
const All = document.getElementById('All')

const connected = document.getElementById('connected')
const maxExecutionTime = document.getElementById('maxExecutionTime')
const accountRestricted = document.getElementById('accountRestricted')
const captchaVerification = document.getElementById('captchaVerification')
const wrongPassword = document.getElementById('wrongPassword')
const phoneNumber = document.getElementById('phoneNumber')
const unusualActivity = document.getElementById('unusualActivity')
const others = document.getElementById('others')
const accountDisabled = document.getElementById('accountDisabled')
const proxyDown = document.getElementById('proxyDown')
const notLogs = document.getElementById('notLogs')

const totalConnected = document.getElementById('totalConnected')
const totalProxyDown = document.getElementById('totalProxyDown')
const totalMaxExecutionTime = document.getElementById('totalMaxExecutionTime')
const totalAccountRestricted = document.getElementById('totalAccountRestricted')
const totalCaptchaVerification = document.getElementById('totalCaptchaVerification')
const totalWrongPassword = document.getElementById('totalWrongPassword')
const totalPhoneNumber = document.getElementById('totalPhoneNumber')
const totalUnusualActivity = document.getElementById('totalUnusualActivity')
const totalAccountDisabled = document.getElementById('totalAccountDisabled')
const totalNotLog = document.getElementById('totalNotLog')
const totalOthers = document.getElementById('totalOthers')

connectedProfiles = []
maxExecutionTimeProfiles = []
accountRestrictedProfiles = []
captchaVerificationProfiles = []
wrongPasswordProfiles = []
phoneNumberProfiles = []
unusualActivityProfiles = []
othersProfiles = []
accountDisabledProfiles = []
proxyDownProfiles = []
notLogsProfiles = []

function checker(){
	Result.removeAttribute('style')
	All.removeAttribute('style')
	const profilesValue = Profiles.value
	const logsValue = Logs.value

	profilesArr = getArraySplited(profilesValue,"\n")
	logsArr = getArraySplited(logsValue,"\n")

	if (profilesArr.length - logsArr.length > 0) {
		alert('profiles numbre > logs numbre')
	} else if (profilesArr.length - logsArr.length < 0) {
		alert('profiles numbre < logs numbre')
	} else {
		for (var i = 0; i < logsArr.length; i++) {
			log = logsArr[i]
			log = log.toLowerCase()
			
			if (log == '') {
				notLogsProfiles.push(profilesArr[i])
			} else if (log == 'matched') {
				connectedProfiles.push(profilesArr[i])
			} else if (log.split("proxy down").length>1 && log.split("proxy down")[log.split("proxy down").length-1] == '') {
				proxyDownProfiles.push(profilesArr[i])
			} else {
				logArr = getArraySplited(log, "update_status : ")
				log = logArr[logArr.length-1]
				logArr = getArraySplited(log," ; ")
				log = logArr[logArr.length-1]
				
				switch (log) {
					case "connected":
						connectedProfiles.push(profilesArr[i])
						break;
					case "active":
						connectedProfiles.push(profilesArr[i])
						break;
					case "matched":
						connectedProfiles.push(profilesArr[i])
						break;
					case "max_execution_time":
						maxExecutionTimeProfiles.push(profilesArr[i])
						break;
					case "account_restricted":
						accountRestrictedProfiles.push(profilesArr[i])
						break;
					case "captcha_verification":
						captchaVerificationProfiles.push(profilesArr[i])
						break;
					case "wrong_password":
						wrongPasswordProfiles.push(profilesArr[i])
						break;
					case "phone_number":
						phoneNumberProfiles.push(profilesArr[i])
						break;
					case "unusual_activity":
						unusualActivityProfiles.push(profilesArr[i])
						break;
					case "account_disabled":
						accountDisabledProfiles.push(profilesArr[i])
						break;
					case "proxy down":
						proxyDownProfiles.push(profilesArr[i])
						break;
					case "others":
						othersProfiles.push(profilesArr[i])
						break;
					default:
						othersProfiles.push(profilesArr[i])
						break;
				}
			}
		}
		
		connected.value=arrayToString(connectedProfiles)
		maxExecutionTime.value=arrayToString(maxExecutionTimeProfiles)
		accountRestricted.value=arrayToString(accountRestrictedProfiles)
		captchaVerification.value=arrayToString(captchaVerificationProfiles)
		wrongPassword.value=arrayToString(wrongPasswordProfiles)
		phoneNumber.value=arrayToString(phoneNumberProfiles)
		unusualActivity.value=arrayToString(unusualActivityProfiles)
		others.value=arrayToString(othersProfiles)
		accountDisabled.value=arrayToString(accountDisabledProfiles)
		proxyDown.value=arrayToString(proxyDownProfiles)
		notLogs.value=arrayToString(notLogsProfiles)

		totalConnected.innerText = connectedProfiles.length
		totalMaxExecutionTime.innerText = maxExecutionTimeProfiles.length
		totalAccountRestricted.innerText = accountRestrictedProfiles.length
		totalCaptchaVerification.innerText = captchaVerificationProfiles.length
		totalWrongPassword.innerText = wrongPasswordProfiles.length
		totalPhoneNumber.innerText = phoneNumberProfiles.length
		totalUnusualActivity.innerText = unusualActivityProfiles.length
		totalOthers.innerText = othersProfiles.length
		totalAccountDisabled.innerText = accountDisabledProfiles.length
		totalProxyDown.innerText = proxyDownProfiles.length
		totalNotLog.innerText = notLogsProfiles.length
	}
}

function copyFromThis(fromThis) {
	if (fromThis == "connected") {
		copyToClipboard(connected)
	} else if (fromThis == "maxExecutionTime") {
		copyToClipboard(maxExecutionTime)
	} else if (fromThis == "accountRestricted") {
		copyToClipboard(accountRestricted)
	} else if (fromThis == "captchaVerification") {
		copyToClipboard(captchaVerification)
	} else if (fromThis == "wrongPassword") {
		copyToClipboard(wrongPassword)
	} else if (fromThis == "phoneNumber") {
		copyToClipboard(phoneNumber)
	} else if (fromThis == "unusualActivity") {
		copyToClipboard(unusualActivity)
	} else if (fromThis == "others") {
		copyToClipboard(others)
	} else if (fromThis == "accountDisabled") {
		copyToClipboard(accountDisabled)
	} else if (fromThis == "proxyDown") {
		copyToClipboard(proxyDown)
	} else if (fromThis == "notLogs") {
		copyToClipboard(notLogs)
	}
}

function downloadToExel(fromThis) {
	if (fromThis == "connected") {
		createExcel("connected", connectedProfiles)
	} else if (fromThis == "maxExecutionTime") {
		createExcel("maxExecutionTime", maxExecutionTimeProfiles)
	} else if (fromThis == "accountRestricted") {
		createExcel("accountRestricted", accountRestrictedProfiles)
	} else if (fromThis == "captchaVerification") {
		createExcel("captchaVerification", captchaVerificationProfiles)
	} else if (fromThis == "wrongPassword") {
		createExcel("wrongPassword", wrongPasswordProfiles)
	} else if (fromThis == "phoneNumber") {
		createExcel("phoneNumber", phoneNumberProfiles)
	} else if (fromThis == "unusualActivity") {
		createExcel("unusualActivity", unusualActivityProfiles)
	} else if (fromThis == "others") {
		createExcel("others", othersProfiles)
	} else if (fromThis == "accountDisabled") {
		createExcel("accountDisabled", accountDisabledProfiles)
	} else if (fromThis == "proxyDown") {
		createExcel("proxyDown", proxyDownProfiles)
	} else if (fromThis == "notLogs") {
		createExcel("notLogs", notLogsProfiles)
	} else {
		dataArray={}
		if (connectedProfiles.length!=0) {
			dataArray["connectedProfiles"] = connectedProfiles;
		}
		if (maxExecutionTimeProfiles.length!=0) {
			dataArray["maxExecutionTimeProfiles"] = maxExecutionTimeProfiles;
		}
		if (accountRestrictedProfiles.length!=0) {
			dataArray["accountRestrictedProfiles"] = accountRestrictedProfiles;
		}
		if (captchaVerificationProfiles.length!=0) {
			dataArray["captchaVerificationProfiles"] = captchaVerificationProfiles;
		}
		if (wrongPasswordProfiles.length!=0) {
			dataArray["wrongPasswordProfiles"] = wrongPasswordProfiles;
		}
		if (phoneNumberProfiles.length!=0) {
			dataArray["phoneNumberProfiles"] = phoneNumberProfiles;
		}
		if (unusualActivityProfiles.length!=0) {
			dataArray["unusualActivityProfiles"] = unusualActivityProfiles;
		}
		if (othersProfiles.length!=0) {
			dataArray["othersProfiles"] = othersProfiles;
		}
		if (accountDisabledProfiles.length!=0) {
			dataArray["accountDisabledProfiles"] = accountDisabledProfiles;
		}
		if (proxyDownProfiles.length!=0) {
			dataArray["proxyDownProfiles"] = proxyDownProfiles;
		}
		if (notLogsProfiles.length!=0) {
			dataArray["notLogsProfiles"] = notLogsProfiles;
		}
		createExcel("AllLog", dataArray)	
	}
}