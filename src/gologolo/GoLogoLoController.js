import AppsterController from '../appster/AppsterController.js'
import { AppsterGUIId, AppsterHTML } from '../appster/AppsterConstants.js'
import { GoLogoLoGUIId, GoLogoLoCallback } from './GoLogoLoConstants.js'

export default class GoLogoLoController
 extends AppsterController {
    constructor() {
        super();
    }

    registerAppsterEventHandlers() {
        super.registerAppsterEventHandlers();
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_EDIT_TEXT_BUTTON, AppsterHTML.CLICK, this[GoLogoLoCallback.GOLOGOLO_PROCESS_EDIT_TEXT]);
        // Edit Screen Color Pickers
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_TEXT_COLOR_PICKER, AppsterHTML.CHANGE, this[GoLogoLoCallback.GOLOGOLO_PROCESS_TEXT_COLOR_CHANGE]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BACKGROUND_COLOR_PICKER, AppsterHTML.CHANGE, this[GoLogoLoCallback.GOLOGOLO_PROCESS_BACKGROUND_COLOR_TEXT_CHANGE]);        
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER, AppsterHTML.CHANGE, this[GoLogoLoCallback.GOLOGOLO_PROCESS_BORDER_COLOR_TEXT_CHANGE]);                
        // Edit Screen Sliders
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER, AppsterHTML.CHANGE, this[GoLogoLoCallback.GOLOGOLO_PROCESS_FONT_SIZE_CHANGE]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER, AppsterHTML.CHANGE, this[GoLogoLoCallback.GOLOGOLO_PROCESS_BORDER_RADIUS_TEXT_CHANGE]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER, AppsterHTML.CHANGE, this[GoLogoLoCallback.GOLOGOLO_PROCESS_BORDER_THICKNESS_TEXT_CHANGE]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER, AppsterHTML.CHANGE, this[GoLogoLoCallback.GOLOGOLO_PROCESS_PADDING_TEXT_CHANGE]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_MARGIN_SLIDER, AppsterHTML.CHANGE, this[GoLogoLoCallback.GOLOGOLO_PROCESS_MARGIN_TEXT_CHANGE]);
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
        console.log(newWorkTextBox);
        let textInput = newWorkTextBox.value; // Get value from text input box
        console.log(textInput);
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

    processOKExitError = () => { // Show text modal again for further creation of new logo
        this.model.view.hideTextModalNoInputError();
        this.model.view.hideTextModalDuplicateInputError();
        this.model.view.showTextModal();
    }

    processEditTextOkExitError = () => {
        this.model.view.hideEditTextModalNoInputError();
        this.model.view.hideEditTextModalDuplicateInputError();
        this.model.view.showEditTextModal();
    }

    processEditText = () => {
        this.model.view.showEditTextModal();
        let editTextTexTField = document.getElementById(AppsterGUIId.APPSTER_CONFIRM_MODAL_TEXTFIELD);
        editTextTexTField.placeholder = "Input New Text";
    }

    processOKEditText = () => {
        console.log("processOKEditText");
        let newNameTextField = document.getElementById(AppsterGUIId.APPSTER_CONFIRM_MODAL_TEXTFIELD); 
        let newText = newNameTextField.value;
        let currentWorkList = this.goList();
        if(newText.length < 1) { // Check if text is less than one character
            // Alert user name is invalid because it needs to be at least one character long
            // Show newWorkError modal
            newNameTextField.value = ""; // Clear textBox
            this.model.view.hideEditTextModal();
            this.model.view.showEditTextModalNoInputError()
        }
        else { 
            this.model.view.hideEditTextModal(); // Hide modal
            currentWorkList[0].text = newText; // Update object
            let currentText = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
            currentText.innerHTML = newText; // Update current text on screen
            newNameTextField.value = "" // Clear text field
        }
    }

    processCancelEditText = () => {
        this.model.view.hideEditTextModal();
    }

    processFontSizeChange = () => {
        let currentChange = document.getElementById(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER);
        var currentWork = this.model.currentWork;
        currentWork.setFontSize(currentChange.value);
        this.model.view.loadWorkStyle(currentWork);
    }

    processTextColorChange = () => {
        let currentChange = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_COLOR_PICKER);
        var currentWork = this.model.currentWork;
        currentWork.setTextColor(currentChange.value);
        this.model.view.loadWorkStyle(currentWork);
    }

    processBackgroundColorTextChange = () => {
        let currentChange = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BACKGROUND_COLOR_PICKER);
        var currentWork = this.model.currentWork;
        currentWork.setBackgroundColor(currentChange.value);
        this.model.view.loadWorkStyle(currentWork);
    }

    processBorderColorTextChange = () => {
        let currentChange = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER);
        var currentWork = this.model.currentWork;
        currentWork.setBorderColor(currentChange.value);
        this.model.view.loadWorkStyle(currentWork);
    }

    processBorderRadiusTextChange = () => {
        let currentChange = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER);
        var currentWork = this.model.currentWork;
        currentWork.setBorderRadius(currentChange.value);
        this.model.view.loadWorkStyle(currentWork);
    }

    processBorderThicknessTextChange = () => {
        let currentChange = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER);
        var currentWork = this.model.currentWork;
        currentWork.setBorderThickness(currentChange.value);
        this.model.view.loadWorkStyle(currentWork);
    }

    processPaddingTextChange = () => {
        let currentChange = document.getElementById(GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER);
        var currentWork = this.model.currentWork;
        currentWork.setPadding(currentChange.value);
        this.model.view.loadWorkStyle(currentWork);
    }

    processMarginTextChange = () => {
        let currentChange = document.getElementById(GoLogoLoGUIId.GOLOGOLO_MARGIN_SLIDER);
        var currentWork = this.model.currentWork;
        currentWork.setMargin(currentChange.value);
        this.model.view.loadWorkStyle(currentWork);
    }
}