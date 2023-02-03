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

	let output = "";
	for (const name in plebs) {
		let key = plebs[name];

		output +=
			`
			<div class="row">
			<span class="name"> ${name}@nostr.haus</span><br />
			<span class=\"key\"> ${key} </span>
			</div>
			`
	}

	//console.log(output);
	
	document.getElementById('list').innerHTML = output;
}