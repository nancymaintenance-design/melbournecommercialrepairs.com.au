module.exports = function publicAddress(business) {
 const locality = `${business.addressLocality}, ${business.addressRegion} ${business.postalCode}`;
 return {street: business.streetAddress, locality, full: `${business.streetAddress}, ${locality}`};
};
