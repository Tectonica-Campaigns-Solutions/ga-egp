import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import InnerNavigation from '../components/Global/InnerNavigation/InnerNavigation';
import CardPosition from '../components/Global/CardPosition/CardPosition';
import InnerLayout from '../components/Layout/InnerLayout/InnerLayout';
import Link from '../components/Global/Link';

function ListResolutions({ data: { list, page } }) {
  return (
    <Layout>
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col">
            <h1>{page.title}</h1>
      

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
                {list.edges.map((item) => {
                  return (
                    <>
                      Council: { item.node.council.title }
                      <Link to={item.node.slug}>{item.node.title }</Link>
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
  }
`;
