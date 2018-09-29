class Person {
  constructor(cfg) {
    this.name = cfg.name;
  }
}

let person = new Person({
  name: 'wang'
});
const div = document.createElement('div');
div.innerHTML = person.name;
document.body.appendChild(div);
