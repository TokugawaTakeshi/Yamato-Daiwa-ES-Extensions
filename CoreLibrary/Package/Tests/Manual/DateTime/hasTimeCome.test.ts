import { hasTimeCome } from "../../../Source";


console.log(hasTimeCome("2022-12-23T12:02"));
console.log(hasTimeCome("2022-12-23T12:03"));

console.log(new Date("2022-12-23T12:02").toISOString());
console.log(new Date("2022-12-23T12:02").toLocaleDateString());
console.log(new Date("2022-12-23T12:02").toLocaleTimeString());
console.log(new Date("2022-12-23T12:02").toLocaleString());
