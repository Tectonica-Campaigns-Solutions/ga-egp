import React, { useCallback } from 'react';
import { graphql, navigate } from 'gatsby';
import Layout from '../components/Layout/Layout';
import InnerNavigation from '../components/Global/InnerNavigation/InnerNavigation';
import InnerLayout from '../components/Layout/InnerLayout/InnerLayout';
import SeoDatoCms from '../components/SeoDatoCms';
import queryString from 'query-string';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import CardPolicy from '../components/Global/CardPolicy/CardPolicy';

function ListPolicyPapers({ pageContext, location, data: { listPapers, listResolutions, page, navLinks } }) {
  const papers = listPapers.edges;
  const list = papers.concat(listResolutions.edges);

  const filteredContent = useCallback(() => {
    if (location.search === '') return list;

    const params = queryString.parse(location.search);

    return list.filter(
      (item) =>
        (params.type ? item.node.model.apiKey === params.type : true) &&
        (params.text ? item.node.intro.includes(params.text) : true)
    );
  }, [location, list]);

  const submitHandler = (e) => {
    e.preventDefault();
    let url = '?';

    Array.from(e.target.elements).forEach((item) => {
      if (item.type != 'submit') {
        if (item.type === 'radio' && item.checked) {
          url += `${item.name}=${item.value}&`;
        } else if (item.type === 'text' && !!item.value) {
          url += `${item.name}=${item.value}&`;
        }
      }
    });

    navigate(url);
  };

  const sidebarContent = () => (
    <div>
      <h3>Filter</h3>
      <form onSubmit={submitHandler}>
        <div>
          <div>
            <input id="resolution" type="radio" value="resolution" name="type" />
            <label htmlFor="resolution">Resolution</label>
          </div>
          <div>
            <input id="policy_paper" type="radio" value="policy_paper" name="type" />
            <label htmlFor="policy_paper">Policy Paper</label>
          </div>
        </div>

        {/*<div>
           <label htmlFor="tid">Council</label>
          <select name="tid" id="tid">
            <option value="all">All</option>
            {(councils).edges.map((item) => (
              <option value={item.node.idFilter}>{item.node.title}</option>
            ))}
          </select>
        </div> */}

        <div>
          <label htmlFor="text">Intro</label>
          <input type="text" name="text" />
        </div>

        <div>
          <input type="submit" value="apply" />
        </div>
      </form>
    </div>
  );

  return (
    <Layout>
      <HeroPage title={page.title} context={pageContext} location={location} />
      {navLinks && <InnerNavigation location={location} innerMenu={navLinks} />}

      <InnerLayout navMenu={sidebarContent()}>
        <div className="row g-5">
          {filteredContent()?.map((item) => (
            <CardPolicy item={item.node} />
          ))}
        </div>
      </InnerLayout>
    </Layout>
  );
}

export default ListPolicyPapers;

export const Head = ({ data: { page } }) => <SeoDatoCms page={page} />;

export const ListPositionsQuery = graphql`
  query ListPolicyPaper($menuInner: String) {
    page: datoCmsListPolicyPaper {
      title
      slug
    }
    navLinks: datoCmsNavigation(id: { eq: $menuInner }) {
      ...Navigation
    }
    listPapers: allDatoCmsPolicyPaper {
      edges {
        node {
          title
          intro
          model {
            apiKey
          }
          documents {
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
    listResolutions: allDatoCmsResolution {
      edges {
        node {
          title
          intro
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
  }
`;
