/**
 Copyright 2016 Autodesk,Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 */
import React from 'react';
import { Button, GlobalNav, SideNav} from '../react-hig';

import 'hig-vanilla/dist/hig.css';
import './index.css';

import logo from './images/bim-logo.png';
import profileImage from './images/profileImage.png';
import TopNavFixtures from './fixtures/topNavFixtures';
import sideNavFixtures from './fixtures/sideNavFixtures';

import ButtonSection from './sections/ButtonSection';
import DropdownSection from './sections/DropdownSection';
import IconButtonSection from './sections/IconButtonSection';
import CheckboxSection from './sections/CheckboxSection';
import RadioButtonSection from './sections/RadioButtonSection';
import RangeSection from './sections/RangeSection';
import TextFieldSection from './sections/TextFieldSection';
import TextAreaSection from './sections/TextAreaSection';
import PasswordFieldSection from './sections/PasswordFieldSection';
import SpacerSection from './sections/SpacerSection';
import ModalSection from './sections/ModalSection';
import TypographySection from './sections/TypographySection';
import TableSection from "./sections/TableSection";

const topNavFixtures = new TopNavFixtures();

class Playground extends React.Component {
  constructor() {
    super();
    this.state = {
      tabs: [{ label: 'One', id: 0 }, { label: 'Two', id: 1 }],
      projects: topNavFixtures.projectList(),
      accounts: topNavFixtures.accountList(),
      accountSwitcherIsOpen: false,
      activeAccount: topNavFixtures.accountList()[0],
      activeProject: topNavFixtures.projectList()[0],
      activeLabel: `${topNavFixtures.accountList()[0]
        .label} / ${topNavFixtures.projectList()[0].label}`,
      activeImage: topNavFixtures.projectList()[0].image,
      activeType: 'project',
      sideNavOpen: true
    };
  }

  setActiveProjectOrAccount(activeProjectOrAccountItem) {
    this.selectProjectOrAccountTarget(activeProjectOrAccountItem);
    this.setState({ isOpen: false });
  }

  selectProjectOrAccountTarget(targetItem) {
    if (targetItem.type === 'account') {
      this.state.accounts.forEach((account) => {
        if (account.id === targetItem.id) {
          this.setState({
            activeAccount: account,
            activeLabel: this.state.activeProject
              ? `${account.label} / ${this.state.activeProject.label}`
              : account.label,
            activeImage: this.state.activeProject.image,
            activeType: 'account'
          });
        }
      });
    }

    if (targetItem.type === 'project') {
      this.state.projects.forEach((project) => {
        if (project.id === targetItem.id) {
          this.setState({
            activeProject: project,
            activeLabel: this.state.activeAccount
              ? `${this.state.activeAccount.label} / ${project.label}`
              : project.label,
            activeImage: project.image,
            activeType: 'project'
          });
        }
      });
    }
  }

  toggleSideNav = () => {
    this.setState({ sideNavOpen: !this.state.sideNavOpen });
  }

  handleTopNavSearchInputChange = (event) => {
    console.log('TopNav Search input', event.target.value);
  }

  profileSignOutClick = (event) => {
    console.log('Profile Sign Out button clicked!');
  }

  addTabBefore = () => {
    const nextLabel = Math.floor(Math.random() * 100000, 5);
    const nextTabs = Array.from(this.state.tabs);
    nextTabs.unshift({ label: nextLabel.toString(), id: nextLabel });
    this.setState({ tabs: nextTabs });
  }

  addTabAfter = () => {
    const nextLabel = Math.floor(Math.random() * 100000, 5);
    const nextTabs = Array.from(this.state.tabs);
    nextTabs.push({ label: nextLabel.toString(), id: nextLabel });
    this.setState({ tabs: nextTabs });
  }

  removeTab = () => {
    const nextTabs = Array.from(this.state.tabs);
    nextTabs.pop();
    this.setState({ tabs: nextTabs });
  }

  addModule = () => {
    const key = Math.floor(Math.random() * 100000, 5);
    const module = { title: `${key}`, icon: 'document-management', key };
    const modules = Array.from(this.state.modules);
    modules.push(module);
    this.setState({ modules });
  }

  closeProjectAccountSwitcher = (event) => {
    this.setState({ isOpen: false });
  }

  openProjectAccountSwitcher = (event) => {
    this.setState({ isOpen: true });
  }

  retreiveProjectOrAccountLength = () => {
    return this.state.projects.length > 1 || this.state.accounts.length > 1;
  }

  logEvent = (event, higElement) => {
    let messageParts = [
      `${higElement.constructor.name} triggered an ${event.type} event`
    ];
    if (event.target.value !== undefined) {
      messageParts = messageParts.concat(`: ${event.target.value}`);
    }
    console.log(messageParts.join(''));
  }

  render() {
    const sideNavProps = {
      superHeaderLabel: "Global Construction",
      headerLabel: "Oakwood Medical Center",
      links: sideNavFixtures.links,
    };

    return (
      <div>
        <GlobalNav
          sideNavOpen={this.state.sideNavOpen}
          sideNav={sideNavProps}
          modules={sideNavFixtures.modules}
          submodules={sideNavFixtures.submodules}
          onModuleChange={id => console.log(`Module selected: ${id}`)}
        >
          <section>
            <h3>Tabs</h3>
            <Button title="Add tab before" onClick={this.addTabBefore} />
            <Button title="Add tab after" onClick={this.addTabAfter} />
            <Button title="Remove tab" onClick={this.removeTab} />
          </section>
          <ButtonSection />
          <IconButtonSection />
          <CheckboxSection />
          <PasswordFieldSection />
          <RadioButtonSection />
          <RangeSection />
          <SpacerSection />
          <TextFieldSection />
          <TextAreaSection />
          <ModalSection />
          <DropdownSection />
          <TypographySection />
          <TableSection/>
        </GlobalNav>
      </div>
  }
}

export default Playground;
