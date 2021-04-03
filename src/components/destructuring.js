const person = {
  name: 'Danilo',
  age: 27,
  location: {
    city: 'João Pessoa',
    temp: 30
  }
}

const { name, age } = person

// console.log(`${name} is ${age}`)

const { city, temp } = person.location

// console.log(`Cidade: ${city} ; Temperatura ${temp}`)
