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

    // TODO: Connect OK button and make functional when user wants to create and work on new work
    processCreateNewWork = () => {
        console.log("processCreateNewWork")
        let appsterRootDiv = document.getElementById(AppsterGUIId.APPSTER_ROOT_DIV);
        console.log(appsterRootDiv);
        // PROMPT FOR THE NAME OF THE NEW LIST
        this.model.view.showTextModal();
        let newWorkTextBox = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TEXTFIELD);
        newWorkTextBox.placeholder = "Input Name";
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
        let newWorkTextBox = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TEXTFIELD);
        let textInput = newWorkTextBox.value; // Get value from text input box
        if(textInput.length < 1) { // Check if text is less than one character
            // Alert user name is invalid because it needs to be at least one character long
            // Show newWorkError modal
            newWorkTextBox.value = ""; // Clear textBox
            this.model.view.hideTextModal();
            this.model.view.showTextModalNoInputError()
        }
        else if(workListNames.indexOf(textInput) > -1){ // Check if name is already in work list
            // Alert user name is invalid because it already exists
            newWorkTextBox.value = ""; // Clear textBox
            this.model.view.hideTextModal();
            this.model.view.showTextModalDuplicateInputError()
        }
        else {
            // ADD IT TO LIST
            newWorkTextBox.value = ""; // Clear textBox
            this.model.view.hideTextModal(); // Hide modal
            let newAppWork = this.model.updateText(oldWorkList, textInput); // Build new list with new work after checking input
            this.model.recentWork.push(newAppWork); // Add it to list
            this.model.view.refreshRecentWork(this.model.recentWork); // Refresh the work
            // SEND USER TO EDIT SCREEN OF NEW WORK
            this.model.editWork(textInput);
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
        // TODO: First check that name is not duplicate or no input was given
    }

    processOKExitError = () => { // Show text modal again for further creation of new logo
        this.model.view.hideTextModalNoInputError();
        this.model.view.hideTextModalDuplicateInputError();
        this.model.view.showTextModal();
    }
}