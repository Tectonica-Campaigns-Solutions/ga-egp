import React from 'react'
import * as styles from './listsessions.module.scss'
import { StaticQuery, graphql, navigate } from "gatsby"
import Link from '../../Global/Link'

function ListSessions(block) {
  const items = block.block.sessionItems
  const handleSession = () => {
    navigate('?item=1')
  }
  return (
    <StaticQuery
      query={graphql`
        query SessionTypes{
          allDatoCmsSessionType{
            edges{
              node{
                id
                title
                color{
                  hex
                }
              }
            }  
          }
        }
      `}
      render={data => (
        <div className={styles.list_sessions}>
          <div>
             {
              data.allDatoCmsSessionType.edges.map(item => <div>{ item.node.title } {item.node.color.hex }</div> )
             } 
          </div>
            {
              items.map(item => 
                <div className={styles.listItem}>
                  <h3>
                    { item.date }
                  </h3>
                  <div className={styles.listContent}>
                    {
                      item.session.map(el => 
                        <div>
                          { el.sessionType.color?.hex } 
                          { el.time }
                          { el.title }
                         
                          <div onClick={handleSession}>Read more</div>
                        </div>
      
                      )
                    }
                  </div>
                </div>
              )
            }
        </div>
     )}
    />
    
  )
}

export default ListSessions