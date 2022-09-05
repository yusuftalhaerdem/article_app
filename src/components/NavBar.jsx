import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentNavigationUrl,
  selectHomepageUrl,
  selectNavigationList,
} from "../features/navigationSlice";
import { changeNavigationTab } from "../features/navigationSlice";
import { Link, useLocation } from "react-router-dom";

export const NavBar = () => {
  // i may have hamburger menu for smaller screens.
  const dispatch = useDispatch();
  const currentNavigationUrl = useSelector(selectCurrentNavigationUrl);
  const navList = useSelector(selectNavigationList);
  const homepageUrl = useSelector(selectHomepageUrl);

  const currentUrl = useLocation().pathname;
  useEffect(() => {
    //console.log(currentUrl);
    //scrools up to start of page in each url change.
    window.scrollTo(0, 0);
    // it fails when i go to previous page or next page, it may be due to react router or google chrome prefences.
    // i observed this during user profile page changes.

    dispatch(changeNavigationTab(currentUrl));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUrl]);

  const items = navList.map((currentVal, index, arr) => {
    // we highlight the navigation tab if it is our current tab
    const li_class =
      currentVal.link === currentNavigationUrl
        ? "navbar-item current-item"
        : "navbar-item";

    return (
      <React.Fragment key={index}>
        <li className={li_class}>
          <Link to={currentVal.link}>{currentVal.name}</Link>
        </li>
      </React.Fragment>
    );
  });

  return (
    <div className="navbar navbar-light">
      <Link className="site-title" to={homepageUrl}>
        conduit
      </Link>
      <ul className="navbar-items">{items}</ul>
    </div>
  );
};
