readline = require(`readline`).createInterface({
	input: process.stdin,
	output: process.stdout
});
let ans = null
let prob0 = null
let prob1 = null
function tunnel() {
	readline.question(`what is the mass of your particle in kg's\n`, (m) => {
		m = Number(m)

		if (isNaN(m)) {
			console.clear()
			console.log(`please enter a number\nyou may have included "kg's" or "kilograms" in your response`)
			return tunnel()
		}

		readline.question(`what is the particle's energy in J's\n`, (E) => {
			E = Number(E)

			if (isNaN(E)) {
				console.clear()
				console.log(`please enter a number\nyou may have included "J's" or "joules" in your response`)
				return tunnel()
			}

			readline.question(`what is your particle's potential barrier height in joules\n`, (V0) => {
				V0 = Number(V0)

				if (E > V0) {
					console.log(`0%`)
					dec()
				}

				if (isNaN(V0)) {
					console.clear()
					console.log(`please enter a number\nyou may have included "J's" or "joules" in your response`)
					return tunnel()
				}

				readline.question(`what is your particles barrier width in meters\n`, (a) => {
					a = Number(a)

					if (isNaN(a)) {
						console.clear()
						console.log(`please enter a number you may have included "meters" or "m's" in your response`)
						return tunnel()
					}

					readline.question(`what is the reduced Planck constant in joules times seconds\n`, (h) => {
						h = Number(h)

						if (isNaN(h)) {
							console.clear()
							console.log(`please enter a number\nyou may have included "joules/J's" or "seconds/S's" in your response`)
							return tunnel()
						}

						k = (Math.sqrt((2 * m) * (V0 - E))) / h
						T = Math.E ** (-2 * k * a)
						ans = T * 100
						console.log(`${ans}%`)
						dec()
					});
				});
			});
		});
	});
}

function entangle() {
	readline.question(`what is the amplitude of state 00\n`, (s00) => {
		s00 = Number(s00)

		if (isNaN(s00)) {
			console.clear()
			console.log(`please enter a number`)
			return entangle()
		}

		readline.question(`what is the amplitude of state 01\n`, (s01) => {
			s01 = Number(s01)

			if (isNaN(s01)) {
				console.clear()
				console.log(`please enter a number`)
				return entangle()
			}

			readline.question(`what is the amplitude of state 10\n`, (s10) => {
				s10 = Number(s10)

				if (isNaN(s10)) {
					console.clear
					console.log(`please enter a number`)
					return entangle()
				}

				readline.question(`what is the amplitude of state 11\n`, (s11) => {
					s11 = Number(s11)

					if (isNaN(s11)) {
						console.clear()
						console.log(`please enter a number`)
						return entangle()
					}

					readline.question(`what is the measurement of particle A, 1 or 0\n`, (A) => {
						A = Number(A)

						if (A !== 1 && A !== 0) {
							console.clear()
							console.log(`please enter a number`)
							return entangle
						}

						if (A === 0) {
							prob0 = (s00 / (s00 + s01)) * 100
							prob1 = (s01 / (s00 + s01)) * 100
						}

						if (A === 1) {
							prob0 = (s10 / (s10 + s11)) * 100
							prob1 = (s11 / (s10 + s11)) * 100
						}

						console.log(`probablity of B = 0 | ${prob0}%\nprobablity of B = 1 | ${prob1}%`)
						dec()
					});
				});
			});
		});
	});
}
function dec() {
	readline.question(`would you like to\n1: determine chance of quantum tunneling\n2: measure an entangled particle\n`, (choice) => {
		choice = Number(choice)

		console.clear()

		if(isNaN(choice) || choice < 1 || choice > 2) {
			console.log(`please enter a valid number`)
			return dec()
		} else if (choice === 1) {
			console.clear()
			tunnel()
		} else if (choice === 2) {
			console.clear()
			entangle()
		}
	});
}
console.clear()
dec()
