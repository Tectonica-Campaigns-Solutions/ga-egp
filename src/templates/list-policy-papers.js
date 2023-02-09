import React, { useCallback } from 'react';
import { graphql, navigate } from 'gatsby';
import Layout from '../components/Layout/Layout';
import InnerNavigation from '../components/Global/InnerNavigation/InnerNavigation';
import InnerLayout from '../components/Layout/InnerLayout/InnerLayout';
import SeoDatoCms from '../components/SeoDatoCms';
import queryString from 'query-string';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import CardPolicy from '../components/Global/CardPolicy/CardPolicy';
import Input from '../components/Global/Form/Input';
import Select from '../components/Global/Form/Select';
import ActionButton from '../components/Global/Button/ActionButton';

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

  const handleOnClearFilters = () => {
    // TODO: Improve...
    window.location.replace(window.location.pathname);
  };

  const sidebarContent = () => (
    <div>
      <h3>Filter</h3>
      <form onSubmit={submitHandler}>
        <div className="mb-5">
          <Input type="radio" value="resolution" name="type" label="Resolution" />
          <Input type="radio" value="policy_paper" name="type" label="Policy Paper" />
        </div>

        <div className="mb-5">
          <Select
            name="tid"
            options={['Item 1', 'Item 2', 'Item 3']}
            renderOption={(item) => <option value={item}>{item}</option>}
            label="Council Adopted"
          />
        </div>

        <div className="mb-5">
          <Input type="checkbox" areaTitle="Issue or Area" label="Europe & Democracy" />
          <Input type="checkbox" label="Climate & Energy" />
          <Input type="checkbox" label="Economy & Jobs" />
        </div>

        <div className="mb-5">
          <label htmlFor="text">Intro</label>
          <input type="text" name="text" />
        </div>

        <div className="d-flex gap-4">
          <ActionButton label="Apply" type="submit" value="apply" />
          <ActionButton label="Clear" onClick={handleOnClearFilters} customVariant="light" />
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
