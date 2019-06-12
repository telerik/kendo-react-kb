//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ProjectDetail - The Details associated with a project
//              Version 1.006 - May 29, 2019
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import 'whatwg-fetch';
import '@progress/kendo-theme-default/scss/all.scss';
import { Grid as TGrid, GridColumn as Column} from '@progress/kendo-react-grid';
import { TabStrip, TabStripTab, Splitter } from '@progress/kendo-react-layout';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { DateInput } from '@progress/kendo-react-dateinputs';
import { Button } from '@progress/kendo-react-buttons';
import { SessionInfo } from './App';
import PageHeader from './PageHeader.js';
import PageFooter from './PageFooter.js';
import EditGridCommandCell from './EditGridCommandCell.jsx';  // edit grid
import './App.css';
import { GetRow, GetTableData, GetTableSearch, UpdateRow, DeleteRow, SaveRow, displayMessage, displayError, GetDropdownData, GetDependentDropdownData, displayWarning } from './CommonCode.js';
import { getWeb3, getEthAccounts } from './SolidityInterface.js';
//import Web3 from 'web3'; // Note - if this fails to load - it is probably due to a metamask problem
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
//import red from '@material-ui/core/colors/red';

//const web3 = new Web3(window.web3.currentProvider);
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: blue,
  },
});
let RoleDD = [];

class RoleDropDownCell extends React.Component {
  //constructor(props) {
  //  super(props);
  //}
  handleChange = (e) => { // e.target.value is the object {ddid: n, ddName: 'n'}
    //console.log("change - field: " + this.props.field + "  value: " + JSON.stringify(e.target.value) + " dataitem: " + JSON.stringify(this.props.dataItem));
    this.props.onChange({
      dataItem: this.props.dataItem,
      field: this.props.field,
      syntheticEvent: e.syntheticEvent,
      value: e.target.value
    });
    this.props.dataItem[this.props.field] = e.target.value.ddid;
    this.forceUpdate();
  }
  render() {
    let dataValue = this.props.dataItem[this.props.field];
    if (dataValue === undefined || dataValue === null)
      dataValue = 0;
    if (!this.props.dataItem.inEdit) {
      if (RoleDD.find(c => c.ddid === dataValue) === undefined)
        return (
          <td>{"Unknown: " + dataValue}</td>
        );
      else
        return (
          <td>
            {RoleDD.find(c => c.ddid === dataValue).ddName}
          </td>
        );
    }
    return (
      <td>
        <DropDownList style={{ width: "100px" }} data={RoleDD} textField="ddName" dataItemKey="ddid" value={RoleDD.find(c => c.ddid === dataValue)} onChange={this.handleChange}/>
      </td>
    );
  }
}

