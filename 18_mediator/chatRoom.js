class Person {
  constructor(name) {
    this.name = name;
    this.chatLog = [];
  }

  receive(sender, message) {
    let s = `${sender}: ${message}`;
    this.chatLog.push(s);
    console.log(`[${this.room.name}'s chat session] ${s}`);
  }

  say(message) {
    this.room.broadCast(this.name, message);
  }

  sayPrivately(destination, message) {
    this.room.message(this.name, destination, message);
  }
}

class ChatRoom {
  constructor(name = 'Unnamed') {
    this.people = [];
    this.name = name;
  }

  join(person) {
    let joinMsg = `${person.name} joins the chat`;
    this.broadCast('room', joinMsg)
    person.room = this;
    this.people.push(person);
    return this;
  }

  broadCast(source, message) {
    for (let person of this.people) {
      if (person.name !== source) person.receive(source, message);
    }
  }

  message(source, destination, message) {
    for (let person of this.people) {
      if (person.name === destination) person.receive(source, message);
    }
  }
}

let room = new ChatRoom();
let cr7 = new Person('Cristiano Ronaldo');
let wp9 = new Person('Wellington Paulista');
let ls11 = new Person('Luis Suarez');

room.join(cr7).join(ls11);

cr7.say('I am the best');
ls11.say('No, you are not. It is me.')

room.join(wp9);
wp9.say('Sorry. What were you talking about?')
