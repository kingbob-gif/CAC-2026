readline = require(`readline`).createInterface({
	input: process.stdin,
	output: process.stdout
});
let ans = null
let prob0 = null
let prob1 = null
function check(x, func) {
	if (isNaN(x)) {
		return readline.question(`please enter a valid number\nyou may have included a symbol ex. N for newtons or J for joules\n`, func)
	}
}

function tunnel() {
	readline.question(`what is the mass of your particle in kg's\n`, function askMass(m) {
		m = Number(m)

		check(m, askMass)

		readline.question(`what is the particle's energy in J's\n`, function askEnergy(E) {
			E = Number(E)

			check(E, askEnergy)

			readline.question(`what is your particle's potential barrier height in joules\n`, function askBarrHeight(V0) {
				V0 = Number(V0)

				if (E > V0) {
					console.log(`0%`)
					dec()
				}

				check(V0, askBarrHeight)

				readline.question(`what is your particles barrier width in meters\n`, function askBarrWid(a) {
					a = Number(a)

					check(a, askBarrWid)

					readline.question(`what is the reduced Planck constant in joules times seconds\n`, function askPlanck(h) {
						h = Number(h)

						check(h, askPlanck)

						if (!isNaN(h)) {
							k = (Math.sqrt((2 * m) * (V0 - E))) / h
							T = Math.E ** (-2 * k * a)
							console.log(`${eval(T * 100)}%`)
							dec()
						}
					});
				});
			});
		});
	});
}

function entangle() {
	readline.question(`what is the amplitude of state 00\n`, function ask00(s00) {
		s00 = Number(s00)

		check(s00, ask00)

		readline.question(`what is the amplitude of state 01\n`, function ask01(s01) {
			s01 = Number(s01)

			check(s01, ask01)

			readline.question(`what is the amplitude of state 10\n`, function ask10(s10) {
				s10 = Number(s10)

				check(s10, ask10)

				readline.question(`what is the amplitude of state 11\n`, function ask11(s11) {
					s11 = Number(s11)

					check(s11, ask11)

					readline.question(`what is the measurement of particle A, 1 or 0\n`, function askMes(A) {
						A = Number(A)

						if (A !== 1 && A !== 0) {
							return readline.question(`please enter a 1 or 0\n`, askMes)
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

function wave() {
	readline.question(`what is the initial wave function (real part)\nnumber will automatically be divided by the square root of 2\n`, function askFuncReal(wavR) {
		wavR = Number(wavR / Math.sqrt(2))

		check(wavR, askFuncReal)

		readline.question(`what is the initial wave function (imaginary)\nnumber will automatically be divided by the square root of 2\n`, function askFuncImag(wavI) {
			wavI = Number(wavI / Math.sqrt(2))

			check(wavI, askFuncImag)

			readline.question(`what is the reduced planck constant in joules times seconds\n`, function askPl(h) {
				h = Number(h)

				check(h, askPl)

				readline.question(`what is the particles energy in joules\n`, function askE(E) {
					E = Number(E)

					check(E, askE)

					readline.question(`what time do you want to evaluate the wavefunction at in seconds\n`, function askTime(time) {
						time = Number(time)

						check(time, askTime)

						if (!isNaN(time)) {
							theta = (E * time) / h
							console.log(`real = ${eval((wavR * Math.cos(theta)) + (wavI * Math.sin(theta)))}\nimaginary = ${eval((wavI * Math.cos(theta)) - (wavR * Math.sin(theta)))}`)
							dec()
						}
					});
				});
			});
		});
	});
}

function dec() {
	readline.question(`would you like to\n1: determine chance of quantum tunneling\n2: measure an entangled particle\n3: evaluate the evolution of a wave function\n`, (choice) => {
		choice = Number(choice)

		console.clear()

		if(isNaN(choice) || choice < 1 || choice > 3) {
			console.log(`please enter a valid number`)
			return dec()
		} else if (choice === 1) {
			console.clear()
			tunnel()
		} else if (choice === 2) {
			console.clear()
			entangle()
		} else if (choice === 3) {
			console.clear()
			wave()
		}
	});
}
console.clear()
dec()
