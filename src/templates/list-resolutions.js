import React, { useState, useEffect } from 'react';
import { graphql, navigate } from 'gatsby';
import Layout from '../components/Layout/Layout';
import InnerNavigation from '../components/Global/InnerNavigation/InnerNavigation';
import CardPosition from '../components/Global/CardPosition/CardPosition';
import InnerLayout from '../components/Layout/InnerLayout/InnerLayout';
import Link from '../components/Global/Link';
import SeoDatoCms from '../components/SeoDatoCms';
import queryString from 'query-string';

function ListResolutions({ location, data: { list, page, councils } }) {
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
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col">
            <h1>{page.title}</h1>

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
              <div className="row gy-5">
                <h3>Our resolutions</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Nunc mauris odio pellentesque ut feugiat mauris sagittis.
                  Morbi vitae in volutpat etiam leo. Tellus hac et leo eu tellus tellus neque cursus. Nunc morbi tempor
                  sagittis ultricies vitae. Velit est augue proin vitae commodo. Risus scelerisque viverra consectetur
                  duis volutpat. Aliquet congue etiam amet ullamcorper in eu in. Tristique vulputate mi adipiscing
                  facilisi. Feugiat feugiat senectus nisl mollis amet. Sed gravida viverra quam egestas id egestas enim
                  malesuada consequat.
                </p>
              </div>
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
