import * as util from '../util'

describe("Comma Separated List function", () => {
  it('handles an empty array', () => {
    expect(util.commaSeparatedList([])).toBe('')
  })
  it('handles a single item', () => {
    expect(util.commaSeparatedList(['Node.js'])).toBe('Node.js')
  })
  it('handles two items', () => {
    expect(util.commaSeparatedList(['Node.js', 'Python'])).toBe('Node.js and Python')
  })
  it('handles three items', () => {
    expect(util.commaSeparatedList(['Node.js', 'Python', 'Go'])).toBe('Node.js, Python, and Go')
  })
})