export const pathToModel = (model = null, slug = '') => {
  if (model === 'post') {
    return `/news/${slug}`;
  } else if (model === 'person') {
    return `/organisation/${slug}`;
  } else if (model === 'congress') {
    return `/events/${slug}`;
  } else if (model === 'position') {
    return `/positions/${slug}`;
  } else if (model === 'podcast') {
    return `/podcast/${slug}`;
  } else if (model === 'resolution') {
    return `/resolutions/${slug}`;
  } else if (model === 'congress_inner_page') {
    return `/events/${slug}`;
  } 
  else {
    return '/' + slug;
  }
};

export const basePathTag = (model) => {
  if (model === 'podcast') {
    return '/podcast/';
  } else if (model === 'post') {
    return '/news/';
  } else {
    return '';
  }
};

export const isArray = (array) => {
  return Array.isArray(array) && array.length > 0;
};

export const getCtaUrl = (cta) => {
  if (!cta) return;

  if (typeof cta === 'string') {
    return pathToModel(null, cta);
  }

  if (cta?.content?.model) {
    const { apiKey: model } = cta.content?.model;
    return pathToModel(model, cta.content?.slug);
  }

  if (cta?.link?.content?.model) {
    const { apiKey: model } = cta.link?.content?.model;
    return pathToModel(model, cta.link?.content?.slug);
  }

  const url = cta.link?.content ? '/' + cta.link?.content?.slug : cta.link?.url;
  return url;
};

export const getCtaTitle = (cta) => {
  return cta.title ? cta.title : cta.link?.content?.label;
};

export const getPhoneLink = (phone) => {
  return `tel:${phone}`;
};

export const getEmailLink = (email) => {
  return `mailto:${email}`;
};

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const isActiveTrail = (pathname, link) => {
  if (!pathname) return;

  const explodePath = pathname?.split('/') || [];
  if (pathname === link + '/' || explodePath.includes(link.substring(1))) {
    return true;
  }
  return false;
};

export const removeUnderscoreFromString = (string) => {
  return string.replaceAll('_', ' ');
};
