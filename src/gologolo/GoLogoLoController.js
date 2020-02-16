import AppsterController from '../appster/AppsterController.js'

export default class GoLogoLoController
 extends AppsterController {
    constructor() {
        super();
    }

    processEditText() {
        this.model.updateText();
    }

    processDeleteWork = () => {
        document.body.style.backgroundColor = "transparent";
        this.model.view.showDialog();
    }

    processConfirmDeleteWork = () => {
        // DELETE THE WORK
        console.log(this.model);
        this.model.removeWork(this.model.view.controller.getWorkToEdit());
        this.model.view.hideDialog();
        // GO BACK TO THE HOME SCREEN
        this.model.goHome();
    }

    processCancelDeleteWork = () => {
        // JUST HIDE THE DIALOG
        this.model.view.hideDialog();
    }

    getWorkToEdit = () => {
        return this.model.workToEdit;
    }
}