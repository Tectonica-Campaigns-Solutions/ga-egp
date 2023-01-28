export const pathToModel = (model = null, slug = '') => {
  if (model === 'post') {
    return `/news/${slug}`;
  } else if (model === 'person') {
    return `/organisation/${slug}`;
  } else {
    return '/' + slug;
  }
};

export const isArray = (array) => {
  return Array.isArray(array) && array.length > 0;
};

export const getCtaUrl = (cta) => {
  const url = cta.link?.content ? cta.link?.content?.slug : cta.link?.url;
  return '/' + url;
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
