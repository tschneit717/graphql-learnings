// named export - has a name, have as many as needed
// default export - no name, only one

const message = 'Some message from myModule.js'
const name = 'Tom'

const location = 'Ohio'
const getGreeting = (name) => {
    return `Hello there, ${name}`
}

export { message, name, getGreeting, location as default }