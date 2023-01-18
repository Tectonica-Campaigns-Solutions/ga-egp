import React, { useState, useEffect } from 'react';
import { graphql, navigate } from 'gatsby';
import Layout from '../components/Layout/Layout';
import InnerNavigation from '../components/Global/InnerNavigation/InnerNavigation';
import CardPosition from '../components/Global/CardPosition/CardPosition';
import InnerLayout from '../components/Layout/InnerLayout/InnerLayout';
import Link from '../components/Global/Link';
import SeoDatoCms from '../components/SeoDatoCms';
import queryString from 'query-string';
import HeroPage from '../components/Global/HeroPage/HeroPage';


function ListResolutions({ pageContext, location, data: { list, page, councils } }) {
  const [filteredContent, setFilteredContent] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    let url = '/resolutions/?';

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

  return (
    <Layout>
      <HeroPage title={page.title} context={pageContext} location={location}/>
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col">
          

            <form action="" onSubmit={submitHandler}>
              <div>
                <label htmlFor="tid">Council</label>
                <select name="tid" id="tid">
                  <option value="all">All</option>
                  {councils.edges.map((item) => (
                    <option value={item.node.idFilter}>{item.node.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="field_subheading_value">Intro</label>
                <input type="text" name="field_subheading_value" />
              </div>
              <div>
                <input type="submit" value="apply" />
              </div>
            </form>

            <InnerLayout>
              <div className="row">
                {filteredContent.map((item) => {
                  return (
                    <>
                      Council: {item.node.council.title}
                      <Link to={item.node.slug}>{item.node.title}</Link>
                    </>
                  );
                })}
              </div>
            </InnerLayout>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ListResolutions;

export const Head = ({ data: { page } }) => <SeoDatoCms page={page} />;

export const ListPositionsQuery = graphql`
  query ListResolutions {
    page: datoCmsListResolution {
      title
      slug
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
  }
`;
