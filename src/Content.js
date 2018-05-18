import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';
/* import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';*/

/*
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};
*/

/*
const grid = 4;
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? '#ececec' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = {
    background: 'white',
    padding: grid,
    width: '100%'
};
*/

class Content extends Component {

    constructor(props){
        super(props);

        this.state = {
            tasks : props.tasks,
            user : props.users,
            pendentes : props.pendentes,
            emProducao : props.emProducao,
            resolvidas : props.resolvidas,
        }

        /* this.onDragEnd = this.onDragEnd.bind(this); */
    }
    /*
        id3List = {
            droppable: 'pendentes',
            droppable2: 'emProducao',
            droppable3: 'resolvidas'
        };

        getList = id => this.state[this.id3List[id]];

        onDragEnd = result => {
            const { source, destination } = result;

            if (!destination) {
                return;
            }

            if (source.droppableId === destination.droppableId) {
                const items = reorder(
                    this.getList(source.droppableId),
                    source.index,
                    destination.index
                );

                let state = { items };

                if (source.droppableId === 'droppable') {
                    state = { pendentes : items };
                } else if(source.droppableId === 'droppable2') {
                    state = { emProducao : items };
                } else if(source.droppableId === 'droppable3') {
                    state = { resolvidas : items };
                }

                this.setState(state);
            } else {
                const result = move(
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                );

                let sourceList = this.getList(source.droppableId);
                let destinationList = this.getList(source.droppableId);

                let state = {};

                if (source.droppableId === 'droppable' && destination.droppableId === 'droppable2') {
                    state = {
                        pendentes: sourceList,
                        emProducao: destinationList
                    }
                } else if (source.droppableId === 'droppable' && destination.droppableId === 'droppable3'){
                    state = {
                        pendentes : sourceList,
                        resolvidas : destinationList
                    }
                }

                this.setState({
                    state
                });

                console.log("CONTENT");
                console.log(state);

                let parentList = {
                    pendentes : this.state.pendentes,
                    emProducao : this.state.emProducao,
                    resolvidas : this.state.resolvidas
                }

                this.props.callbackParent(parentList);
            }
        };
        */

    getReponsavel = (id) => {
        let userResp = "";
        this.state.user.map((item) => {
            if(item.id === id){
                userResp = item;
            }
        });

        return (
            <div>
                <img className="img-list" alt={ userResp.name } src={ userResp.img } />
                <span>{ userResp.name }</span>
            </div>
        )
    }

    removeTask(newItem){
        let newTasks = [];
        if(this.state.tasks.length > 0) {
            this.state.tasks.map((item) => {
                if (item.id !== newItem.id) {
                    newTasks.push(item);
                }
            })
        }
        this.props.removeTasks(newTasks);
    }

    updateResponsavel(resp){
        this.props.updateResp(resp);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            tasks : nextProps.tasks,
            user : nextProps.users,
            pendentes : nextProps.pendentes,
            emProducao : nextProps.emProducao,
            resolvidas : nextProps.resolvidas,
        });
    }

    render(){
        {/*

        ##TODO - drag and drop
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle}>
                                {this.state.pendentes.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                </div>
                                  )}
                                    </Draggable>

                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                    */}

        const { pendentes } = this.state
        const pendentesList = pendentes.map((item, i) => {
            return (
                <Row className="listTasks" key={i}>
                    <Col className="withoutline" md={1}>
                        <span className="icon-drag"></span>
                    </Col>
                    <Col className="underline" md={3}>
                        {item.descricao}
                    </Col>
                    <Col  className="underline" md={3} onClick={this.updateResponsavel.bind(this, item.responsavel)}>
                        { this.getReponsavel(item.responsavel) }
                    </Col>
                    <Col className="underline" md={3}>
                        <span className="light-pendente"></span>
                        Pendente
                    </Col>
                    <Col className="withoutline" md={1}>
                        <span onClick={this.removeTask.bind(this, item)} className="icon-trash"></span>
                    </Col>
                </Row>
            )
        });

        const { emProducao } = this.state
        const emProducaoList = emProducao.map((item, i) => {
            return (
                <Row className="listTasks" key={i}>
                    <Col className="withoutline" md={1}>
                        <span className="icon-drag"></span>
                    </Col>
                    <Col className="underline" md={3}>
                        {item.descricao}
                    </Col>
                    <Col  className="underline" md={3} onClick={this.updateResponsavel.bind(this, item.responsavel)}>
                        { this.getReponsavel(item.responsavel) }
                    </Col>
                    <Col className="underline" md={3}>
                        <span className="light-producao"></span>
                        Em Produção
                    </Col>
                    <Col className="withoutline" md={1}>
                        <span onClick={this.removeTask.bind(this, item)} className="icon-trash"></span>
                    </Col>
                </Row>
            )
        });

        const { resolvidas } = this.state
        const resolvidasList = resolvidas.map((item, i) => {
            return (
                <Row className="listTasks" key={i}>
                    <Col className="withoutline" md={1}>
                        <span className="icon-drag"></span>
                    </Col>
                    <Col className="underline" md={3}>
                        {item.descricao}
                    </Col>
                    <Col  className="underline" md={3} onClick={this.updateResponsavel.bind(this, item.responsavel)}>
                        { this.getReponsavel(item.responsavel) }
                    </Col>
                    <Col className="underline" md={3}>
                        <span className="light-resolvida"></span>
                        Resolvida
                    </Col>
                    <Col className="withoutline" md={1}>
                        <span onClick={this.removeTask.bind(this, item)} className="icon-trash"></span>
                    </Col>
                </Row>
            )
        });


        return (
            <Container className="tasks">
                    <Row className="status">
                        <Col md={1}>
                            <span className="light-pendente"></span>
                        </Col>
                        <Col md={11}>
                            <span>Pendente</span>
                        </Col>
                    </Row>
                    { pendentesList }
                    <Row className="status">
                        <Col md={1}>
                            <span className="light-producao"></span>
                        </Col>
                        <Col md={11}>
                            <span>Em Produção</span>
                        </Col>
                    </Row>
                    { emProducaoList }
                    <Row className="status">
                        <Col md={1}>
                            <span className="light-resolvida"></span>
                        </Col>
                        <Col md={11}>
                            <span>Resolvidas</span>
                        </Col>
                    </Row>
                    { resolvidasList }
            </Container>
        );
    }
}

export default Content;
