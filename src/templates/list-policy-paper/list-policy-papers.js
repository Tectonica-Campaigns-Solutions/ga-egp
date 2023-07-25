import React, { useCallback, useEffect, useState } from 'react';
import { graphql, navigate } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import InnerNavigation from '../../components/Global/InnerNavigation/InnerNavigation';
import InnerLayout from '../../components/Layout/InnerLayout/InnerLayout';
import SeoDatoCms from '../../components/SeoDatoCms';
import queryString from 'query-string';
import HeroPage from '../../components/Global/HeroPage/HeroPage';
import CardPolicy from '../../components/Global/CardPolicy/CardPolicy';
import Input from '../../components/Global/Form/Input';
import SelectInput from '../../components/Global/Form/SelectInput';
import ActionButton from '../../components/Global/Button/ActionButton';
import RadioInput from '../../components/Global/Form/RadioInput';
import CheckboxInput from '../../components/Global/Form/CheckboxInput';
import {
  DATE_FILTERS,
  filterPolicyPapersByDateRange,
  filterPolicyPapersByLastMonth,
  filterPolicyPapersByLastSixMonths,
  filterPolicyPapersByLastYear,
} from '../../utils';
import ListPaginated from '../../components/Global/Pagination/ListPaginated';

import * as styles from './styles.module.scss';

