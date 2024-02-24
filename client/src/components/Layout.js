import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Import BrowserRouter and Switch
import Dashboard from './Dashboard';
import Housing from './Housing';
import Transportation from './Transportation';
import Dining from './Dining';
import Activities from './CulturalActivities';
import RecreationalFacilities from './RecreationalFacilities';
import PersonalAssistant from './PersonalAssistant';
import SocialIntegration from './SocialIntegration';
import AccountSettings from './AccountSettings';

const Layout = () => {
  return (
    <Router>
      <div className="layout">
        <NavBar />
        <div className="main-content">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/housing" component={Housing} />
            <Route path="/transportation" component={Transportation} />
            <Route path="/dining" component={Dining} />
            <Route path="/activities" component={Activities} />
            <Route path="/recreational-facilities" component={RecreationalFacilities} />
            <Route path="/personal-assistant" component={PersonalAssistant} />
            <Route path="/social-integration" component={SocialIntegration} />
            <Route path="/account-settings" component={AccountSettings} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default Layout;
