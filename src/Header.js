import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-select/dist/react-select.css';

import { Container, Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';
import Modal from 'react-modal';
import { FaClose } from 'react-icons/lib/fa';
import Select from 'react-select';

/* CUSTOM STYLE FOR MODAL */
const customStyles = {
    content : {
        width                 : '400px',
        height                : '450px',
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

const status = [
    {
        "value" : "pendente",
        "label" : "Pendente"
    },
    {
        "value" : "em-producao",
        "label" : "Em Produção"
    },
    {
        "value" : "resolvida",
        "label" : "Resolvida"
    }
]

class Header extends Component {
    constructor(props){
        super(props);

        this.state = {
            dialogOpen : false,
            userActive : {
                "id" : props.userActive.id,
                "name" : props.userActive.name,
                "img" : props.userActive.img,
                "job" : props.userActive.job,
                "pendentes" : props.userActive.pendentes,
                "emProducao" : props.userActive.emProducao,
                "resolvidas" : props.userActive.resolvidas
            },
            users : props.users,
            tasks : props.tasks,
            status : status,
            taskDescricao : "",
            taskResponsavel : this.props.userActive.id,
            taskStatus: "pendente",
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    updateInputTaskDescricao = (e) => {
        return this.setState({
            taskDescricao: e.target.value
        })
    }

    handleChangeTaskResponsavel = (taskResponsavel) => {
        this.setState({taskResponsavel : taskResponsavel});
    }

    handleChangeTaskStatus = (taskStatus) => {
        this.setState({taskStatus : taskStatus});
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            userActive : {
                "id" : nextProps.userActive.id,
                "name" : nextProps.userActive.name,
                "img" : nextProps.userActive.img,
                "job" : nextProps.userActive.job,
                "pendentes" : nextProps.userActive.pendentes,
                "emProducao" : nextProps.userActive.emProducao,
                "resolvidas" : nextProps.userActive.resolvidas
            },
            tasks : nextProps.tasks,
            users : nextProps.users
        });
    }

    insertTask = () => {

        let newTask = {
            "id" : (this.state.tasks.length+1),
            "descricao" : this.state.taskDescricao,
            "responsavel" : this.state.taskResponsavel,
            "status" : this.state.taskStatus
        }

        let tempTask = this.state.tasks;

        tempTask.push(newTask);

        this.setState({
            tasks : tempTask,
            modalIsOpen : false
        });

        this.props.callbackParent(tempTask);
    }

    render(){
        return (
          <Container>
              <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Adicionar Task"
                  ariaHideApp={false}
              >
                  <Row>
                      <Col md={10}>
                          <h3 className="title-modal">Adicionar Task</h3>
                          <hr />
                      </Col>
                      <Col md={2}>
                          <button className="button-close" onClick={this.closeModal}>
                              <FaClose/>
                          </button>
                      </Col>
                  </Row>
                  <Form>
                      <FormGroup>
                          <Label for="descricao">Descricao</Label>
                          <Input
                              type="text"
                              name="descricao"
                              id="descricao"
                              value={this.state.taskDescricao}
                              onChange={this.updateInputTaskDescricao}
                          />
                      </FormGroup>
                      <FormGroup>
                          <Label  for="usu-resp">Responsável</Label>
                          <Select
                              id="usu-resp"
                              options={this.state.users}
                              simpleValue
                              name="usu-resp"
                              onChange={this.handleChangeTaskResponsavel}
                              value={this.state.taskResponsavel}
                          />
                      </FormGroup>
                      <FormGroup>
                          <Label  for="status">Status</Label>
                          <Select
                              id="status"
                              options={this.state.status}
                              simpleValue
                              name="status"
                              onChange={this.handleChangeTaskStatus}
                              value={this.state.taskStatus}
                          />
                      </FormGroup>
                      <button className="button-primary" type="button" onClick={this.insertTask}>
                          <span className="icon-Add"></span>
                          Adicionar Task
                      </button>
                  </Form>
              </Modal>
              <Row>
                  <Col md={3} sm={6}>
                    <img
                      src={this.state.userActive.img}
                      alt={this.state.userActive.name}
                      className="avatar-user"
                    />
                  </Col>
                  <Col md={5} sm={4}>
                      <div className="circle-on"></div>
                      <span className="user-name">{this.state.userActive.name}</span>
                      <br/>
                      <span className="user-job">{this.state.userActive.job}</span>
                      <hr/>
                      <span className="title">Você possuí</span>
                      <Row className="line-types">
                        <Col md={4}>
                            <span className="number-title">{this.state.userActive.pendentes}</span>
                            <br/>
                            <span className="title">pendentes</span>
                        </Col>
                          <Col md={4}>
                              <span className="number-title">{this.state.userActive.emProducao}</span>
                              <br/>
                              <span className="title">em produção</span>
                          </Col>
                          <Col md={4}>
                              <span className="number-title">{this.state.userActive.resolvidas}</span>
                              <br/>
                              <span className="title">resolvidas</span>
                          </Col>
                      </Row>
                  </Col>
                  <Col md={4} sm={12} className="text-center ">
                      <button className="button-primary" onClick={this.openModal}>
                          <span className="icon-Add"></span>
                          Adicionar Task
                      </button>
                  </Col>
              </Row>
          </Container>
        );
    }
}

export default Header;
