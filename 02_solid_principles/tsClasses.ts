interface I {
  print(): void
  fax(): void
}

class C implements I {
  public doc: string
  constructor(doc: string) {
    this.doc = doc
  }
  print(): void {
    console.log('printing')
    console.log(this.doc)
  }
  fax(): void {
      console.log('sending')
  }
}

const doc = 'this is the content'
const c = new C(doc);

c.print()
c.fax()