import AppsterController from '../appster/AppsterController.js'
import { AppsterGUIId } from '../appster/AppsterConstants.js'

export default class GoLogoLoController
 extends AppsterController {
    constructor() {
        super();
    }

    processEditText() {
        this.model.updateText();
    }

    processDeleteWork = () => {
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

    processCreateNewWork = () => {
        console.log("processCreateNewWork")
        // PROMPT FOR THE NAME OF THE NEW LIST
        this.model.view.showTextModal();
        // MAKE A BRAND NEW LIST IF USER INPUTS APPROPRIATE WORK NAME

        // ELSE REFUSE NAME AND GIVE WARNING

    }

    processConfirmNewWork = () => {
        console.log("processConfirmNewWork");
        let oldWorkList = this.model.view.controller.goList();
        let workListNames = [];
        for(var i = 0; i < oldWorkList.length; i++) {
            workListNames[i] = oldWorkList[i].name;
        }
        console.log(oldWorkList);
        let textInput = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TEXTFIELD).value; // Get value from text input box
        if(textInput.length < 1) { // Check if text is less than one character
            // Alert user name is invalid because it needs to be at least one character long
            console.log("Too Short");
        }
        if(workListNames.indexOf(textInput) > -1){ // Check if name is already in work list
            // Alert user name is invalid because it already exists
            console.log("Already exists");
        }
    }

    processCancelNewWork = () => {
        console.log("processCancelNewWork");
        // JUST HIDE THE TEXT MODAL
        this.model.view.hideTextModal();
    }

    goList = () => {
        return this.model.recentWork;
    }

    processOKEditText = () => {
        console.log("processOKEditText");
    }
}