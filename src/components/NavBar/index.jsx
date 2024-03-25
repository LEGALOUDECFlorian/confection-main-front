/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from "react";
import {
  Icon, Sidebar, Menu, Dropdown, Accordion,
} from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import "./navbar.scss";

function Navbar() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [subcategoriesData, setSubcategoriesData] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories`,
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubcategoriesData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/sous-categories`);
      setSubcategoriesData(response.data);
    } catch (error) {
      console.error("Error fetching subcategories data:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategoriesData();
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleCategoryHover = async (index, categoryName) => {
    setActiveIndex(index);

    try {
      const subcategoriesResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories/sous-categories`,
      );
      const categorySubcategories = subcategoriesResponse.data
        .filter(
          (subcategory) => subcategory.category_name.toLowerCase()
            === categoryName.toLowerCase(),
        )
        .map((subcategory) => subcategory.subcategory_name);

      setSubcategories({
        ...subcategories,
        [categoryName.toLowerCase()]: categorySubcategories,
      });
    } catch (error) {
      console.error(`Error fetching subcategories for ${categoryName}:`, error);
    }
  };

  // Render mobile navigation
  const renderMobileNavigation = () => (
    <div className="mobile-navbar">
      <button type="button" className="bars-icon-container" onClick={toggleSidebar}>
        <Icon name="bars" size="big" />
      </button>
      <Sidebar as={Menu} animation="overlay" direction="left" vertical visible={sidebarVisible}>
        <Menu.Item as="a" onClick={toggleSidebar}>
          <Icon name="close" />
        </Menu.Item>
        <div className="createurs-item">
          <NavLink to="/createurs" className="item" onClick={toggleSidebar}>
            Créateurs
          </NavLink>
        </div>
        {/* Ajouter les liens de navigation ici */}
        {categories.map((category, index) => (
          <Menu.Item
            key={index}
            onMouseEnter={() => handleCategoryHover(index, category.name)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <NavLink to={`/categories/${category.id}`} onClick={toggleSidebar}>
              <Accordion fluid styled>
                <Accordion.Title
                  active={activeIndex === index}
                  content={category.name}
                  index={index}
                  onClick={() => handleCategoryHover(index)}
                />
                <Accordion.Content active={activeIndex === index}>
                  <Menu vertical>
                    {subcategories[category.name.toLowerCase()]?.map((subcategory, subIndex) => {
                      const subcategoryData = subcategoriesData
                        .find((sub) => sub.name === subcategory);
                      if (subcategoryData) {
                        return (
                          <Menu.Item
                            key={subIndex}
                            as={Link}
                            to={`/sous-categories/${subcategoryData.id}`}
                            state={{ categoryName: category.name }}
                            name={subcategory}
                            onClick={toggleSidebar}
                          />
                        );
                      }
                      console.error(`Subcategory data not found for name: ${subcategory}`);
                      return null;
                    })}
                  </Menu>
                </Accordion.Content>
              </Accordion>
            </NavLink>
          </Menu.Item>
        ))}
      </Sidebar>
    </div>
  );

  // Render desktop navigation
  const renderDesktopNavigation = () => (
    <div className="navigation-container">
      <div className="ui secondary pointing menu fluid">
        <div className="createurs-item">
          <NavLink to="/createurs" className="item">
            Créateurs
          </NavLink>
        </div>
        {categories.map((category, index) => (
          <NavLink
            to={`/categories/${category.id}`}
            key={index}
            className="item custom-dropdown-link"
            onMouseOver={() => handleCategoryHover(index, category.name)}
            onMouseOut={() => setActiveIndex(null)}
          >
            <Dropdown
              item
              text={category.name}
              className={`custom-dropdown ${activeIndex === index ? "visible" : ""} simple-dropdown`}
              simple
              style={{ textTransform: "capitalize" }}
              onMouseEnter={() => handleCategoryHover(index, category.name)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <Dropdown.Menu>
                {subcategories[category.name.toLowerCase()]?.map((subcategory, subIndex) => {
                  const subcategoryData = subcategoriesData.find((sub) => sub.name === subcategory);
                  if (subcategoryData) {
                    return (
                      <Dropdown.Item
                        key={subIndex}
                        as={Link}
                        to={`/sous-categories/${subcategoryData.id}`}
                        state={{ categoryName: category.name }}
                        text={subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
                      />
                    );
                  }
                  console.error(`Subcategory data not found for name: ${subcategory}`);
                  return null;
                })}
              </Dropdown.Menu>
            </Dropdown>
          </NavLink>
        ))}
      </div>
    </div>
  );

  return (
    <nav>
      {renderDesktopNavigation()}
      {renderMobileNavigation()}
    </nav>
  );
}

export default Navbar;
