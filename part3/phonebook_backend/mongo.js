const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Please provide password as argument: node mongo.js <password>')
	process.exit(1)
}
if (process.argv.length > 5) {
	console.log('If you want to add a contact with more than one name please put name in quatation marks: node monngo.js <password> <"name nameson"> <number>')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.lq2d98r.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})


const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]

if (process.argv.length === 3) {
	mongoose.connect(url)

	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(person)
		})
		mongoose.connection.close()
	})
}
else {
	mongoose
		.connect(url)
		.then((result) => {
			console.log('connected')

			const person = new Person({
				name: name,
				number: number
			})

			return person.save()
		})
		.then(() => {
			console.log('person saved')
			return mongoose.connection.close()
		})
		.catch((err) => console.log(err))
}