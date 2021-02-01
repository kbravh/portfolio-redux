const slugify = require('@sindresorhus/slugify')

module.exports = title => `/writing/${slugify(title)}`