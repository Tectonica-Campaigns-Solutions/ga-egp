export const pathToModel = (model, slug = '') => {
  if (model === 'position') {
    return `/positions/${slug}`;
  } else if (model === 'post') {
    return `/news/${slug}`;
  } else {
    return '';
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
