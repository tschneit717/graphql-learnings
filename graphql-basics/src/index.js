import myCurrLocation, { name, message, getGreeting } from './myModule.js'
import string, { doMathSub, doMathSum } from './chal.js'
console.log(message, myCurrLocation, name)
console.log(getGreeting(name))

console.log(doMathSub(1, 3))
console.log(doMathSum(1, 3))