function ListPolicyPapers({
  pageContext,
  location,
  data: { listPapers, listResolutions, areas, page, navLinks, breadcrumb, favicon, siteTitle },
}) {
  const papers = listPapers.edges;
  const list = papers.concat(listResolutions.edges);
  const councils = listResolutions.edges.map((item) => item.node.council);
  const secondaryMenu = navLinks.treeParent?.treeParent ? navLinks.treeParent.treeParent : navLinks.treeParent;

  const [filterOptions, setFilterOptions] = useState({
    type: '',
    council: '',
    issueOrArea: [],
    title: '',
    date: 'all',
    start_date: null,
    end_date: null,
  });
  const [submitFilterOptions, setSubmitFilterOptions] = useState({
    type: '',
    council: '',
    issueOrArea: [],
    title: '',
    date: 'all',
    start_date: null,
    end_date: null,
  });

  useEffect(() => {
    // Save params on state
    const params = queryString.parse(location.search);

    let newFilters = { ...filterOptions };
    for (const element of Object.keys(params)) {
      if (element === 'issueOrArea') {
        const items = params[element].split(',');
        newFilters.issueOrArea = [...items];
      } else {
        newFilters = { ...newFilters, [element]: params[element] };
      }
    }

    setFilterOptions(newFilters);
    setSubmitFilterOptions(newFilters);
  }, [location.search]);

  const filteredContent = useCallback(() => {
    if (location.search === '') return list;

    let finalList = [];
    const params = queryString.parse(location.search);

    finalList = list.filter(
      (item) =>
        (params.type ? item.node.model.apiKey === params.type : true) &&
        (params.title ? item.node.title.includes(params.title) : true) &&
        (params.council ? item.node.council?.idFilter == params.council : true) &&
        (params.issueOrArea ? item.node.areas?.find((a) => params.issueOrArea.includes(a.id)) : true)
    );

    if (params.date && params.date === 'last_month') {
      finalList = filterPolicyPapersByLastMonth(finalList);
    } else if (params.date && params.date === 'last_six_months') {
      finalList = filterPolicyPapersByLastSixMonths(finalList);
    } else if (params.date && params.date === 'year') {
      finalList = filterPolicyPapersByLastYear(finalList);
    } else if (params.date && params.date === 'between_dates') {
      finalList = filterPolicyPapersByDateRange(finalList, filterOptions.start_date, filterOptions.end_date);
    }

    return finalList;
  }, [location.search, list]);

  const submitHandler = (e) => {
    e.preventDefault();

    let url = '?';
    let prevAreas = new Set();

    Array.from(e.target.elements).forEach((item) => {
      if (item.type !== 'submit') {
        if (item.type === 'radio' && item.checked) {
          url += `${item.name}=${item.value}&`;
        } else if (item.type === 'text' && !!item.value) {
          url += `${item.name}=${item.value}&`;
        } else if (item.name === 'council' && !!item.value) {
          url += `${item.name}=${item.value}&`;
        } else if (item.name === 'date' && !!item.value) {
          url += `${item.name}=${item.value}&`;
        } else if ((item.name === 'start_date' || item.name === 'end_date') && !!item.value) {
          url += `${item.name}=${new Date(item.value).getTime()}&`;
        } else if (item.name === 'issueOrArea' && !!item.value && item.checked) {
          prevAreas.add(item.value);
        }
      }
    });

    // Areas or issues URL
    if (prevAreas.size > 0) {
      const arrayFromSet = Array.from(prevAreas);
      const arrayMapped = arrayFromSet.join(',');
      url += `issueOrArea=${arrayMapped}`;
    }

    navigate(url);
  };

  const handleOnClearFilters = () => {
    // TODO: Improve...
    window.location.replace(window.location.pathname);
  };

  const handleOnChangeInputs = (e) => {
    const { name, value } = e.target;

    if (name === 'issueOrArea') {
      if (filterOptions.issueOrArea.includes(value)) {
        setFilterOptions((prev) => ({ ...prev, issueOrArea: prev.issueOrArea.filter((i) => i !== value) }));
      } else {
        setFilterOptions((prev) => ({ ...prev, issueOrArea: [...prev.issueOrArea, value] }));
      }
      return;
    }

    setFilterOptions((prev) => ({ ...prev, [name]: value }));
  };

  // Remove duplicated items and null values
  const councilsCleaned = councils.filter(Boolean).filter((c, index, array) => {
    return (
      index ===
      array.findIndex((item) => {
        return item.title === c.title && item.id === c.id && item.idFilter === c.idFilter;
      })
    );
  });

  const areasOptions = areas.edges?.map((i) => ({ label: i.node.title, value: i.node.id }));

  const sidebarContent = () => (
    <div>
      <h3>Filter</h3>

      <form onSubmit={submitHandler}>
        <div className="mb-5">
          <RadioInput
            name="type"
            value={filterOptions.type}
            onChange={handleOnChangeInputs}
            options={[
              { label: 'Policy Papers', value: 'policy_paper' },
              { label: 'Resolution', value: 'resolution' },
            ]}
          />
        </div>

        <div className="mb-5">
          <SelectInput
            name="council"
            label="Council Adopted"
            value={filterOptions.council}
            onChange={handleOnChangeInputs}
            options={[{ title: 'Any', idFilter: '' }, ...councilsCleaned]}
            renderOption={(item) => (
              <option key={item.idFilter} value={item.idFilter}>
                {item.title}
              </option>
            )}
          />
        </div>

        <div className="mb-5">
          <CheckboxInput
            name="issueOrArea"
            sectionTitle="Issue or Area"
            values={filterOptions.issueOrArea}
            onChange={handleOnChangeInputs}
            options={areasOptions}
          />
        </div>

        <div className="mb-5">
          <SelectInput
            name="date"
            label="Post date"
            value={filterOptions.date}
            onChange={handleOnChangeInputs}
            options={Object.values(DATE_FILTERS)}
            renderOption={(item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            )}
          />

          {filterOptions.date === 'between_dates' && (
            <div className="mt-5">
              <div className="d-flex align-items-center flex-wrap gap-2">
                <Input
                  type="date"
                  name="start_date"
                  value={filterOptions.start_date}
                  onChange={handleOnChangeInputs}
                  required
                />
                <span>and</span>
                <Input
                  type="date"
                  name="end_date"
                  value={filterOptions.end_date}
                  onChange={handleOnChangeInputs}
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div className="mb-5">
          <Input areaTitle="Title" name="title" value={filterOptions.title} onChange={handleOnChangeInputs} isWhite />
        </div>

        <div className="d-flex gap-4">
          <ActionButton label="Apply" type="submit" value="apply" />
          <ActionButton label="Clear" onClick={handleOnClearFilters} customVariant="light" />
        </div>
      </form>
    </div>
  );

  const getFilteredTags = () => {
    const currentCouncil = submitFilterOptions.council;
    const currentsIssues = submitFilterOptions.issueOrArea;

    const councilTag = currentCouncil ? (
      <span>adopted at {councilsCleaned.find((c) => c.idFilter == currentCouncil)?.title} council</span>
    ) : (
      <span>adopted at any council</span>
    );

    const issuesTag =
      currentsIssues.length > 0 ? (
        <>
          on issue/area:{' '}
          {currentsIssues.map((i, index) => (
            <>
              <span>{areasOptions.find((a) => a.value === i)?.label}</span>

              {index !== currentsIssues.length - 1 ? <>, </> : null}
            </>
          ))}
        </>
      ) : null;

    return (
      <>
        Filtered by {councilTag} {issuesTag ? ',' : null} {issuesTag}
      </>
    );
  };

  return (
    <Layout>
      <SeoDatoCms seo={page.seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroPage title={page.title} context={pageContext} location={location} breadcrumb={breadcrumb} />
      {secondaryMenu && <InnerNavigation location={location} innerMenu={secondaryMenu} />}

      <InnerLayout sideNav={sidebarContent()}>
        <div className={styles.filterTitle}>
          <h4>
            Showing {filteredContent()?.length} {submitFilterOptions.type.replace('_', ' ')}
          </h4>
          <p>{getFilteredTags()}</p>
        </div>

        <div className="row g-5">
          <ListPaginated
            list={filteredContent()}
            renderItem={(item) => <CardPolicy key={item.node.id} item={item.node} />}
          />
        </div>
      </InnerLayout>
    </Layout>
  );
}

export default ListPolicyPapers;

export const ListPositionsQuery = graphql`
  query ListPolicyPaper($menuPos: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    siteTitle: datoCmsSite {
      globalSeo {
        siteName
      }
    }
    page: datoCmsListPolicyPaper {
      title
      slug
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    areas: allDatoCmsArea {
      edges {
        node {
          id
          title
        }
      }
    }
    listPapers: allDatoCmsPolicyPaper {
      edges {
        node {
          id
          slug
          title
          intro
          areas {
            ... on DatoCmsArea {
              id
              title
            }
          }
          date
          model {
            apiKey
          }
          documents {
            id
            internalName
            language
            document {
              path
              url
              title
            }
          }
        }
      }
    }
    navLinks: datoCmsMenu(id: { eq: $menuPos }) {
      title
      hideInInnerNavigation
      treeParent {
        title
        treeChildren {
          id
          ... on DatoCmsMenu {
            id
            title
            hideInInnerNavigation
            position
            content {
              ... on DatoCmsPage {
                slug
                model {
                  apiKey
                }
              }
              ... on DatoCmsListNews {
                slug
                model {
                  apiKey
                }
              }
              ... on DatoCmsListPodcast {
                slug
                model {
                  apiKey
                }
              }
              ... on DatoCmsListPosition {
                slug
                model {
                  apiKey
                }
              }
              ... on DatoCmsListPolicyPaper {
                slug
                model {
                  apiKey
                }
              }
            }
          }
        }
        treeParent {
          title
          treeChildren {
            id
            ... on DatoCmsMenu {
              id
              title
              hideInInnerNavigation
              position
              content {
                ... on DatoCmsPage {
                  slug
                  model {
                    apiKey
                  }
                }
                ... on DatoCmsListNews {
                  slug
                  model {
                    apiKey
                  }
                }
                ... on DatoCmsListPodcast {
                  slug
                  model {
                    apiKey
                  }
                }
                ... on DatoCmsListPosition {
                  slug
                  model {
                    apiKey
                  }
                }
              }
            }
          }
        }
      }
    }
    listResolutions: allDatoCmsResolution {
      edges {
        node {
          id
          title
          slug
          areas {
            ... on DatoCmsArea {
              id
              title
            }
          }
          intro
          date
          model {
            apiKey
          }
          council {
            ... on DatoCmsCouncil {
              title
              id
              idFilter
            }
          }
        }
      }
    }
    breadcrumb: datoCmsMenu(id: { eq: $menuPos }) {
      ...Breadcrumb
    }
  }
`;
