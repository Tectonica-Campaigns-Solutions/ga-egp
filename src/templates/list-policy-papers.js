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
import CardPolicy from '../components/Global/CardPolicy/CardPolicy';

function ListPolicyPapers({ pageContext, location, data: { listPapers, listResolutions, page, navLinks } }) {
  const papers = listPapers.edges;
  const list = papers.concat(listResolutions.edges);

  const [filteredContent, setFilteredContent] = useState(list);
  const [formData, setDataForm] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    if (e.target.name == 'type') {
      console.log(e.target.value);
      setDataForm({ type: e.target.value });
      console.log(formData);
    }
  };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   let url = '/positions/resolutions/?';

  //   Array.from(e.target.elements).map((item) => {
  //     if (item.type != 'submit') {
  //       url += `${item.name}=${item.value}&`;
  //     }
  //   });

  //   navigate(url);
  // };

  // useEffect(() => {
  //   if (location.search !== '') {
  //     const params = queryString.parse(location.search);

  //     const filteredData = list.edges.filter((item) => {
  //       if (
  //         (params.tid === 'all' ? true : item.node.council.idFilter === params.tid) &&
  //         item.node.intro.includes(params.field_subheading_value)
  //       ) {
  //         return item;
  //       }
  //     });

  //     setFilteredContent(filteredData);
  //     return;
  //   }

  //   setFilteredContent(list.edges);
  // }, [list]);

  const sidebarContent = () => (
    <div>
      <h3>Filter</h3>
      <form action="" onChange={(e) => submitHandler(e)}>
        <div>
          <input type="radio" value="resolution" checked={formData.type == 'resolution' ? true : false} name="type" />
          <input type="radio" value="paper" checked={formData.type == 'paper' ? true : false} name="type" />
        </div>
        <div>
          <label htmlFor="tid">Council</label>
          <select name="tid" id="tid">
            <option value="all">All</option>
            {/* {(councils).edges.map((item) => (
              <option value={item.node.idFilter}>{item.node.title}</option>
            ))} */}
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
    </div>
  );

  return (
    <Layout>
      <HeroPage title={page.title} context={pageContext} location={location} />
      {navLinks && <InnerNavigation location={location} innerMenu={navLinks} />}

      <InnerLayout navMenu={sidebarContent()}>
        <div className="row g-5">
          {filteredContent.map((item) => (
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
