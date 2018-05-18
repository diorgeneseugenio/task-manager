import React, { Component } from 'react';

import './dist/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Header';
import Content from './Content';

import { Row, Col } from 'reactstrap';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      users : [
          {
              "value" : 1,
              "label" : "Lisa Helma Davoz",
              "id" : 1,
              "name" : "Lisa Helma Davoz",
              "job" : "Senior Dev",
              "img" : "images/lisaHelma.jpg",
              "pendentes" : 0,
              "emProducao" : 0,
              "resolvidas" : 0
          },
          {
              "value" : 2,
              "label" : "Ásta Grietin",
              "id" : 2,
              "name" : "Ásta Grietin",
              "job" : "Dev",
              "img" : "images/astaGrietin.jpg",
              "pendentes" : 0,
              "emProducao" : 0,
              "resolvidas" : 0
          },
          {
              "value" : 3,
              "label" : "Basit Boaz",
              "id" : 3,
              "name" : "Basit Boaz",
              "job" : "Support",
              "img" : "images/basitBoaz.jpg",
              "pendentes" : 0,
              "emProducao" : 0,
              "resolvidas" : 0
          },
          {
              "value" : 4,
              "label" : "Rakesh Gavril",
              "id" : 4,
              "name" : "Rakesh Gavril",
              "job" : "Data Science",
              "img" : "images/rakeshGavril.jpg",
              "pendentes" : 0,
              "emProducao" : 0,
              "resolvidas" : 0
          },
          {
              "value" : 5,
              "label" : "Jordana Doe",
              "id" : 5,
              "name" : "Jordana Doe",
              "job" : "Senior Dev",
              "img" : "images/jordanaDoe.jpg",
              "pendentes" : 0,
              "emProducao" : 0,
              "resolvidas" : 0
          },
          {
              "value" : 6,
              "label" : "Alex Henderson",
              "id" : 6,
              "name" : "Alex Henderson",
              "job" : "Administrator",
              "img" : "images/alexHenderson.jpg",
              "pendentes" : 0,
              "emProducao" : 0,
              "resolvidas" : 0
          }
      ],
      userActive : 1,
      tasks : [],
      pendentes: [],
      emProducao: [],
      resolvidas: [],
    }
  }

  reorderLists() {
      let newPendente = [];
      let newEmProducao = [];
      let newResolvida = [];
      if(this.state.tasks.length > 0) {
          this.state.tasks.map((item) => {
              if (item.status === "pendente") {
                  newPendente.push(item);
              } else if (item.status === "em-producao") {
                  newEmProducao.push(item);
              } else if (item.status === "resolvida") {
                  newResolvida.push(item);
              }
          });
      }
      this.setState({
          "pendentes" : newPendente,
          "emProducao" : newEmProducao,
          "resolvidas" : newResolvida
      })
  }

  onAddTask = (tasks) => {
      this.setState({ tasks : tasks}, function(){
        this.reorderLists();
      });

  }

  onRemoveTask = (tasks) => {
      this.setState({tasks : tasks}, function(){
          this.reorderLists();
      });
  }

  onUpdateList = (list) => {
      this.setState({
          list
      });
  }

  getResponsavel = (id) => {
      let userResp = {};
      this.state.users.map((item) => {
          if(item.id === id){
              userResp = item;
          }
      });

      let pendentes = 0;
      let emProducao = 0;
      let resolvidas = 0;

      if(this.state.tasks.length > 0){
          this.state.tasks.map((item) => {
              if (item.responsavel === id){
                if (item.status === "pendente"){
                    pendentes++;
                } else if (item.status === "em-producao") {
                    emProducao++;
                } else if (item.status === "resolvida") {
                    resolvidas++;
                }
              }
          });
      }

      userResp = {
          "value" : userResp.value,
          "label" : userResp.label,
          "id" : userResp.id,
          "name" : userResp.name,
          "job" : userResp.job,
          "img" : userResp.img,
          "pendentes" : pendentes,
          "emProducao" : emProducao,
          "resolvidas" : resolvidas
      }

      console.log(userResp);

      return userResp;
  }

  updateResp = (resp) => {
      this.setState({
         userActive : resp
      });
  }

  render() {

    let userActive = this.getResponsavel(this.state.userActive);

    return (
        <Row>
          <Col md={{ size: 8, offset: 2 }} sm={12}>
              <Header
                  userActive={ userActive }
                  users={ this.state.users }
                  tasks={ this.state.tasks }
                  pendentes={this.state.pendentes}
                  emProducao={this.state.emProducao}
                  resolvidas={this.state.resolvidas}
                  callbackParent={ (tasks) => this.onAddTask(tasks) }
              />
              <Content
                  users={ this.state.users }
                  tasks={ this.state.tasks }
                  pendentes={this.state.pendentes}
                  emProducao={this.state.emProducao}
                  resolvidas={this.state.resolvidas}
                  callbackParent={ (list) => this.onUpdateList(list) }
                  removeTasks={ (tasks) => this.onRemoveTask(tasks) }
                  updateResp={ (resp) => this.updateResp(resp) }
              />
          </Col>
        </Row>
    );
  }
}

export default App;
