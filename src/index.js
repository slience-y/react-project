import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TodoList extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            text: '',
            doingCount: 1,
            doneCount: 1,
            lists: [
                {
                    id: 1,
                    text: "学习react",
                    status: false,
                },
                {
                    id: 2,
                    text: "学习git",
                    status: true,

                }
            ],
            
        }         
        this.handleAddDoingThing=this.handleAddDoingThing.bind(this);
        this.handleDeleteThing=this.handleDeleteThing.bind(this);
        this.handleUpdateThing=this.handleUpdateThing.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(input){
        this.setState({
            text: input
        })
    }

    handleAddDoingThing() {        
        if(this.state.text.length === 0){
            return;
        }

        const list = {
            id: Date.now(),
            text: this.state.text,
            status: false
        };

        this.setState({
            lists: [...this.state.lists,list],
            text: '' ,
            doingCount: this.state.doingCount + 1      
        });
        
    }

    handleUpdateThing(targetid) {
        let lists = this.state.lists;
        let findlist=lists.find(list => list.id === targetid);
        findlist.status = !findlist.status;
        if(!findlist.status){
            this.setState({
                lists: lists,
                doingCount: this.state.doingCount + 1,
                doneCount : this.state.doneCount - 1, 
            })
        }else{
            this.setState({
                lists: lists,
                doingCount: this.state.doingCount - 1,
                doneCount : this.state.doneCount + 1, 
            })
       
        }
        
    }

    handleDeleteThing(targetid,status) {
        let lists = this.state.lists;
        lists=lists.filter(list => list.id !== targetid)
        if(status){
            this.setState({
                lists: lists,
                doneCount: this.state.doneCount - 1
            });
        }else{
            this.setState({
                lists: lists,
                doingCount: this.state.doingCount - 1
            });

        }
    }


    render(){
        return (
            <div>
               <Search 
               onChange = {this.handleChange}
               onAddDoingThing = {this.handleAddDoingThing}
               text = {this.state.text}
               />
               <DoingThings 
               lists = {this.state.lists}
               doingCount=  {this.state.doingCount}
               onUpdateThing={this.handleUpdateThing} 
               onDeleteThing={this.handleDeleteThing}
               />
               <DoneThings 
               onUpdateThing={this.handleUpdateThing} 
               onDeleteThing={this.handleDeleteThing}            
               lists = {this.state.lists}
               doneCount=  {this.state.doneCount}              
               />
               <footer>
			    Copyright &copy; 2014 todolist.cn 
                <i>clear</i>
		       </footer>
            </div>
               );
            }

}

class  Search extends React.Component{
    constructor(props){
        super(props);
        this.handleAddDoingThing=this.handleAddDoingThing.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    handleAddDoingThing(e){
        e.preventDefault();
        this.props.onAddDoingThing();
    }
    handleChange(e){
        this.props.onChange(e.target.value);
    }

  render() {
      return (      
        <header>
            <section>
            <form 
            action="" 
            id="form"
            onSubmit={this.handleAddDoingThing} 
            >
                <label>ToDoList</label>
                <input 
                type="text"  
                placeholder="添加ToDo" 
                autoComplete="off"
                value ={this.props.text} 
                onChange = {this.handleChange}
                />
            </form>
            </section>
        </header>    
      );
  }
}

class DoingThings extends React.Component{
    render(){
        let lists=this.props.lists.filter(list => list.status === false);
        
        return (
            <section>
            <h2>正在进行 <span id="doingcount">{this.props.doingCount}</span></h2>
			<ol>
                {
                    lists.map((list) => {
                        return (
                            <ThingRow
                            status={list.status}
                             key={list.id}
                             targetid={list.id}
                             text={list.text} 
                             onDeleteThing={this.props.onDeleteThing} 
                             onUpdateThing={this.props.onUpdateThing}
                             />                   
                        )
                    })
               }                                 
			</ol>
            </section>
        );
    }
}

class DoneThings extends React.Component{
    
    render(){
        let lists=this.props.lists.filter(list => list.status === true);
        
        return (
            <section>
            <h2>已经完成 <span id="donecount">{this.props.doneCount}</span></h2>
			<ul id="donelist">
                {
                    lists.map((list) => {
                        return (
                            <ThingRow
                             key={list.id} 
                             targetid={list.id}
                             text={list.text} 
                             status={list.status}
                             onDeleteThing={this.props.onDeleteThing} 
                             onUpdateThing={this.props.onUpdateThing}
                            />
                    
                        )
                    })
               }
                                  
			</ul>
            </section>
        );
    }
}


class ThingRow extends React.Component{
    constructor(props){
        super(props);
        this.handleDeleteThing=this.handleDeleteThing.bind(this);
        this.handleUpdateThing=this.handleUpdateThing.bind(this);
    }

    handleUpdateThing(){
        this.props.onUpdateThing(this.props.targetid);
    }
    
    handleDeleteThing(e){
        e.preventDefault();
        this.props.onDeleteThing(this.props.targetid,this.props.status);
    }

    render(){
        return ( 
            <li>
                <input type="checkbox" 
                onChange={this.handleUpdateThing} 
                checked={this.props.status}
                />
                <p>{this.props.text}</p>
                <button onClick={this.handleDeleteThing}></button>
            </li>
        );
    }

}

ReactDOM.render(<TodoList />,
    document.getElementById('root')
    );