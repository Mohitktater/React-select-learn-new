import { Fragment, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {Link} from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons'; 
import { faCheckCircle, faBlog,faGaugeHigh, faPowerOff , faClipboard, faPlus, faLayerGroup, faTag, faListUl} from '@fortawesome/free-solid-svg-icons';

export const CustomSidebar = () => {

  const [collapsed, setCollapsed] = useState(false);

  return (
  <Fragment> 
      <div className="sidebar__">
 
    <Sidebar 
   
        rtl={false}
        style={{ height: "100vh" }}
        backgroundColor='#fff'
>
        <Menu style={{fontSize:"13px", color:"#44596e"}}>
          <MenuItem

            component={<Link to="/" className="link" />}
            className="menu1"
            icon={<FontAwesomeIcon icon={faBlog} />}
          >
            <h2>MY BLOG</h2>
          </MenuItem>
          <MenuItem
            component={<Link to="dashboard" className="link" />}
            icon={<FontAwesomeIcon icon={faGaugeHigh} />}
          >
            Dashboard
          </MenuItem>
          
          <SubMenu  
            style={{fontSize:"13px", color:"#44596e"}}
            label="Blogs" 
            icon={<FontAwesomeIcon icon={faListUl} />}>
            <MenuItem
              component={<Link to="/blog" />} 
              style={{fontSize:"13px", color:"#44596e"}} 
              icon={<FontAwesomeIcon icon={faClipboard} />}>
              ALL Blogs
            </MenuItem>
            <MenuItem 
            style={{fontSize:"13px", color:"#44596e"}} 
            component={<Link to="/blog/create" />} 
            icon={<FontAwesomeIcon icon={faPlus} />}
            >Add New Blog
            </MenuItem>

            <MenuItem 
            style={{fontSize:"13px", color:"#44596e"}}  
            component={<Link to="/blog/category" />} 
            icon={<FontAwesomeIcon icon={faLayerGroup} />}
            >Category</MenuItem>


            <MenuItem 
            style={{fontSize:"13px", color:"#44596e"}}  
            component={<Link to="/blog/tags" />} 
            icon={<FontAwesomeIcon icon={faTag} />}
            >Tags</MenuItem>
          </SubMenu> 
          <MenuItem icon={<FontAwesomeIcon icon={faPowerOff} />}> Logout </MenuItem>
        </Menu>
      </Sidebar>
      </div>
    </Fragment>
  )
}
 
