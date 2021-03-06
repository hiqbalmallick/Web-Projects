import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signinaction } from '../store/action/action';
import { FormGroup, FormControl, ControlLabel, Col, Button, Modal, Form, ButtonToolbar } from 'react-bootstrap';
import validator from 'validator';


class Signin extends Component {
    constructor(...args) {
        super(...args);

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.getValidationStateForEmail = this.getValidationStateForEmail.bind(this);
        this.getValidationStateForPassword = this.getValidationStateForPassword.bind(this);
        this.getValidationStateForButton = this.getValidationStateForButton.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);

        this.state = {
            show: false,
            email: '',
            password: '',
            button: false
        };
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleHide() {
        this.setState({ show: false });
    }

    getValidationStateForButton() {
        if (this.state.email === '' || this.state.password === '') {
            return true;
        }
        return false;
    }

    getValidationStateForEmail() {
        if (this.state.email === '') return null;
        else if (!validator.isEmail(this.state.email)) return "error";
        else if (validator.isEmail(this.state.email)) return "success";
    }

    getValidationStateForPassword() {
        const length = this.state.password.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    _onChangeEmail(ev) {
        this.setState({
            email: ev.target.value
        })
    }

    _onChangePassword(ev) {
        this.setState({
            password: ev.target.value
        })
    }

    render() {
        return (
            <ButtonToolbar>
                <span onClick={this.handleShow}>
                    <i className="fa fa-sign-in" aria-hidden="true"></i> SignIn
				</span>

                <Modal bsSize='large'
                    {...this.props}
                    show={this.state.show}
                    onHide={this.handleHide}
                    dialogClassName="custom-modal"
                    backdrop='static'
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">
                            <i className="fa fa-sign-in" aria-hidden="true"></i> SignIn
						</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="userEmail" validationState={this.getValidationStateForEmail()}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Email
			</Col>
                                <Col sm={6}>
                                    <FormControl type="email" placeholder="someone@user.com" value={this.state.email} onChange={this._onChangeEmail} />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="userPassword" validationState={this.getValidationStateForPassword()}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Password
			</Col>
                                <Col sm={6}>
                                    <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this._onChangePassword} />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={4} sm={10}>
                                    <Button bsStyle="success" disabled={this.getValidationStateForButton()}
                                        onClick={() => {
                                            let user = {
                                                email: this.state.email,
                                                password: this.state.password
                                            }
                                            this.setState({
                                                email: '',
                                                password: ''
                                            })
                                            this.props.signinaction(user);
                                        }} >Sign In</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                </Modal>
            </ButtonToolbar>
        );
    }
}

export default connect(null, { signinaction })(Signin);