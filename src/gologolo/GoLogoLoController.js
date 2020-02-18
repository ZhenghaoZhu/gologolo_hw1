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
        let newWorkTextBox = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TEXTFIELD);
        let textInput = newWorkTextBox.value; // Get value from text input box
        console.log(this.model);
        if(textInput.length < 1) { // Check if text is less than one character
            // Alert user name is invalid because it needs to be at least one character long
            console.log("Too Short");
        }
        else if(workListNames.indexOf(textInput) > -1){ // Check if name is already in work list
            // Alert user name is invalid because it already exists
            console.log("Already exists");
        }
        else {
            // ADD IT TO LIST
            let newAppWork = this.model.updateText(oldWorkList, textInput); // Build new list with new work ater checking input
            this.model.recentWork.push(newAppWork); // Add it to list
            this.model.view.refreshRecentWork(this.model.recentWork); // Refresh the work
            // SEND USER TO EDIT SCREEN OF NEW WORK
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