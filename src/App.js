import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Nav, NavItem,ListGroup,ListGroupItem, Button,Glyphicon,InputGroup,FormControl,Span} from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={count:2,number_tabs:2, active_tab:'0',tabs_titles:[{title:'Main',id:0,editable:false},{title:'Annex',id:1,editable:false}],tasks:[{title:'Hi',complete:false,tab:0,id:0},{title:'Hiii',complete:false,tab:1,id:1}]}
    this.changeTab=this.changeTab.bind(this);
    this.addTab=this.addTab.bind(this);
    this.toggleTask=this.toggleTask.bind(this);
    this.addTask=this.addTask.bind(this)
    this.toggleModification=this.toggleModification.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.deleteTask=this.deleteTask.bind(this)
    this.removeTab=this.removeTab.bind(this)
    this.editTab=this.editTab.bind(this)
    this.handleTabChange=this.handleTabChange.bind(this)
    this.validateTabChange=this.validateTabChange.bind(this)
  }
  removeTab(e){
    var arr=this.state.tabs_titles.slice(0)
    console.log(e.target.id)
    arr=arr.filter(function(ele){return ele.id!=e.target.id})
    console.log(arr)
    this.setState({count:this.state.count,number_tabs:this.state.number_tabs,active_tab:'0',tabs_titles:arr,tasks:this.state.tasks.filter(function(elem){return elem.tab!=e.target.id})})
  }
  editTab(e){
    var arr=this.state.tabs_titles.slice(0);
    var elem=arr.filter(function(elem){return elem.id==e.target.id})
    arr=arr.filter(function(elem){return elem.id!=e.target.id})
    var elem1={title:elem[0].title,id:elem[0].id,editable:true}
    this.setState({tabs_titles:arr.concat(elem1),count:this.state.count,number_tabs:this.state.number_tabs,active_tab:'0',tasks:this.state.tasks})
  }
  handleTabChange(e){
    var arr=this.state.tabs_titles.slice(0);
    var elem=arr.filter(function(elem){return elem.id==e.target.id})
    arr=arr.filter(function(elem){return elem.id!=e.target.id})
    var elem1={title:e.target.value,id:elem[0].id,editable:true}
    this.setState({tabs_titles:arr.concat(elem1),count:this.state.count,number_tabs:this.state.number_tabs,active_tab:'0',tasks:this.state.tasks})
  }
  validateTabChange(e){
    console.log(e)
    if(e.key=='Enter'){
      var arr=this.state.tabs_titles.slice(0);
      var elem=arr.filter(function(elem){return elem.id==e.target.id})
      arr=arr.filter(function(elem){return elem.id!=e.target.id})
      var elem1={title:elem[0].title,id:elem[0].id,editable:false}
      this.setState({tabs_titles:arr.concat(elem1),count:this.state.count,number_tabs:this.state.number_tabs,active_tab:'0',tasks:this.state.tasks})
    }
  }

  changeTab(selectedKey){
    this.setState({active_tab:selectedKey})
  }
  addTab(){
    this.setState({number_tabs:this.state.number_tabs+1, tabs_titles:this.state.tabs_titles.concat({title:'New Tab',id:this.state.number_tabs,editable:false}),count:this.state.count+1, tasks:this.state.tasks.concat({title:'New Task',complete:false,tab:this.state.number_tabs+1,editable:false,id:this.state.count})})
  }
  addTask(){
    this.setState({count:this.state.count+1,tasks:this.state.tasks.concat({title:'New Task',complete:false,tab:this.state.active_tab,id:this.state.count,editable:false})})
  }
  handleChange(e){
    var task=this.state.tasks.filter(function(ele){return (ele.id==e.target.id)})
    task=task[0]
    task={title:e.target.value,complete:task.complete,id:task.id,tab:task.tab,editable:true}
    this.setState({tasks:this.state.tasks.filter(function(ele){return (ele.id!=e.target.id)}).concat(task)})
  }
  toggleTask(e){
    var task=this.state.tasks.filter(function(ele){return (ele.id==e.target.id)})
    task=task[0]
    task={title:task.title,complete:!task.complete,id:task.id,tab:task.tab,editable:this.state.editable}
    this.setState({tasks:this.state.tasks.filter(function(ele){return (ele.id!=e.target.id)}).concat(task)})
  }
  deleteTask(e){
    console.log(e.target)
    this.setState({tasks:this.state.tasks.filter(function(ele){return (ele.id!=e.target.id)})})
  }
  toggleModification(e){
    var task=this.state.tasks.filter(function(ele){return (ele.id==e.target.id)})
    task=task[0]
    task={title:task.title,complete:task.complete,id:task.id,tab:task.tab,editable:!task.editable}
    this.setState({tasks:this.state.tasks.filter(function(ele){return (ele.id!=e.target.id)}).concat(task)})
  }
  render() {
    return (
      <div>
        <Menu numberTabs={this.state.number_tabs} handleTabChange={this.handleTabChange} activeTab={this.state.active_tab} changeTab={this.changeTab} validateTabChange={this.validateTabChange}nameTabs={this.state.tabs_titles} removeTab={this.removeTab} editTab={this.editTab} addTab={this.addTab}/>
        <ToDoList deleteTask={this.deleteTask}tasks={this.state.tasks} handleChange={this.handleChange} toggleModif={this.toggleModification} activeTab={this.state.active_tab} addTask={this.addTask} toggleTask={this.toggleTask}/>
      </div>
    );
  }
}
class Menu extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    var self=this;
    const NavTabs=this.props.nameTabs.map(function(fw, i){
      if(!fw.editable){
      return <NavItem eventKey={fw.id}>{fw.title}<Glyphicon glyph='pencil' id={fw.id} onClick={self.props.editTab}style={{fontSize:'1em',lineHeight:'2em',marginLeft:'3em'}}/><Glyphicon glyph='remove' id={fw.id} onClick={self.props.removeTab} style={{fontSize:'1em',lineHeight:'2em',marginLeft:'1em'}}/></NavItem>
    }
      else{
        return <NavItem><FormControl id={fw.id} onSubmit={self.props.editTab} onKeyDown={self.props.validateTabChange} onChange={self.props.handleTabChange} type='text' defaultValue={fw.title}/></NavItem>
    }
    })
    return <div>
      <Nav bsStyle="tabs" activeKey={this.props.activeTab} onSelect={this.props.changeTab}>
       {NavTabs}
       <NavItem onClick={this.props.addTab} ><Glyphicon glyph="plus" style={{verticalAlign:'middle',position:'inherit'}}/>  </NavItem>
      </Nav>
      </div>

  }
}
class ToDoList extends Component{
  constructor(props) {
    super(props);

  }
  render(){
    var self=this;
    const TasksEl=this.props.tasks.filter(function(elem){return elem.tab==this.props.activeTab},this).map(function(fw,i){
      if(!fw.editable){
        return <ToDoElement deleteTask={self.props.deleteTask} toggleModif={self.props.toggleModif} id={fw.id} done={fw.complete?true:false} name={fw.title} toggleTask={self.props.toggleTask}/>
      }
      else{
         return <EditableToDoElement toggleModif={self.props.toggleModif} handleChange={self.props.handleChange} id={fw.id} name={fw.title}/> 
        }
      })
    return(
      <ListGroup>
        {TasksEl}
        <ListGroupItem style={{borderStyle:'none'}}  onClick={this.props.addTask}><Glyphicon glyph="plus" /></ListGroupItem>
      </ListGroup>
      );
  }
}
class ToDoElement extends Component{
  render(){
    return(<ListGroupItem >{this.props.name}
      {!this.props.done && <Button id={this.props.id} onClick={this.props.toggleTask} style={{borderStyle:'none',float:'right',backgroundColor:'transparent'}}>  <Glyphicon id={this.props.id} glyph="ok" /></Button>}
      {this.props.done && <Button id={this.props.id} onClick={this.props.toggleTask} style={{borderStyle:'none',float:'right',backgroundColor:'transparent',color:'green'}}>  <Glyphicon id={this.props.id} glyph="ok" /></Button>}
      <Button id={this.props.id} onClick={this.props.deleteTask} style={{borderStyle:'none',float:'right',backgroundColor:'transparent'}}  ><Glyphicon id={this.props.id} glyph='remove'/></Button>
      <Button id={this.props.id} onClick={this.props.toggleModif} style={{borderStyle:'none',float:'right',backgroundColor:'transparent'}}  ><Glyphicon id={this.props.id}glyph='pencil'/></Button>
      </ListGroupItem>)
  }
}
class EditableToDoElement extends Component{
  render(){
    return(<ListGroupItem><InputGroup id={this.props.id}> <FormControl type='text'  id={this.props.id} onChange={this.props.handleChange}  style={{display:'inline'}} type="text" defaultValue={this.props.name}/>
        <InputGroup.Addon id={this.props.id}>
        <Glyphicon  id={this.props.id} onClick={this.props.toggleModif}glyph='ok'/>
        </InputGroup.Addon></InputGroup> 
      </ListGroupItem>)
  }
}

export default App;
