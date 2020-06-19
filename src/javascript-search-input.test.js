import { Map } from 'immutable'
import { getValuesForKey, searchStrings, createFilter } from './javascript-search-input';

describe(`javascript-search-input`, () => {

  describe(`getValuesForKey`, () => {
    test('should get the values to search on in an object', () => {
      const value = getValuesForKey('foo', {
        foo: 'bar'
      })
      expect(value).toEqual(['bar'])
    })

    test('should get the values to search on in an array', () => {
      const value = getValuesForKey('foo', [{
        foo: 'bar'
      }])
      expect(value).toEqual(['bar'])
    })

    test('should get the values to search on in a nested object', () => {
      const value = getValuesForKey('foo.bar', {
        foo: {
          bar: 'baz'
        }
      })
      expect(value).toEqual(['baz'])
    })

    test('should get the values to search on in a nested array', () => {
      const value = getValuesForKey('foo', {
        foo: ['bar', 'baz']
      })
      expect(value).toEqual(['bar', 'baz'])
    })

    test('should get the values to search on in a nested array', () => {
      const value = getValuesForKey('foo.bar', {
        foo: [{
          bar: 'baz'
        }, {
          bar: 'baz2'
        }]
      })
      expect(value).toEqual(['baz', 'baz2'])
    })

    test('should get the values to search on in a nested array with an index', () => {
      const value = getValuesForKey('foo.1.bar', {
        foo: [{
          bar: 'baz'
        }, {
          bar: 'baz2'
        }]
      })
      expect(value).toEqual(['baz2'])
    })

    test('should ignore undefined values', () => {
      const value = getValuesForKey('fooz', {
        foo: [{
          bar: 'baz'
        }, {
          bar: 'baz2'
        }]
      })
      expect(value).toEqual([])
    })

    test('should get the values to search on in an immutable map', () => {
      const value = getValuesForKey('foo.bar', Map({
        foo: {
          bar: 'baz'
        }
      }))
      expect(value).toEqual(['baz'])
    })

    test('should ignore non-string and non-number values', () => {
      const value = getValuesForKey('foo.bar', {
        foo: [{
          bar: []
        }, {
          bar: []
        }]
      })
      expect(value).toEqual([])
    })
  })

  describe(`searchStrings`, () => {
    test('should return true if the term is in the strings', () => {
      const res = searchStrings(['foobar', 'bar'], 'foo')
      expect(res).toBe(true)
    })

    test('should return false if the term isn\'t in the strings', () => {
      const res = searchStrings(['barbaz', 'bar'], 'foo')
      expect(res).toBe(false)
    })

    test('should return false if the term is in the strings but doesn\'t have the right case', () => {
      const res = searchStrings(['foobaz', 'bar'], 'Foo')
      expect(res).toBe(false)
    })
  })

  describe(`createFilter`, () => {

    const sampleData = [{
      id: 1,
      user: {
        name: 'Junior Oliveira',
        job: 'Software Engineer',
      },
      subject: 'Hi!',
      dest: [
        {
          name: 'Bruno',
          job: 'Developer',
        },
        {
          name: 'Helio',
          job: 'Lawyer',
        }
      ]
    }, {
      id: 2,
      user: {
        name: 'Fabiano',
        job: 'UX Designer',
      },
      subject: 'javascript',
      dest: [
        {
          name: 'Cordeiro',
          job: 'CEO',
        },
      ]
    }];

    test(`should find input from object property`, () => {
      const KEYS_TO_FILTERS = ['user.name', 'subject', 'dest.name'];
      const myFilter = createFilter(KEYS_TO_FILTERS);
      const filtered = sampleData.filter(myFilter('Oliveira'));

      expect(filtered.some(({ user }) => user.name === 'Junior Oliveira')).toBe(true);
    })

    test(`should find input from nested object`, () => {
      const KEYS_TO_FILTERS = ['user.name', 'subject', 'dest.name'];
      const myFilter = createFilter(KEYS_TO_FILTERS);
      const filtered = sampleData.filter(myFilter('Bruno'));

      expect(filtered.some(({ user }) => user.name === 'Junior Oliveira')).toBe(true);
    })
  })
})