/**
 * @typedef {Object} Property
 * @property {string} id - Unique identifier for the property
 * @property {string} title - Property title / headline
 * @property {string} price - Current formatted listing price (e.g. "$500,000")
 * @property {string} [oldPrice] - Original price before discount (e.g. "$625,000")
 * @property {string} location - Location / district description
 * @property {string} area - Floor area in square meters (e.g. "120m²")
 * @property {number} bedrooms - Number of bedrooms
 * @property {number} bathrooms - Number of bathrooms
 * @property {string} image - Path or URL to the property thumbnail/photo
 * @property {boolean} [isExclusive] - Whether this property is part of exclusive offers
 */

/**
 * @typedef {Object} Category
 * @property {string} id - Category identifier
 * @property {string} title - Category name (e.g. "Apartment Residences")
 * @property {string} propertyCount - Human readable property count (e.g. "7,200 Properties")
 * @property {string} image - Category cover image path
 */

/**
 * @typedef {Object} Testimonial
 * @property {number|string} id - Unique testimonial id
 * @property {string} propertyTitle - Associated property name
 * @property {string} community - Neighborhood or area name
 * @property {string} area - Property area
 * @property {number} bedrooms - Number of bedrooms
 * @property {number} bathrooms - Number of bathrooms
 * @property {string} clientName - Reviewer's full name
 * @property {string} avatar - Reviewer's avatar image URL
 * @property {string} propertyImage - Image of the client's purchased home
 * @property {string} quote - Review quote text
 */

export {};
