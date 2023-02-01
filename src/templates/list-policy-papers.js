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

function ListPolicyPapers({ pageContext, location, data: { list, page, navLinks } }) {
  const filteredContent = list.edges;
  // const [filteredContent, setFilteredContent] = useState([]);

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
    <form action="" onSubmit={{}}>
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
  );

  return (
    <Layout>
      <HeroPage title={page.title} context={pageContext} location={location} />
      {navLinks && <InnerNavigation location={location} innerMenu={navLinks} />}

      <InnerLayout navMenu={sidebarContent()}>
        <div className="row g-5">
          {filteredContent.map((item) => (
            <CardPolicy title={item.node.title} intro={item.node.intro} documents={item.node.documents} />
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
    list: allDatoCmsPolicyPaper {
      edges {
        node {
          title
          intro
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
  }
`;
