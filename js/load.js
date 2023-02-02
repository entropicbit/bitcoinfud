async function load() {
	let url = 'https://nostr.haus/.well-known/nostr.json';
	let obj;
	let plebs;

	try {
		const obj = await (await fetch(url)).json();
		plebs = obj.names;
		console.log(plebs);
	} catch(err) {
		console.log('Couldn\'t load list: ' + err);
	}

	let output;
	let names = Object.keys(plebs);
	let keys = Object.values(plebs);

	names.forEach((name) => {
		output += "<span class=\"name\">" + name + "@nostr.haus</span><br />";
		output += "<span class=\"key\">" + keys[name][0] + "</span>";
	});

	console.log(output);
	
	document.getElementById('list').innerHTML = output;
}

load();