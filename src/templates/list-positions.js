import React from 'react'
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import InnerNavigation from '../components/Global/InnerNavigation/InnerNavigation';
import CardPosition from '../components/Global/CardPosition/CardPosition';
import SidebarNav from '../components/Global/SidebarNav/SidebarNav';

function ListPositions({ data: { list, page }}) {
  return (
    <Layout>
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col">

            <h1>{ page.title }</h1>
            <InnerNavigation />
            <div className="row">
              <div className="col-lg-3">
                <SidebarNav menu={list.edges}/>

              </div>
              <div className="col-lg-9">
                <div className="row">

                  {
                    list.edges.map(item => {
                      return ( <div className="col-lg-4"><CardPosition position={item.node}/></div>)
                    }
                    
                    )
                  }
                </div>

              </div>
            </div>
          </div>
        </div>
       
      </div>
  </Layout>
  )
}

export default ListPositions;

export const ListPositionsQuery = graphql`
  query ListPositions{
    page: datoCmsListPosition{
      title
      slug
    }
    list:allDatoCmsPosition{
      edges{
        node{
          ... CardPosition
        }
      }
    }
  }
`;
