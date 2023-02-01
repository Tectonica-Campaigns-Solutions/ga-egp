import React, { useState, useEffect } from 'react';
import { graphql, navigate } from 'gatsby';
import Layout from '../components/Layout/Layout';
import InnerNavigation from '../components/Global/InnerNavigation/InnerNavigation';
import InnerLayout from '../components/Layout/InnerLayout/InnerLayout';
import SeoDatoCms from '../components/SeoDatoCms';
import queryString from 'query-string';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import { isArray } from '../utils';
import ListPaginated from '../components/Global/Pagination/ListPaginated';
import InformationCard from '../components/Global/InformationCard/InformationCard';

function ListResolutions({ pageContext, location, data: { list, page, navLinks, councils } }) {
  const [filteredContent, setFilteredContent] = useState([]);
  const [filter, setFilter] = useState({ councilId: null, intro: null });

  const shouldNavigateToFirstPage = () => {
    const params = new URLSearchParams(location.search);
    return params.has('tid') ? params.get('tid') === filter.councilId : false;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let url = '/positions/resolutions/?';

    Array.from(e.target.elements).map((item) => {
      if (item.type != 'submit') {
        url += `${item.name}=${item.value}&`;
      }
    });

    navigate(url);
  };

  useEffect(() => {
    if (location.search !== '') {
      const params = queryString.parse(location.search);

      const filteredData = list.edges.filter((item) => {
        if (
          (params.tid === 'all' ? true : item.node.council.idFilter === params.tid) &&
          item.node.intro.includes(params.field_subheading_value)
        ) {
          return item;
        }
      });

      setFilteredContent(filteredData);
      return;
    }

    setFilteredContent(list.edges);
  }, [list]);

  const sidebarContent = () => (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="tid">Council</label>
        <select name="tid" id="tid" onChange={(e) => setFilter((prev) => ({ ...prev, councilId: e.target.value }))}>
          <option value="all">All</option>
          {councils.edges.map((item) => (
            <option value={item.node.idFilter}>{item.node.title}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="field_subheading_value">Intro</label>
        <input
          type="text"
          name="field_subheading_value"
          onChange={(e) => setFilter((prev) => ({ ...prev, intro: e.target.value }))}
        />
      </div>

      <div>
        <input type="submit" value="apply" />
      </div>
    </form>
  );

  return (
    <Layout>
      <HeroPage title={page.title} context={pageContext} location={location} />
      {navLinks && <InnerNavigation location={location} innerMenu={navLinks} />}

      <InnerLayout navMenu={sidebarContent()}>
        {isArray(filteredContent) && (
          <ListPaginated
            list={filteredContent}
            resetPage={shouldNavigateToFirstPage()}
            renderItem={(item) => {
              const { id, council, intro, slug, model, title, documents } = item.node;

              return (
                <div className="mb-5" key={id}>
                  <InformationCard
                    preTitle={
                      <>
                        Council: <strong>Copenhagen Congress 2022</strong>
                      </>
                    }
                    title={title}
                    intro={intro}
                    documents={documents}
                  />
                </div>
              );
            }}
          />
        )}
      </InnerLayout>
    </Layout>
  );
}

export default ListResolutions;

export const Head = ({ data: { page } }) => <SeoDatoCms page={page} />;

export const ListPositionsQuery = graphql`
  query ListResolutions($menuInner: String) {
    page: datoCmsListResolution {
      title
      slug
      id
      introduction
    }
    list: allDatoCmsResolution {
      edges {
        node {
          ...CardResolution
        }
      }
    }
    councils: allDatoCmsCouncil {
      edges {
        node {
          title
          idFilter
        }
      }
    }
    navLinks: datoCmsNavigation(id: { eq: $menuInner }) {
      ...Navigation
    }
  }
`;
