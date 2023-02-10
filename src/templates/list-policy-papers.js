import React, { useCallback, useEffect, useState } from 'react';
import { graphql, navigate } from 'gatsby';
import Layout from '../components/Layout/Layout';
import InnerNavigation from '../components/Global/InnerNavigation/InnerNavigation';
import InnerLayout from '../components/Layout/InnerLayout/InnerLayout';
import SeoDatoCms from '../components/SeoDatoCms';
import queryString from 'query-string';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import CardPolicy from '../components/Global/CardPolicy/CardPolicy';
import Input from '../components/Global/Form/Input';
import SelectInput from '../components/Global/Form/SelectInput';
import ActionButton from '../components/Global/Button/ActionButton';
import RadioInput from '../components/Global/Form/RadioInput';
import CheckboxInput from '../components/Global/Form/CheckboxInput';

function ListPolicyPapers({ pageContext, location, data: { listPapers, listResolutions, page, navLinks } }) {
  const papers = listPapers.edges;
  const list = papers.concat(listResolutions.edges);
  const councils = listResolutions.edges.map(item => item.node.council)

  const [filterOptions, setFilterOptions] = useState({
    type: '',
    council: '',
    issueOrArea: '',
    title: '',
  });

  useEffect(() => {
    // Save params on state
    const params = queryString.parse(location.search);

    let newFilters = { ...filterOptions };
    for (const element of Object.keys(params)) {
      newFilters = { ...newFilters, [element]: params[element] };
    }

    setFilterOptions(newFilters);
  }, [location.search]);

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
        } else if (item.name === 'council' && !!item.value) {
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

  const handleOnChangeInputs = (e) => {
    const { name, value } = e.target;

    if (!name || !value) return;

    setFilterOptions((prev) => ({ ...prev, [name]: value }));
  };

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
            options={councils}
            renderOption={(item) => <option value={item.idFilter}>{item.title}</option>}
          />
        </div>

        <div className="mb-5">
          <CheckboxInput
            name="issueOrArea"
            sectionTitle="Issue or Area"
            value={filterOptions.issueOrArea}
            onChange={handleOnChangeInputs}
            options={[
              { label: 'Europe & Democracy', value: 'policy_paper' },
              { label: 'Climate & Energy', value: 'resolution' },
              { label: 'Economy & Jobs', value: 'resolution' },
            ]}
          />
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
