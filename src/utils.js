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

// Policy papers filters
export const DATE_FILTERS = [
  {
    label: 'Any time',
    value: 'all',
  },
  {
    label: 'Last six months',
    value: 'last_six_months',
  },
  {
    label: 'Last month',
    value: 'last_month',
  },
  {
    label: 'Last year',
    value: 'last_year',
  },
  {
    label: 'Between dates',
    value: 'between_dates',
  },
];

export const filterPolicyPapersByLastMonth = (list) => {
  const currentDate = new Date();
  const lastMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

  return list.filter((item) => {
    const itemDate = new Date(item.node.date);
    return itemDate >= lastMonthLastDay && itemDate <= currentDate;
  });
};

export const filterPolicyPapersByLastSixMonths = (list) => {
  const currentDate = new Date();
  const lastSixMonths = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1);

  return list.filter((item) => {
    const itemDate = new Date(item.node.date);
    return itemDate >= lastSixMonths && itemDate <= currentDate;
  });
};

export const filterPolicyPapersByLastYear = (list) => {
  const currentDate = new Date();
  const lastYear = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());

  return list.filter((item) => {
    const itemDate = new Date(item.node.date);
    return itemDate >= lastYear && itemDate <= currentDate;
  });
};

export const filterPolicyPapersByDateRange = (list, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return list.filter((item) => {
    const itemDate = new Date(item.node.date);
    return itemDate >= start && itemDate <= end;
  });
};
