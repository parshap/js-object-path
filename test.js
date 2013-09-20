var expect = require('chai').expect,
  objectPath = require('./index.js');


function getTestObj() {
  return {
    a: "b",
    b: {
      c: [],
      d: ["a", "b"],
      e: [{},{f: "g"}],
      f: "i"
    }
  };
}

describe('get', function() {
  it('should return the value under shallow object', function() {
    expect(objectPath.get(getTestObj(), "a")).to.be.equal("b");
  });

  it('should return the value under deep object', function() {
    expect(objectPath.get(getTestObj(), "b.f")).to.be.equal("i");
  });

  it('should return the value under array', function() {
    expect(objectPath.get(getTestObj(), "b.d.0")).to.be.equal("a");
  });

  it('should return the value under array deep', function() {
    expect(objectPath.get(getTestObj(), "b.e.1.f")).to.be.equal("g");
  });

  it('should return undefined for missing values under object', function() {
    expect(objectPath.get(getTestObj(), "a.b")).to.not.exist;
  });

  it('should return undefined for missing values under array', function() {
    expect(objectPath.get(getTestObj(), "b.d.5")).to.not.exist;
  });
});


describe('set', function() {
  it('should set value under shallow object', function() {
    var obj = getTestObj();
    objectPath.set(obj, "c", {m: "o"});
    expect(obj).to.have.deep.property("c.m", "o");
  });

  it('should set value under deep object', function() {
    var obj = getTestObj();
    objectPath.set(obj, "b.c", "o");
    expect(obj).to.have.deep.property("b.c", "o");
  });

  it('should set value under array', function() {
    var obj = getTestObj();
    objectPath.set(obj, "b.e.1.g", "f");
    expect(obj).to.have.deep.property("b.e.1.g", "f");
  });

  it('should create intermediate objects', function() {
    var obj = getTestObj();
    objectPath.set(obj, "c.d.e.f", "l");
    expect(obj).to.have.deep.property("c.d.e.f", "l");
  });

  it('should create intermediate arrays', function() {
    var obj = getTestObj();
    objectPath.set(obj, "c.0.1.m", "l");
    expect(obj).to.have.deep.property("c.0.1.m", "l");
  });
});


describe('push', function() {
  it('should push value to existing array', function() {
    var obj = getTestObj();
    objectPath.push(obj, "b.c", "l");
    expect(obj).to.have.deep.property("b.c.0", "l");
  });

  it('should push value to new array', function() {
    var obj = getTestObj();
    objectPath.push(obj, "b.h", "l");
    expect(obj).to.have.deep.property("b.h.0", "l");
  });
});