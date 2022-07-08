class Mediator {
  // todo
  constructor() {
    this.participants = [];
  }

  join(participant) {
    participant.room = this;
    this.participants.push(participant);
  }

  broadcast(source, value) {
    for (let participant of this.participants) {
      if (participant !== source) participant.value += value;
    }
  }
}

class Participant {
  constructor(mediator) {
    // todo
    this._value = 0;
    mediator.join(this);
  }

  say(n) {
    // todo
    this.room.broadcast(this, n);
  }

  get value() { return this._value; }
  set value(newValue) { this._value = newValue; }
}

let mediator = new Mediator();
let p1 = new Participant(mediator);
let p2 = new Participant(mediator);
let p3 = new Participant(mediator);

p1.say(3);
p2.say(1);