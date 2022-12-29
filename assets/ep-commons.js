function getInstallUrl() {
	let parceiros = {};
	let parceiro = "unknown";

	parceiro = "everydaypuzzles";
	parceiros[parceiro] = {};
	parceiros[parceiro]["portal"] = "https://everydaypuzzlesweb.onelink.me/fxHc/0awmdk1g";
	parceiros[parceiro]["hashtag"] = "https://everydaypuzzlesweb.onelink.me/fxHc/z34kwm1l";
	parceiros[parceiro]["tangle"] = "https://everydaypuzzlesweb.onelink.me/fxHc/cjbbhmsm";
	parceiros[parceiro]["sudoku"] = "https://everydaypuzzlesweb.onelink.me/fxHc/kc7547fz";
	parceiros[parceiro]["password"] = "https://everydaypuzzlesweb.onelink.me/fxHc/v8bova33";
	parceiros[parceiro]["crossword"] = "https://everydaypuzzlesweb.onelink.me/fxHc/sw1keunu";
	parceiros[parceiro]["crossword-mini"] = "https://everydaypuzzlesweb.onelink.me/fxHc/swr9zio7";
	parceiros[parceiro]["search"] = "https://everydaypuzzlesweb.onelink.me/fxHc/k1cyx38d";

	parceiro = "xxxxxxxxxxxxxxx";
	parceiros[parceiro] = {};
	parceiros[parceiro]["portal"] = parceiro + "-portal";
	parceiros[parceiro]["hashtag"] = parceiro + "-hashtag";
	parceiros[parceiro]["tangle"] = parceiro + "-tangle";
	parceiros[parceiro]["sudoku"] = parceiro + "-sudoku";
	parceiros[parceiro]["password"] = parceiro + "-password";
	parceiros[parceiro]["crossword"] = parceiro + "-crossword";
	parceiros[parceiro]["crossword-mini"] = parceiro + "-crossword-mini";
	parceiros[parceiro]["search"] = parceiro + "-search";

	let url = window.location.href;

	for (let p in parceiros) {
		if (url.indexOf(p) == -1)
			continue;

		for (let g in parceiros[p]) {
			if (url.indexOf("/g/" + p + "/") == -1)
				continue;

			return parceiros[p][g];
		}

		return parceiros[p]["portal"];
	}

	return "ERRO";
}

// incluir a linha abaixo para o script funcionar
// https://davidshimjs.github.io/qrcodejs/
// <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
function fillInstallQrcode(elementId) {
	let url = getInstallUrl();
	new QRCode(elementId, {
		text: url,
		width: 128,
		height: 128
	});
}

function getGameLang() {
	let lang = window.localStorage.getItem("ep_lang");

	if (!lang)
		lang = _urlLang();

	if (!lang)
		lang = _browserLang();

	lang = _validLangOrDefault(lang);
	setGameLang(lang);
	return lang;
}

function setGameLang(lang) {
	if (lang != _validLangOrDefault(lang))
		return;

	window.localStorage.setItem("ep_lang", lang);
}

// internal functions

function _validLangOrDefault(lang) {
	lang = lang.toLowerCase();

	let langs = _allLangs();

	if (langs.includes(lang))
		return lang;

	return "en";
}

function _urlLang() {
	let langByUrl = {};
	langByUrl["everydaypuzzles"] = "en";
	langByUrl["desafiosdiarios"] = "pt";
	langByUrl["taglichesratsel"] = "de";

	for (let url in langByUrl) {
		if (window.location.hostname.indexOf(url) != -1)
			return langByUrl[url];
	}

	return "";
}

function _browserLang() {
	let langs = _allLangs();

	let navLang = navigator.language.substring(0, 2).toLowerCase();
	if (langs.includes(navLang))
		return navLang;

	return "";
}

function _allLangs() {
	return ["en", "pt", "de"];
}