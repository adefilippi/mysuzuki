export class Modal {
    constructor(object, visible) {
        this.visible  = visible || ("modalOpen" + Math.random().toString(36).substr(2, 8));
        this.object = object;
    }

    openModal = (params = {}) => this.object.setState({[this.visible]:true, ...params});
    closeModal = (params = {}) => this.object.setState({[this.visible]:false, ...params});

    attr() {
        return {
            visible: this.object.state[this.visible],
            onRequestClose: this.closeModal
        }
    }
}
