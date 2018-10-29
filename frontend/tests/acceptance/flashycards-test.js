import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Flashycard', {
  beforeEach: function() {
    application = startApp();
    originalConfirm = window.confirm;
    window.confirm = function() {
      confirmCalledWith = [].slice.call(arguments);
      return true;
    };
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
    window.confirm = originalConfirm;
    confirmCalledWith = null;
  }
});

test('visiting /flashycards without data', function(assert) {
  visit('/flashycards');

  andThen(function() {
    assert.equal(currentPath(), 'flashycards.index');
    assert.equal(find('#blankslate').text().trim(), 'No Flashycards found');
  });
});

test('visiting /flashycards with data', function(assert) {
  server.create('flashycard');
  visit('/flashycards');

  andThen(function() {
    assert.equal(currentPath(), 'flashycards.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new flashycard', function(assert) {
  visit('/flashycards');
  click('a:contains(New Flashycard)');

  andThen(function() {
    assert.equal(currentPath(), 'flashycards.new');

    fillIn('label:contains(Term) input', 'MyString');
    fillIn('label:contains(Definition) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing flashycard', function(assert) {
  server.create('flashycard');
  visit('/flashycards');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'flashycards.edit');

    fillIn('label:contains(Term) input', 'MyString');
    fillIn('label:contains(Definition) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing flashycard', function(assert) {
  server.create('flashycard');
  visit('/flashycards');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'flashycards.show');

    assert.equal(find('p strong:contains(Term:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Definition:)').next().text(), 'MyString');
  });
});

test('delete a flashycard', function(assert) {
  server.create('flashycard');
  visit('/flashycards');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'flashycards.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
