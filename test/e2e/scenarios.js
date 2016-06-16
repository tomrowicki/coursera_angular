'use strict';

describe('conFusion App E2E Testing', function() {

  it('should automatically redirect to / when location hash/fragment is empty', function() {

    browser.get('app/index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/");

  });

  describe('index', function() {
    beforeEach(function() {
      browser.get('app/index.html#/');
    });

    it('should have a title', function() {
      expect(browser.getTitle()).
      toEqual('Ristorante Con Fusion');
    });
  });

  describe('menu 0 item', function() {
    beforeEach(function() {
      browser.get('app/index.html#/menu/0');
    });

    it('should have a name', function() {
      var name = element(by.binding('dish.name'));
      expect(name.getText()).
      toEqual('Uthapizza Hot $4.99');
    });

    it('should show the number of comments as', function() {
      expect(element.all(by.repeater('comment in dish.comments'))
      .count()).toEqual(12);

    });

    it('should show the first comment author as', function() {
      element(by.model('filterText')).sendKeys('author');
      expect(element.all(by.repeater('comment in dish.comments'))
      .count()).toEqual(12);
      var author = element.all(by.repeater('comment in dish.comments'))
      .first().element(by.binding('comment.author'));

      expect(author.getText()).toContain('25 Cent');

    });
  });

});
