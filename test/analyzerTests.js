
var assert = require('chai').assert;
var expect = require('chai').expect;
var wiktParser = require('../');
var path = require('path');
var fs = require('fs');


describe('wiktionary parser', function() {

  describe('parses "test"', function () {
  	var r = null;
  	before(function(done) {
      this.timeout(10000);
			var wikitext = fs.readFileSync(path.join(__dirname,"fixtures", "test.wiki"), {encoding:'utf8'});

      wiktParser.parse(wikitext, function(err, result) {
        r = result;
        done(err);
      });	  
    });

    it('should parse wiki', function () {
      expect(r).to.be.ok;
    });
    it('should have multiple languages', function() {
      expect(r).to.have.property("en");
      expect(r).to.have.property("br");
      expect(r).to.have.property("fro");
      expect(r).to.have.property("lld");
    });
    describe('parsed english word', function() {
    	var w = null;
    	before(function() {
    		w = r["en"];
    	});
    	it('should have 2 meanings', function() {
        expect(w.meanings).to.be.ok;
        expect(w.meanings.length).to.be.equal(2);
      });
    	describe('meaning 1', function() {
        var m = null;
        before(function() {
          m = r["en"].meanings[0];
        });
    		it('should have etymology', function() {
          expect(m).to.have.property("etymology");
        });
    		it('should have 2 roles', function() {
          expect(m).to.have.property("roles");
          expect(m.roles).to.be.ok;
          expect(m.roles.length).to.be.equal(2);
        });
        it('should have noun role');
        it('should have verb role');
    	});
    	describe('meaning 2', function() {
    		it('should have etymology');
    		it('should have noun role');
    		it('should have verb role');
    	});



    })
  });

  describe('parses "sample"', function () {
  	var r = null;
  	before(function(done) {
			var wikitext = fs.readFileSync(path.join(__dirname,"fixtures", "sample.wiki"), {encoding:'utf8'});

      wiktParser.parse(wikitext, function(err, result) {
        r = result;
        done(err);
      });   
    });

    it('should parse wiki', function () {
      expect(r).to.be.ok;
    });
    describe('parsed english word', function() {
    	var w = null;
    	before(function() {
    		w = r["en"];
    	});
    	it('should have 1 meaning', function() {
        expect(w.meanings).to.be.ok;
        expect(w.meanings.length).to.be.equal(1);
      });
    	describe('meaning 1', function() {
        var m = null;
        before(function() {
          m = w.meanings[0];
        });
        it('should have proper etymology', function() {
          expect(m.etymology).to.be.ok;
          expect(m.etymology).to.have.property('from');
          expect(m.etymology.from).to.eql([ 
                [ 'enm', 'sample' ],
                [ 'enm', 'asaumple' ],
                [ 'fro', 'essample' ],
                [ 'la', 'exemplum' ] ]);
        }); 

    		it('should have noun role', function() {
          expect(m).to.be.ok;
          var r = m.roles[0];
          expect(r).to.be.ok;
          expect(r.role).to.be.equal("noun");
        });
      });
    });
  });
});