class ProjectDetail extends Component {
  //------------------------------------------------------------------------------------------------------
  constructor(props) {
    super(props);
    //console.log("Project Description Construct - session: " + SessionInfo.session);
    if (!SessionInfo.session)
      return;
    console.log("Project Description Construct - SelectedProjectID: " + SessionInfo.SelectedProjectID);
    if (SessionInfo.SelectedProjectID > 0) {
      this.getRecord(SessionInfo.SelectedProjectID);
      displayMessage("GREEN");
      this.state.CFProjectID = SessionInfo.SelectedProjectID;
      SessionInfo.SelectedProjectID = 0;
      this.loadExistingPage = false;
    }
    else {
      if (SessionInfo.ProjectDetail) { // Data saved for this session
        this.state = SessionInfo.ProjectDetail;
        this.loadExistingPage = true;
      }
    }
    //------------- Edit Grid ------------------------------
    this.enterInsert = this.enterInsert.bind(this);
    this.itemChange = this.itemChange.bind(this);
    const enterEdit = this.enterEdit.bind(this);
    const save = this.save.bind(this);
    const cancel = this.cancel.bind(this);
    const remove = this.remove.bind(this);
    this.CommandCell = EditGridCommandCell(enterEdit, remove, save, cancel, "inEdit", "EmailAddress", "CFPPID");
    getWeb3();
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  state = {
    CFProjectID: 0,
    EmailAllowed: true,
    CFProjectPrivate: false,
    CFProjectControlTypeID: 0,
    CFProjectOwnerID: 0,
    CurrencyID: 0,
    ProjectTypeID: 0,
    CFWorkflowID: 0,
    ApprovalID: 0,
    BlockchainID: 0,
    ProjectContractCount: 0,
    StartDate: new Date(),
    string: '',
    ProjectName: '',
    ProjectSummary: '',
    ProjectDescription: '',
    ProjectPrefix: '',
    Address: '',
    CompanyName: '',
    WebSite: '',
    EmailAddress: '',
    PhoneNumber: '',
    BusinessPhone: '',
    ContractAddress: '',
    PublicKey: '',
    PrivateKey: '',
    selectedTab: 0,
    selectedTab2: 0,

    stateHasChanged: false,
    CFProjects: [],
    saveCFProjects: [],
    CFProjectParticipants: [],
    saveCFProjectParticipants: [],

    CFProjectContracts: [],
    contractsSkip: 0,
    contractsTake: 8,
    participantsSkip: 0,
    participantsTake: 8,
    ProjectParticipants: [],
    CFParticipants: [],
    Currencies: [],
    ProjectTypes: [], //[{ text: 'Invoice Tracking 2', id: 1 }, { text: 'Supply-Chain 2', id: 2 }],
    CFProjectControlTypes: [],
    Workflows: [],
    Blockchains: [],
    ParticipantOwners: [],
    panes: [{ collapsible: true }, { size: '70%', min: '20px', collapsible: false }], // Note {}, removed
    nestedPanes: [{ size: '45%' }, { collapsible: true }]  // Note {}, removed
  };
  loadExistingPage = false;
  //Currencies = []; //[{ text: 'US Dollar', id: 1 }, { text: 'CDN Dollar', id: 2 }];
  //ProjectTypes = [{ text: 'Invoice Tracking 1', id: 1 }, { text: 'Supply-Chain 1', id: 2 }];  //[{ text: 'blank', id: 0}]; //
  async componentDidMount() {
    if (!SessionInfo.session)
      return;
    else {
      SessionInfo.currentPage = "ProjectDetail";
      SessionInfo.currSaveFunc = this.saveRecord;
      SessionInfo.currDeleteFunc = this.deleteRecord;
      SessionInfo.currClearFunc = this.clearRecord;
      SessionInfo.searchFunc = this.searchCurrent;
      document.documentElement.style.setProperty('--prompt-left', '150px');
      if (this.loadExistingPage === true)
        this.forceUpdate();
      else {
        if (this.state.ProjectTypes.length <= 1) {
          let CD = await GetDropdownData(492545);
          this.setState({ ProjectTypes: CD.d });
        }
        if (this.state.CFProjectControlTypes.length <= 1) {
          console.log("CFProjectControlTypeID: " + this.state.CFProjectControlTypeID);
          let CD = await GetDropdownData(544181);
          //console.log("Project Control Types: " + JSON.stringify(CD.d));
          this.setState({ CFProjectControlTypes: CD.d });
        }
        if (this.state.Workflows.length <= 1) {
          let CD = await GetDropdownData(543767);
          this.setState({ Workflows: CD.d });
        }
        if (this.state.Blockchains.length <= 1) {
          let CD = await GetDropdownData(543794);
          this.setState({ Blockchains: CD.d });
        }
        //console.log("Currencies: " + JSON.stringify(this.state.Currencies) + " lth: " + this.state.Currencies.length);
        if (this.state.Currencies.length <= 1) {
          let CD = await GetDropdownData(100717);
          this.setState({ Currencies: CD.d });
        }
        if (this.state.ParticipantOwners.length <= 1) {
          let CD = await GetDependentDropdownData(543727, this.state.CFProjectID, 543611);
          console.log("ProjectID: " + this.state.CFProjectID);
          //console.log("Project Owners: " + JSON.stringify(CD.d));
          this.setState({ ParticipantOwners: CD.d });
        }
        //console.log("CFWorkflowID: " + JSON.stringify(this.state.CFWorkflowID) );
        if (this.state.CFWorkflowID !== undefined) {
          let CD = await GetDependentDropdownData(543821, this.state.CFWorkflowID, 543769); // CFWorkflowRoles based on: this.state.CFWorkflowID
          RoleDD = CD.d;
        }
        else
          RoleDD = [{ ddName: '', ddid: 0 }];
        //console.log("Init RoleDD: " + JSON.stringify(RoleDD));
        if (this.state.CFProjectContracts.length === 0 || SessionInfo.ProjectContractsUpdated === true) {
          await this.getCFProjectContracts(""); // Get Participants
        }
        if (this.state.CFProjectParticipants.length === 0) {
          //console.log("Get ProjectParticipants");
          await this.getProjectParticipants(""); // Get Participants
        }
      }
    }
  }
  componentWillUnmount() {
    if (SessionInfo.session > 0)
      SessionInfo.ProjectDetail = this.state;
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  CommandCell;
  defaultProjectOwner = { text: "Select Owner ..." };
  defaultCFProjectControlTypeID = { text: "Select Type ..." };
  //-------------------- Page Edit -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  getProjectParticipants = async (search) => {
    if (!search)
      search = '';
    let CD = await GetTableSearch(543727, search + "*CFProjectID=" + this.state.CFProjectID + " and CFProjectContractID=0"); // Get Participants attached to this Project
    if (CD.x.o === 0)
      displayError("Access to OM Has Failed in " + SessionInfo.currentPage + " - Session: " + CD.x.s);
    else if (CD.x.o < 9500) {
      try {
        const CFProjectParticipants = CD.d.rows.map(dataItem => Object.assign({ selected: false }, dataItem));
        this.state.saveCFProjectParticipants = CFProjectParticipants;
        //console.log("Participants: " + JSON.stringify(CFProjectParticipants));
        this.setState({ CFProjectParticipants });
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  getCFProjectContracts = async (search) => {
    if (!search)
      search = '';
    let CD = await GetTableSearch(543972, search + "*CFProjectID=" + this.state.CFProjectID); // Get Participants attached to this Project
    if (CD.x.o === 0)
      displayError("Access to OM Has Failed in " + SessionInfo.currentPage + " - Session: " + CD.x.s);
    else if (CD.x.o < 9500) {
      try {
        const CFProjectContracts = CD.d.rows.map(dataItem => Object.assign({ selected: false }, dataItem));
        //console.log("Participants: " + JSON.stringify(CFProjectParticipants));
        this.setState({ CFProjectContracts });
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  getParticipantRecords = async (search) => { // Get the available Participants
    let CD;
    if (search === "")
      CD = await GetTableData(543619); // Get Participants attached to this Project
    else
      CD = await GetTableSearch(543619, search); // Get Participants attached to this Project
    if (CD.x.o === 0)
      displayError("Access to OM Has Failed in " + SessionInfo.currentPage + " - Session: " + CD.x.s);
    else if (CD.x.o < 9500) {
      try {
        const CFParticipants = CD.d.rows.map(dataItem => Object.assign({ selected: false }, dataItem));
        this.setState({ CFParticipants });
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  getRecord = async (Key) => {
    let CD = await GetRow(543609, Key); // Get the current ContractFlowProject
    //console.log("after Get: " + JSON.stringify(CD.d));
    this.setState({ CFProjectID: Key });
    for (var prop in CD.d.row) {
      if (prop in this.state) {
        //console.log("Set " + prop + ": " + CD.d.row[prop]);
        let obj = {};
        obj[prop] = CD.d.row[prop];
        if (prop.indexOf("Date") >= 0) {
          //console.log("Date - " + prop + ": " + CD.d.row[prop]);
          obj[prop] = new Date(CD.d.row[prop]); //new Date()
        }
        this.setState(obj);
      }
    }
    this.setState({ stateHasChanged: false });
  }
  searchCurrent = async (search) => {
    if (this.state.selectedTab2 === 0) {
      displayMessage("Search for Project Cases");
      await this.getCFProjectContracts(search);
    }
    else if (this.state.selectedTab2 === 1) {
      displayMessage("Search for Participants");
      await this.getProjectParticipants(search);
    }
  }
  searchParticipants = async (search) => {
    displayMessage("Search for Participants");
    await this.getParticipantRecords(search);
  }
  saveRecord = async () => {
    let copyState = Object.assign({}, this.state);
    let type = 0;
    for (var prop in copyState) {
      if (prop === "string") {
        type = 1;
        copyState[prop] = undefined;
      }
      else if (prop === "selectedTab")
        type = 2;
      else if (type === 0) {
      }
      if (type === 2) {
        copyState[prop] = undefined;
      }
    }
    if (copyState.ContractAddress === "")
      copyState.ContractAddress = "0x4b08A87E473fAa9271aF688E13Ca97a16cFCb5ca";
    if (this.state.CFProjectID > 0 && this.state.CFProjectOwnerID > 0 && this.state.CFProjectOwnerID !== SessionInfo.CFParticipantID)
      displayWarning("Only the Project Owner can update the Project");
    else {
      //console.log("copystate: " + JSON.stringify(copyState));
      await SaveRow(543609, copyState, copyState.CFProjectID, "CFProjectID"); // Save to OM
      this.setState({ stateHasChanged: false });
    }
  }
  deleteRecord = async () => {
    let CD = await DeleteRow(543609, this.state.CFProjectID);
    console.log("Delete Msg Lvl: " + CD.x.o);
    this.setState({ stateHasChanged: false });
  }
  clearRecord = async () => { // Note => functions do not bind their own this - if used clearRecord() - would have to bind this to the function
    //console.log("Clear Screen - state: " + JSON.stringify(this.state));
    let type = 0;
    for (var prop in this.state) {
      if (prop === "selectedTab")
        break;
      else if (prop === "string")
        type = 1;
      else if (type === 0) {
        let obj = {};
        if (prop.indexOf("Date") >= 0)
          obj[prop] = new Date();
        else
          obj[prop] = 0;
        this.setState(obj);
      }
      else if (type === 1) {
        let obj = {};
        obj[prop] = '';
        this.setState(obj);
      }
    }
    this.setState({ CFProjectParticipants: [] });
    this.setState({ stateHasChanged: false });
  }
  //-------------------- End of Page Edit -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //------------------------- Select Invite----------------------------------------------------------------------
  selectionInviteChange = (event) => {
    event.dataItem.selected = !event.dataItem.selected;
    this.forceUpdate();
  }
  // Add Participant to CFProjectParticipants
  rowInviteClick = async (event) => {
    if (this.state.CFProjectID > 0 && this.state.CFProjectOwnerID > 0 && this.state.CFProjectOwnerID !== SessionInfo.CFParticipantID) {
      displayWarning("Only the Project Owner can update the Project Participants");
      return;
    }
    let last = this.lastSelectedIndex;
    const current = this.state.CFParticipants.findIndex(dataItem => dataItem === event.dataItem);
    this.lastSelectedIndex = last = current;
    this.state.CFParticipants.forEach(item => item.selected = false);
    const select = !event.dataItem.selected;
    for (let i = Math.min(last, current); i <= Math.max(last, current); i++) {
      this.state.CFParticipants[i].selected = select;
    }
    let PKID = this.state.CFParticipants[current].CFParticipantID;
    const item = { CFProjectID: this.state.CFProjectID, CFParticipantID: PKID }
    let index = this.state.CFProjectParticipants.findIndex(p => p.CFParticipantID === PKID); //p.CFParticipantID === PKID);
    console.log("Select PKID: " + PKID + " index: " + index);
    if (index < 0) {
      await SaveRow(543720, item, 0, "CFPPID");
      await this.getProjectParticipants();
    }
    else {
      displayWarning(this.state.CFProjectParticipants[index].FirstName + " " + this.state.CFProjectParticipants[index].LastName + " - Participant is already in Project");
    }
  }

  headerInviteSelectionChange = (event) => {
    const checked = event.syntheticEvent.target.checked;
    this.state.CFParticipants.forEach(item => item.selected = checked);
    this.forceUpdate();
  }
  //------------------------- Select Main----------------------------------------------------------------------
  selectionChange = (event) => {
    event.dataItem.selected = !event.dataItem.selected;
    this.forceUpdate();
  }

  rowClick = (event) => {
    const current = this.state.CFProjectParticipants.findIndex(dataItem => dataItem === event.dataItem);
    if (current >= 0) {
      if (this.state.CFProjectParticipants.filter(p => p.inEdit).length > 0) { // If any row is in Edit
        displayWarning("Table is currently being edited");
        return;
      }
      let PKID = this.state.CFProjectParticipants[current].CFParticipantID;
      SessionInfo.SelectedParticipantID = PKID;
      this.props.history.push("/ParticipantProfile");
    }
  }
  caseRowClick = (event) => {
    const current = this.state.CFProjectContracts.findIndex(dataItem => dataItem === event.dataItem);
    if (current >= 0) {
      SessionInfo.SelectedProjectID = this.state.CFProjectID;
      SessionInfo.SelectedProjectContractID = this.state.CFProjectContracts[current].CFProjectContractID;
      this.props.history.push("/ProjectContract")
    }
  }
  contractsPageChange = (event) => {
    //console.log("Skip: " + event.page.skip + " Take: " + event.page.take);
    //console.log("Total: " + this.state.CFProjectContracts.length);
    this.setState({ contractsSkip: event.page.skip, contractsTake: event.page.take });
  }
  participantsPageChange = (event) => {
    this.setState({ participantsSkip: event.page.skip, participantsTake: event.page.take });
  }

  headerSelectionChange = (event) => {
    //const checked = event.syntheticEvent.target.checked;
    //this.state.CFParticipants.forEach(item => item.selected = checked);
    //this.forceUpdate();
  }
  //------------------------- Edit Grid ------------------------------------------------------------------
  enterInsert() {
    const dataItem = { inEdit: true };
    const allRecords = this.state.CFProjectParticipants.slice();
    allRecords.unshift(dataItem); // Add to the beginning
    this.updateCFPP(allRecords, dataItem);
    this.setState({ CFProjectParticipants: allRecords });
  }
  enterEdit(dataItem) {
    this.updateCFPP(this.state.CFProjectParticipants, dataItem).inEdit = true;
    this.setState({ CFProjectParticipants: this.state.CFProjectParticipants.slice() });
  }
  save(dataItem) {
    if (this.state.CFProjectID > 0 && this.state.CFProjectOwnerID > 0 && this.state.CFProjectOwnerID !== SessionInfo.CFParticipantID) {
      displayWarning("Only the Project Owner can update the Project Participants");
      return;
    }
    dataItem.inEdit = undefined;
    if (dataItem.CFPPID === undefined)
      dataItem.CFPPID = 0;
    dataItem.CFPPID = this.updateCFPP(this.state.CFProjectParticipants, dataItem).CFPPID;
    this.setState({ CFProjectParticipants: this.state.CFProjectParticipants.slice() });
    UpdateRow(543720, this.state.CFProjectParticipants, dataItem, dataItem.CFPPID, "CFPPID"); // Save to OM
  }
  cancel(dataItem) {
    if (dataItem.CFPPID) {
      let originalItem = this.state.saveCFProjectParticipants.find(p => p.CFPPID === dataItem.CFPPID)
      if (originalItem.inEdit) originalItem.inEdit = false;
      this.updateCFPP(this.state.CFProjectParticipants, originalItem);
    } else {
      this.updateCFPP(this.state.CFProjectParticipants, dataItem, !dataItem.CFPPID); // remove false
    }
    this.setState({ CFProjectParticipants: this.state.CFProjectParticipants.slice() });
  }
  remove(dataItem) {
    if (this.state.CFProjectID > 0 && this.state.CFProjectOwnerID > 0 && this.state.CFProjectOwnerID !== SessionInfo.CFParticipantID) {
      displayWarning("Only the Project Owner can update the Project Participants");
      return;
    }
    dataItem.inEdit = undefined;
    let key = dataItem.CFPPID;
    //console.log("remove: " + key);
    this.updateCFPP(this.state.CFProjectParticipants, dataItem, true);
    this.updateCFPP(this.state.saveCFProjectParticipants, dataItem, true);
    DeleteRow(543720, key); // Delete in the CFProjectParticipants Table in OM
    this.setState({ CFProjectParticipants: this.state.CFProjectParticipants.slice() });
  }
  itemChange(event) {
    const value = event.value;
    const name = event.field;
    if (!name) {
      return;
    }
    const updatedData = this.state.CFProjectParticipants.slice();
    const item = this.update(updatedData, event.dataItem);
    item[name] = value;
    this.setState({ CFProjectParticipants: updatedData });
  }
  updateCFPP(data, item, remove) {  // data - is the entire data set (JSON), item - is the current line
    let updated;
    //eslint-disable-next-line
    let index = data.findIndex(p => p === item || item.CFPPID && p.CFPPID === item.CFPPID); // Note - for new line will find 0
    if (index >= 0) {
      updated = Object.assign({}, item);
      data[index] = updated;
    }
    if (remove) {
      data = data.splice(index, 1);
    }
    return data[index];
  }
  //------------------------- Field Edit ------------------------------------------------------------------

  handleSelect = (e) => {
    this.setState({ selectedTab: e.selected });
    if (e.selected === 5) {
      displayMessage("Invite Participants");
      SessionInfo.searchFunc = this.searchParticipants;
      this.setState({ selectedTab2: 1 });
    }
    else
      SessionInfo.searchFunc = this.searchCurrent;
  }
  handle2Select = (e) => {
    this.setState({ selectedTab2: e.selected });
  }
  //handleSubmit = (event) => {
  //  event.preventDefault();
  //}
  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }
  chgFldVal(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ stateHasChanged: true });
  }
  chgDDFldVal = (event) => {
    this.setState({ [event.target.name]: event.target.value.ddid });
    this.setState({ stateHasChanged: true });
  }

  chgCheckboxVal(event) {
    //console.log("stateCopy-" + event.target.name + " : " + JSON.stringify(this.state[event.target.name]));
    let setVal = true;
    if (this.state[event.target.name] === true)
      setVal = false;
    this.setState({ [event.target.name]: setVal });
    this.setState({ stateHasChanged: true });
  }
  //------------------------- Field Edit ------------------------------------------------------------------

  onCreateProjectContract = async (event) => {
    const accounts = await getEthAccounts();
    if (accounts[0] === undefined) {
      displayError("MetaMask must be Setup and Logged On in order to Create a Project Contract");
      return;
    }
    else {
      displayMessage("Metamask is active");
      SessionInfo.SelectedProjectID = this.state.CFProjectID;
      console.log("Create - ProjectID: " + this.state.CFProjectID);
      SessionInfo.SelectedProjectContractID = 0;
      this.props.history.push("/ProjectContract");
    }
  }

  onLayoutChange = (updatedState) => {
    this.setState({ panes: updatedState });
  }
  onNestedLayoutChange = (updatedState) => {
    this.setState({ nestedPanes: updatedState });
  }

  render() {
    if (!SessionInfo.session)
      return (<Redirect to='/' />);
    return (
      <div id="ProjectDetail" className="pageMain">
        <PageHeader L1='Home' Select='2' Title='Project Details' IsApp='y' />
        <div id="mainCntr">
          <Splitter style={{ height: '100%' }} panes={this.state.nestedPanes} orientation={'vertical'} onLayoutChange={this.onNestedLayoutChange}>
            <Splitter panes={this.state.panes} onLayoutChange={this.onLayoutChange}>
              <div id="splitterLeft">
                <div id="div1" className="editInside">
                </div>
              </div>
              <div id="splitterRight">
              </div>
            </Splitter>
            <div id="splitterBottom">
              <TabStrip selected={this.state.selectedTab2} onSelect={this.handle2Select}>
                <TabStripTab title="Project Contracts">
                  <div className="editTab">
                    <TGrid style={{ position: 'absolute', top: 0, height: '100%' }} data={this.state.CFProjectContracts.slice(this.state.contractsSkip, this.state.contractsTake + this.state.contractsSkip)}
                      skip={this.state.contractsSkip} take={this.state.contractsTake} total={this.state.CFProjectContracts.length} onPageChange={this.contractsPageChange}
                      onRowClick={this.caseRowClick} resizable={true}
                      pageable={{ info: true, type: 'numeric', pageSizes: true, previousNext: true }}
                      pageSize={8}>
                      <Column field="CFProjectContractID" title="Contract ID" filter="numeric" width='1px' />
                      <Column field="ProjectContractName" title="Project Contract" width='200px' />
                      <Column field="Description" title="Description" width='350px' />
                      <Column field="CurrentStepID" title="Current Step" width='180px' />
                      <Column field="CurrentRoleID" title="Current Role" width='180px' />
                      <Column field="CFProjectStatusID" title="Status" width='180px' />
                    </TGrid>
                  </div>
                </TabStripTab>
                <TabStripTab title="Project Participants">
                  <div className="editTab">
                    <TGrid style={{ position: 'absolute', top: 0, height: '100%' }} data={this.state.CFProjectParticipants.slice(this.state.participantsSkip, this.state.participantsTake + this.state.participantsSkip)} onItemChange={this.itemChangeRole} editField="inEdit"
                      onSelectionChange={this.selectionChange}
                      onHeaderSelectionChange={this.headerSelectionChange}
                      onRowClick={this.rowClick} resizable={true}
                      skip={this.state.participantsSkip} take={this.state.participantsTake} total={this.state.CFProjectParticipants.length} onPageChange={this.participantsPageChange}
                      pageable={{ info: true, type: 'numeric', pageSizes: true, previousNext: true }}
                      pageSize={8}>
                      <Column field="CFParticipantID" title="Participant Id" filter="numeric" width='1px' />
                      <Column field="FirstName" title="First Name" width='150px' />
                      <Column field="LastName" title="Last Name" width='150px' />
                      <Column field="EmailAddress" title="Email Address" width='230px' />
                      <Column field="WalletAddress" title="Wallet Address" width='330px' />
                      <Column field="CFWorkflowRoleID" title="Role" cell={RoleDropDownCell} width='180px' />
                      <Column cell={this.CommandCell} width="260px" />
                    </TGrid>
                  </div>
                </TabStripTab>
              </TabStrip>
            </div>
          </Splitter>
        </div>
        <PageFooter L1='Home' IsApp='y' />
      </div >
    );
  }
}

export default ProjectDetail;