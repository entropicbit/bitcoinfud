function fromHexString(str) {
      if (str.length % 2 !== 0 || !/^[0-9a-f]+$/i.test(str)) {
        return null;
      }
      let buffer = new Uint8Array(str.length / 2);
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] = parseInt(str.substr(2 * i, 2), 16);
      }
      return buffer;
}

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
		let buffer = fromHexString(key);
		let npub = bech32.encode('npub', buffer, "bech32");

		output +=	`
					<div onclick="window.open('https://snort.social/p/${npub}')" class="row">
					<span class="name"><i class="fa-solid fa-user-plus"></i> ${name}@nostr.haus</span><br />
					<span class=\"key\"> ${npub} </span>
					</div>
					`
	}
	
	document.querySelector("#list").innerHTML = output;
}